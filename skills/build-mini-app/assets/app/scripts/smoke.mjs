import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { setTimeout } from "node:timers/promises";

// A separate container and volume never touch an app's Compose project or data.
const name = `mini-app-smoke-${randomUUID()}`;
const image = process.env.SMOKE_IMAGE || name;
const docker = (...args) =>
  execFileSync("docker", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
let container = false;
let volume = false;
try {
  if (!process.env.SMOKE_IMAGE) docker("build", "--tag", image, ".");
  docker("volume", "create", name);
  volume = true;
  docker(
    "run",
    "--detach",
    "--init",
    "--name",
    name,
    "--publish",
    "127.0.0.1::3000",
    "--read-only",
    "--tmpfs",
    "/tmp",
    "--volume",
    `${name}:/data`,
    image,
  );
  container = true;
  let base;
  async function ready() {
    // Docker can assign a different ephemeral host port after a restart.
    const binding = JSON.parse(
      docker("inspect", "--format", "{{json .NetworkSettings.Ports}}", name),
    )["3000/tcp"][0];
    base = `http://127.0.0.1:${binding.HostPort}`;
    for (let attempt = 0; attempt < 50; attempt++) {
      try {
        if (
          (await fetch(`${base}/health`, { signal: AbortSignal.timeout(1000) }))
            .ok
        )
          return;
      } catch {}
      await setTimeout(100);
    }
    throw new Error("Container did not become healthy.");
  }
  await ready();
  const note = await (
    await fetch(`${base}/api/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    })
  ).json();
  const headers = {
    Authorization: `Bearer ${note.capability}`,
    "Content-Type": "application/json",
  };
  assert.equal(
    (
      await fetch(`${base}/api/notes`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ content: "Smoke test", revision: 0 }),
      })
    ).status,
    200,
  );
  docker("restart", name);
  await ready();
  assert.deepEqual(
    await (await fetch(`${base}/api/notes`, { headers })).json(),
    { content: "Smoke test", revision: 1 },
  );
  assert.equal((await fetch(base)).status, 200);
  console.log("Container health, UI and restart persistence passed.");
} finally {
  if (container) docker("rm", "--force", name);
  if (volume) docker("volume", "rm", name);
  if (!process.env.SMOKE_IMAGE) docker("image", "rm", image);
}
