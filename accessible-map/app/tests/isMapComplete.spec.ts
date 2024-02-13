import { test, expect } from "@playwright/test"

test.describe("Map Application Functionality", () => {
  test("Map interactions update the legend and clear selection", async ({ page, context }) => {
    await context.tracing.start({ screenshots: true, snapshots: true })
    await page.goto("http://localhost:3000/")
    // Wait 5 seconds for page to load. If all elements haven't loaded by then, there is a likely a problem.
    await page.waitForTimeout(5000)

    // Check if the map is visible.
    await expect(page.locator("data-testid=map-container")).toBeVisible()

    // Simulate a click on map to select an area.
    await page.mouse.click(500, 500)

    // Check if Zip Code is accurate.
    await expect(page.locator("data-testid=selected-area-zip")).toContainText("90402")

    // Check that metric options have populated.
    await page.locator("data-testid=metric-option-jenipctl").click()

    // Check that a metadata field is populated.
    await expect(page.locator("data-testid=neighborhood")).toContainText("Santa Monica")

    // Ensures that the "Clear" button appears and is clickable.
    await page.locator("text=Clear").click()

    await context.tracing.stop({ path: "trace.zip" })
  })
})
