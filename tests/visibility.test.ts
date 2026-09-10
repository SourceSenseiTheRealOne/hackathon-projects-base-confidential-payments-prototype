import test from "node:test";
import assert from "node:assert/strict";
import { visibilityFor } from "../lib/visibility.ts";
test("contractors see their own allocation but not other rates", () => {
  const policy = visibilityFor("contractor");
  assert.ok(policy.visible.includes("Your agreed allocation"));
  assert.ok(policy.hidden.includes("Other contractors’ rates"));
  assert.ok(!policy.visible.includes("Other contractors’ rates"));
});
