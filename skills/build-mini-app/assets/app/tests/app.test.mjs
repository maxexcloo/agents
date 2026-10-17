import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { createApp } from "../server.mjs";

test("isolates notes, detects stale edits and persists across clients and restarts", async () => {
  const directory = mkdtempSync(join(tmpdir(), "mini-app-test-"));
  let server;
  let base;
  const stop = () =>
    new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  async function start() {
    server = createApp({ dataDirectory: directory });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    base = `http://127.0.0.1:${server.address().port}`;
  }
  const request = (method, capability, body, headers = {}) =>
    fetch(`${base}/api/notes`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(capability ? { Authorization: `Bearer ${capability}` } : {}),
        ...headers,
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
  try {
    await start();
    assert.equal((await fetch(`${base}/health`)).status, 200);
    assert.equal((await request("GET")).status, 401);
    assert.equal((await request("GET", "a".repeat(43))).status, 404);
    assert.equal((await request("DELETE")).status, 405);
    assert.equal((await request("POST", null, {}, { "Sec-Fetch-Site": "cross-site" })).status, 403);
    assert.equal((await request("POST", null, {}, { "Content-Type": "text/plain" })).status, 415);
    const create = await request(
      "POST",
      null,
      {},
      {
        "Content-Type": "application/json; charset=utf-8",
      },
    );
    assert.equal(create.status, 201);
    const first = await create.json();
    const second = await (await request("POST", null, {})).json();
    assert.equal(first.capability.length, 43);
    assert.notEqual(first.capability, second.capability);
    assert.equal(
      (
        await request(
          "PUT",
          first.capability,
          { content: "First client", revision: 0 },
          { "Content-Type": "Application/JSON; charset=utf-8" },
        )
      ).status,
      200,
    );
    assert.deepEqual(await (await request("GET", first.capability)).json(), {
      content: "First client",
      revision: 1,
    });
    assert.deepEqual(await (await request("GET", second.capability)).json(), {
      content: "",
      revision: 0,
    });
    assert.equal(
      (
        await request("PUT", first.capability, {
          content: "Stale client",
          revision: 0,
        })
      ).status,
      409,
    );
    assert.equal(
      (
        await request("PUT", first.capability, {
          content: "x".repeat(10001),
          revision: 1,
        })
      ).status,
      400,
    );
    assert.equal(
      (
        await request("PUT", first.capability, {
          content: "x".repeat(70000),
          revision: 1,
        })
      ).status,
      413,
    );
    assert.equal(
      (
        await request(
          "PUT",
          first.capability,
          { content: "Cross-site", revision: 1 },
          { "Sec-Fetch-Site": "cross-site" },
        )
      ).status,
      403,
    );
    assert.equal(
      (
        await request(
          "PUT",
          first.capability,
          { content: "Wrong type", revision: 1 },
          { "Content-Type": "text/plain" },
        )
      ).status,
      415,
    );
    assert.equal(
      (
        await request("PUT", first.capability, {
          content: "Invalid revision",
          revision: -1,
        })
      ).status,
      400,
    );
    assert.equal(
      (
        await fetch(`${base}/api/notes`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${first.capability}`,
            "Content-Type": "application/json",
          },
          body: "{",
        })
      ).status,
      400,
    );
    const concurrent = await Promise.all([
      request("PUT", first.capability, {
        content: "Concurrent A",
        revision: 1,
      }),
      request("PUT", first.capability, {
        content: "Concurrent B",
        revision: 1,
      }),
    ]);
    assert.deepEqual(concurrent.map((response) => response.status).sort(), [200, 409]);
    const saved = await (await request("GET", first.capability)).json();
    await stop();
    await start();
    assert.deepEqual(await (await request("GET", first.capability)).json(), saved);
    assert.equal(
      (await request("PUT", first.capability, { content: "", revision: 2 })).status,
      200,
    );
    const page = await fetch(base);
    assert.match(await page.text(), /Shared Notes/);
    assert.equal(page.headers.get("referrer-policy"), "no-referrer");
    assert.equal(page.headers.get("cache-control"), "no-store");
    assert.equal((await fetch(`${base}/style.css`)).status, 200);
    assert.equal((await fetch(`${base}/server.mjs`)).status, 404);
    assert.equal((await fetch(`${base}/app.sqlite`)).status, 404);
    assert.equal((await fetch(base, { method: "HEAD" })).status, 200);
  } finally {
    if (server?.listening) await stop();
    rmSync(directory, { force: true, recursive: true });
  }
});

test("bounds anonymous creation without affecting saved notes", async () => {
  const directory = mkdtempSync(join(tmpdir(), "mini-app-quota-"));
  const server = createApp({ dataDirectory: directory, maxNotes: 1 });
  try {
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const base = `http://127.0.0.1:${server.address().port}/api/notes`;
    const create = () =>
      fetch(base, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
    const first = await (await create()).json();
    assert.equal((await create()).status, 429);
    assert.equal(
      (
        await fetch(base, {
          headers: { Authorization: `Bearer ${first.capability}` },
        })
      ).status,
      200,
    );
  } finally {
    await new Promise((resolve) => server.close(resolve));
    rmSync(directory, { force: true, recursive: true });
  }
});
