const { test, expect } = require('@playwright/test');
const { ui, data } = require("testchamber")

test('waitForFirst', async ({ page }) => {
    await page.goto('https://testpages.eviltester.com/styled/alerts/fake-alert-test.html')
    await page.getByRole('button', { name: 'Show fake alert box' }).click()
    await ui.waitForFirst(page, "[role=dialog].active")
})


test(`no playwright`, async() => {
    expect(data.test()).toEqual("data test")
})