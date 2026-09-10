import test from "node:test";
for (const [name, change] of [
  ["short agency", { agency: "A" }],
  ["long agency", { agency: "A".repeat(101) }],
  ["invalid email", { email: "not-an-email" }],
  ["long email", { email: "a".repeat(250) + "@x.com" }],
  ["short challenge", { challenge: "short" }],
  ["long challenge", { challenge: "a".repeat(2001) }],
  ["agency line injection", { agency: "Agency\nEmail: other@example.com" }],
  ["control character", { challenge: "Workflow\u0000 problem description" }],
] as const) {
  test(`rejects ${name}`, () =>
    assert.throws(
      () =>
        buildPilotBrief({
          agency: "Agency",
          email: "owner@example.com",
          challenge: "A real workflow problem.",
          ...change,
        }),
      /Agency|email|challenge|control/i,
    ));
}

import assert from "node:assert/strict";
import { buildPilotBrief } from "../lib/pilot.ts";
test("builds an unsent brief from the supplied agency information", () => {
  const result = buildPilotBrief({
    agency: " Studio One ",
    email: "owner@example.com",
    challenge: "We lose track of scope changes.",
  });
  assert.ok(result.includes("Agency: Studio One"));
  assert.ok(result.includes("Email: owner@example.com"));
  assert.ok(result.includes("Not sent to Scopeveil."));
  assert.ok(result.includes("We lose track of scope changes."));
});
