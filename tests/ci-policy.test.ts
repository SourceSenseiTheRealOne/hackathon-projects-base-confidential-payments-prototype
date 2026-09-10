import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const checkout = "actions/checkout@d23441a48e516b6c34aea4fa41551a30e30af803";
const setup = "actions/setup-node@249970729cb0ef3589644e2896645e5dc5ba9c38";
function safe(source: string) {
  assert.ok(
    !/pull_request_target|secrets\s*(?:\.|\[)|dotenv|\.env\.local|docker compose config/.test(
      source,
    ),
  );
  const refs = [...source.matchAll(/uses:\s*(\S+)/g)].map((m) => m[1]);
  assert.deepEqual(refs, [checkout, setup, checkout, setup]);
  assert.ok(refs.every((ref) => /@[a-f0-9]{40}$/.test(ref)));
  for (const required of [
    "pull_request:",
    "push:",
    "contents: read",
    "persist-credentials: false",
    "pnpm test",
    "pnpm typecheck",
    "pnpm build",
    "pnpm test:e2e",
    "npm test",
    "--ignore-scripts",
  ])
    assert.ok(source.includes(required), required);
  assert.equal(source.match(/persist-credentials: false/g)?.length, 2);
}
test("CI has immutable actions, no secrets and product gates", () =>
  safe(readFileSync(".github/workflows/verify.yml", "utf8")));
test("CI guard rejects unsafe trigger, secret and action mutations", () => {
  const source = readFileSync(".github/workflows/verify.yml", "utf8");
  for (const mutated of [
    source.replace("pull_request:", "pull_request_target:"),
    source + "\nsecrets.TOKEN",
    source + "\nsecrets['TOKEN']",
    source + '\nsecrets["TOKEN"]',
    source.replace(checkout, "actions/checkout@v6"),
    source + "\nuses: actions/checkout@" + "0".repeat(40),
  ])
    assert.throws(() => safe(mutated));
});
