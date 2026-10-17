import { createHash, randomBytes } from "node:crypto";
import { mkdirSync, readFileSync } from "node:fs";
import { createServer } from "node:http";
import { resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";

const assets = new Map(
  [
    ["/", ["index.html", "text/html; charset=utf-8"]],
    ["/app.mjs", ["app.mjs", "text/javascript; charset=utf-8"]],
    ["/style.css", ["style.css", "text/css; charset=utf-8"]],
  ].map(([path, [file, type]]) => [
    path,
    {
      body: readFileSync(new URL(`./static/${file}`, import.meta.url)),
      type,
    },
  ]),
);

export function createApp({
  dataDirectory = process.env.DATA_DIRECTORY || "./data",
  maxNotes = Number(process.env.MAX_NOTES || 1000),
} = {}) {
  if (!Number.isSafeInteger(maxNotes) || maxNotes < 1)
    throw new Error("MAX_NOTES must be a positive integer.");
  mkdirSync(dataDirectory, { mode: 0o700, recursive: true });
  const database = new DatabaseSync(resolve(dataDirectory, "app.sqlite"));
  database.exec(`
    PRAGMA busy_timeout = 5000;
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS notes (
      capability_hash TEXT PRIMARY KEY,
      content TEXT NOT NULL,
      revision INTEGER NOT NULL
    );
  `);
  const select = database.prepare("SELECT content, revision FROM notes WHERE capability_hash = ?");
  const insert = database.prepare("INSERT INTO notes VALUES (?, ?, 0)");
  const update = database.prepare(
    "UPDATE notes SET content = ?, revision = revision + 1 WHERE capability_hash = ? AND revision = ?",
  );
  const hash = (value) => createHash("sha256").update(value).digest("hex");
  const server = createServer(async (request, response) => {
    response.setHeader("Cache-Control", "no-store");
    response.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
    );
    response.setHeader("Referrer-Policy", "no-referrer");
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("X-Robots-Tag", "noindex, nofollow");
    const json = (status, body) => {
      response.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8",
      });
      response.end(JSON.stringify(body));
    };
    try {
      const path = new URL(request.url, "http://localhost").pathname;
      if (path === "/health" && request.method === "GET") {
        database.prepare("SELECT 1").get();
        return json(200, { status: "ok" });
      }
      if (path === "/api/notes") {
        const mediaType = request.headers["content-type"]?.split(";", 1)[0].trim().toLowerCase();
        if (request.headers["sec-fetch-site"] === "cross-site")
          return json(403, { error: "Cross-site requests are not allowed." });
        if (request.method === "POST") {
          if (mediaType !== "application/json")
            return json(415, { error: "Use application/json." });
          if (database.prepare("SELECT count(*) AS count FROM notes").get().count >= maxNotes) {
            return json(429, { error: "The note limit has been reached." });
          }
          // The fragment stays in the browser; proxies never receive the editing URL.
          const capability = randomBytes(32).toString("base64url");
          insert.run(hash(capability), "");
          return json(201, { capability, content: "", revision: 0 });
        }
        if (!["GET", "PUT"].includes(request.method))
          return json(405, { error: "Method not allowed." });
        const capability = /^Bearer ([A-Za-z0-9_-]{43})$/.exec(
          request.headers.authorization || "",
        )?.[1];
        if (!capability) return json(401, { error: "An editing link is required." });
        const key = hash(capability);
        const row = select.get(key);
        if (!row) return json(404, { error: "Note not found." });
        if (request.method === "GET") return json(200, row);
        if (mediaType !== "application/json") return json(415, { error: "Use application/json." });
        let length = 0;
        const chunks = [];
        for await (const chunk of request) {
          length += chunk.length;
          if (length > 65536) return json(413, { error: "Note is too large." });
          chunks.push(chunk);
        }
        let input;
        try {
          input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
        } catch {
          return json(400, { error: "Invalid JSON." });
        }
        if (
          !input ||
          typeof input.content !== "string" ||
          input.content.length > 10000 ||
          !Number.isSafeInteger(input.revision) ||
          input.revision < 0
        ) {
          return json(400, {
            error: "Provide a revision and up to 10,000 characters.",
          });
        }
        const result = update.run(input.content, key, input.revision);
        if (!result.changes)
          return json(409, {
            error: "This note changed elsewhere. Reload it before saving.",
          });
        return json(200, select.get(key));
      }
      const asset = assets.get(path);
      if (!asset) return json(404, { error: "Page not found." });
      if (!["GET", "HEAD"].includes(request.method))
        return json(405, { error: "Method not allowed." });
      response.writeHead(200, { "Content-Type": asset.type });
      response.end(request.method === "HEAD" ? undefined : asset.body);
    } catch {
      // Do not log request URLs, headers or bodies: they can contain capabilities.
      json(500, { error: "Unable to process this request." });
    }
  });
  server.on("close", () => database.close());
  return server;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.umask(0o077);
  const server = createApp();
  server.listen(Number(process.env.PORT || 3000), process.env.HOST || "127.0.0.1");
  for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => server.close());
}
