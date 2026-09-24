import { test, expect } from "@playwright/test";
test("decorative canvas has a bounded paint rate", async ({ page }) => {
  await page.addInitScript(() => {
    const w = window as unknown as { paymentPaints: number };
    w.paymentPaints = 0;
    const original = CanvasRenderingContext2D.prototype.clearRect;
    CanvasRenderingContext2D.prototype.clearRect = function (
      ...args: Parameters<CanvasRenderingContext2D["clearRect"]>
    ) {
      w.paymentPaints++;
      return original.apply(this, args);
    };
  });
  await page.goto("/");
  await page.locator("canvas").scrollIntoViewIfNeeded();
  await page.waitForFunction(
    () => (window as unknown as { paymentPaints: number }).paymentPaints > 0,
  );
  await page.evaluate(() => {
    (window as unknown as { paymentPaints: number }).paymentPaints = 0;
  });
  await page.waitForTimeout(500);
  const paints = await page.evaluate(
    () => (window as unknown as { paymentPaints: number }).paymentPaints,
  );
  expect(paints).toBeGreaterThan(0);
  expect(paints).toBeLessThanOrEqual(12);
});
import AxeBuilder from "@axe-core/playwright";
test("all routes meet automated WCAG AA checks", async ({ page }) => {
  for (const route of ["/", "/product", "/privacy"]) {
    await page.goto(route);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        document.getAnimations().map((animation) => animation.finished),
      );
    });
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
});

import { readFile } from "node:fs/promises";
test("routes have no overflow, console errors or missing assets", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
  });
  for (const route of ["/", "/product", "/privacy"]) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator("h1")).toBeVisible();
  }
  expect(errors).toEqual([]);
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: `docs/assets/landing-${testInfo.project.name}.png`,
    fullPage: true,
  });
  await page.screenshot({
    path: `docs/assets/hero-${testInfo.project.name}.png`,
  });
});
test("responsive hero keeps primary action reachable without overflow", async ({
  page,
}) => {
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const geometry = await page.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
      overflow: [...document.querySelectorAll("main *")]
        .filter((e) => e.getBoundingClientRect().right > innerWidth + 1)
        .map((e) => ({
          tag: e.tagName,
          cls: e.className,
          right: e.getBoundingClientRect().right,
        }))
        .slice(0, 8),
    }));
    expect(geometry.scroll, JSON.stringify(geometry)).toBeLessThanOrEqual(
      width,
    );
    const box = await page.locator(".hero .button").boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y + box!.height).toBeLessThan(900);
  }
});
test("reduced motion freezes the canvas and skip link works", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.waitForFunction(() => {
    const c = document.querySelector("canvas");
    return c && c.width > 0;
  });
  const before = await page
    .locator("canvas")
    .evaluate((c: HTMLCanvasElement) => c.toDataURL());
  await page.waitForTimeout(120);
  expect(
    await page
      .locator("canvas")
      .evaluate((c: HTMLCanvasElement) => c.toDataURL()),
  ).toBe(before);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
});
test("without JavaScript pilot form cannot send personal data", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(
    page.getByRole("button", { name: "Download pilot brief" }),
  ).toBeDisabled();
  await context.close();
});

test("participant explorer changes visibility and supports keyboard tabs", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Contractor", exact: true }).click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Your agreed allocation",
  );
  await expect(
    page.getByRole("tab", { name: "Contractor", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Public", exact: true }),
  ).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Transaction timing and fees",
  );
});
test("pilot brief downloads locally and never submits entered data", async ({
  page,
}) => {
  const writes: string[] = [];
  page.on("request", (r) => {
    const payload =
      decodeURIComponent(r.url()).replaceAll("+", " ") +
      " " +
      (r.postData() ?? "");
    if (
      r.method() !== "GET" ||
      [
        "Browser Test Agency",
        "pilot@example.com",
        "We need approved changes",
      ].some((s) => payload.includes(s))
    )
      writes.push(r.url());
  });
  await page.goto("/");
  await page.getByLabel("Agency name").fill("Browser Test Agency");
  await page.getByLabel("Work email").fill("pilot@example.com");
  await page
    .getByLabel("What gets in the way of payment?")
    .fill("We need approved changes to be funded.");
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download pilot brief" }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe(
    "base-confidential-payments-pilot-brief.txt",
  );
  const path = await download.path();
  expect(path).toBeTruthy();
  const text = await readFile(path!, "utf8");
  expect(text).toContain("Agency: Browser Test Agency");
  expect(text).toContain("Not sent. This brief stays on your device.");
  await expect(page.getByRole("status")).toContainText("not sent");
  expect(writes).toEqual([]);
  expect(
    await page.evaluate(() => localStorage.length + sessionStorage.length),
  ).toBe(0);
});

test("landing communicates concept status and offers a real pilot action", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Confidential Payments Prototype | Base");
  await expect(
    page
      .getByRole("link", {
        name: "Confidential Payments Prototype on Base home",
      })
      .first(),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Start funded. Pay privately." }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Join the pilot" }).first(),
  ).toHaveAttribute("href", "#pilot");
  await page
    .getByRole("link", { name: "Product", exact: true })
    .first()
    .click();
  await expect(
    page.getByRole("heading", { name: "Built around the agreement." }),
  ).toBeVisible();
  await expect(page.getByText("Payments are not enabled.")).toBeVisible();
});
