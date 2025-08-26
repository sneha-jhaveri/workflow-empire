import { test, expect } from "@playwright/test";

test("RunLogViewer displays live updates", async ({ page }) => {
  await page.goto("/runs/123");

  const logItem = await page.locator("text=Step: example-step");
  await expect(logItem).toBeVisible();
});
