const element = (id) => document.getElementById(id);
let capability = "";
let revision = 0;
let loading = false;
let observedFragment = "";

async function request(method, body) {
  const response = await fetch("/api/notes", {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(capability && method !== "POST"
        ? { Authorization: `Bearer ${capability}` }
        : {}),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Unable to load this note.");
  return data;
}

async function run(action) {
  if (loading) return;
  loading = true;
  document.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });
  element("status").textContent = "";
  try {
    await action();
  } catch (error) {
    element("status").textContent = error.message;
  } finally {
    loading = false;
    document.querySelectorAll("button").forEach((button) => {
      button.disabled = false;
    });
    if (observedFragment !== location.hash) void run(load);
  }
}

async function load() {
  observedFragment = location.hash;
  const currentCapability = location.hash.slice(1);
  element("editor").hidden = true;
  if (!/^[A-Za-z0-9_-]{43}$/.test(currentCapability)) {
    capability = "";
    if (currentCapability) throw new Error("Invalid editing link.");
    return;
  }
  capability = currentCapability;
  const note = await request("GET");
  // A link change must never apply an in-flight response to another note.
  if (location.hash.slice(1) !== currentCapability) return;
  revision = note.revision;
  element("content").value = note.content;
  element("link").href = `/#${capability}`;
  element("editor").hidden = false;
}

element("create").onclick = () =>
  run(async () => {
    const note = await request("POST", {});
    history.pushState(null, "", `/#${note.capability}`);
    await load();
  });
element("reload").onclick = () => run(load);
element("save").onclick = () =>
  run(async () => {
    if (location.hash.slice(1) !== capability) return load();
    const note = await request("PUT", {
      content: element("content").value,
      revision,
    });
    revision = note.revision;
    element("status").textContent = "Saved.";
  });
window.addEventListener("hashchange", () => {
  if (!loading) void run(load);
});
void run(load);
