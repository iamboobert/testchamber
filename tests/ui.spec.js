const { test, expect } = require('@playwright/test');
import { ui } from "testchamber"


test('waitForFirst', async ({ page }) => {
    await page.goto('https://testpages.eviltester.com/styled/alerts/fake-alert-test.html')
    await page.getByRole('button', { name: 'Show fake alert box' }).click()
    
    await ui.waitForFirst(page, "[role=dialog].active")
})

test('waitForCount', async ({ page }) => {
    await page.goto('https://testpages.eviltester.com/styled/tag/dynamic-table.html')
    await page.getByText('Table Data').click()
    await page.locator('#jsondata').fill(`[{"name" : "Bob", "age" : 20}, {"name": "George", "age" : 42}, {"name": "Another", "age" : 43}]`)
    await page.getByRole('button', { name: 'Refresh Table' }).click()
    
    await ui.waitForCount(page, `tr`, 4)
})

test('waitForAtLeastCount', async ({ page }) => {
    await page.goto('https://testpages.eviltester.com/styled/tag/dynamic-table.html')
    await page.getByText('Table Data').click()
    await page.locator('#jsondata').fill(`[{"name" : "Bob", "age" : 20}, {"name": "George", "age" : 42}, {"name": "Another", "age" : 43}]`)
    await page.getByRole('button', { name: 'Refresh Table' }).click()
    
    await ui.waitForAtLeastCount(page, `tr`, 3)
    await ui.waitForAtLeastCount(page, `tr`, 4)
})

test('getTextOfElement', async ({ page }) => {
    await page.goto('https://testpages.eviltester.com/styled/basic-web-page-test.html')
    
    expect(await ui.getTextOfElement(await page.$(`#para1`))).toEqual("A paragraph of text")
    expect(await ui.getTextOfElement(await page.$(`#para1`), {"property": "className"})).toEqual("main")
})

test('getTextOfElements', async ({ page }) => {
    await page.goto('https://testpages.eviltester.com/styled/tag/dynamic-table.html')
    await page.getByText('Table Data').click()
    await page.locator('#jsondata').fill(`[{"name" : "", "age" : 20}]`)
    await page.getByRole('button', { name: 'Refresh Table' }).click()
    const elements = await page.$$("td")    

    //exclude empties (default)
    expect(await ui.getTextOfElements(elements)).toEqual(['20'])

    //include empties
    expect(await ui.getTextOfElements(elements, { includeEmpties: true })).toEqual(['','20'])
   
    //different property
    expect(await ui.getTextOfElements(elements, { property: "localName" })).toEqual(['td','td'])
})

test('findElementInListHavingText', async ({ page }) => {
    await page.goto('https://testpages.eviltester.com/styled/basic-web-page-test.html')
    const elements = await page.$$('p')

    //strait match (default)
    let foundElement = await ui.findElementInListHavingText(elements, "A paragraph of text")
    expect(await ui.getTextOfElement(foundElement)).toEqual("A paragraph of text")

    //contains match
    foundElement = await ui.findElementInListHavingText(elements, "Another", { contains: true })
    expect(await ui.getTextOfElement(foundElement)).toEqual("Another paragraph of text")

    //different property
    foundElement = await ui.findElementInListHavingText(elements, "main", { property: "className" })
    expect(await ui.getTextOfElement(foundElement)).toEqual("A paragraph of text")
})

test('clearElementText', async ({ page }) => { 
    await page.goto('https://testpages.eviltester.com/styled/basic-html-form-test.html')
    
    //text
    const textSelector = `input[name="username"]`
    await page.locator(textSelector).fill("text input")
    await expect(page.locator(textSelector)).toHaveValue("text input")
    await ui.clearElementText(page, await page.$(textSelector))
    await expect(page.locator(textSelector)).toHaveValue("")

    //password
    const passwordSelector = `input[name="password"]`
    await page.locator(passwordSelector).fill("password input")
    await expect(page.locator(passwordSelector)).toHaveValue("password input")
    await ui.clearElementText(page, await page.$(passwordSelector))
    await expect(page.locator(passwordSelector)).toHaveValue("")

    //text area
    const textareaSelector = `textarea[name="comments"]`
    await page.locator(textareaSelector).fill("textarea input")
    await expect(page.locator(textareaSelector)).toHaveValue("textarea input")
    await ui.clearElementText(page, await page.$(textareaSelector))
    await expect(page.locator(textareaSelector)).toHaveValue("")
})


test('findElementWithChildHavingText',  async ({ page }) => { 
    await page.goto('https://testpages.eviltester.com/styled/tag/table.html')
    
    //normal path
    let elementFound = await ui.findElementWithChildHavingText(page, '#mytable tbody tr', 'td:nth-child(1)', 'Aleister') 
    expect(await ui.getTextOfElement(elementFound)).toBe("Aleister\t33.3")  
    
    //contains path
    elementFound = await ui.findElementWithChildHavingText(page, '#mytable tbody tr', 'td:nth-child(1)', 'ster', {contains:true}) 
    expect(await ui.getTextOfElement(elementFound)).toBe("Aleister\t33.3")  
})

test(`waitForTextInElement`,  async ({ page }) => {  
    await page.goto('https://testpages.eviltester.com/styled/tag/dynamic-table.html')
    await page.getByText('Table Data').click()
    await page.locator('#jsondata').fill(`[{"name" : "derek", "age" : 20}]`)
    await page.getByRole('button', { name: 'Refresh Table' }).click()

    const element = await page.$("#dynamictable > tr:nth-child(3) > td:nth-child(1)")
    await ui.waitForTextInElement(page, element, "derek")
})

test(`waitForText`,  async ({ page }) => {  
    await page.goto('https://testpages.eviltester.com/styled/tag/dynamic-table.html')
    await page.getByText('Table Data').click()
    await page.locator('#jsondata').fill(`[{"name" : "derek", "age" : 20}]`)
    await page.getByRole('button', { name: 'Refresh Table' }).click()

    await ui.waitForText(page, "#dynamictable td", "derek")
})

test(`expectNewTab`, async ({ page }) => {  
    await page.goto('https://healmatwork.org/about/')

    expect(page.context().pages().length).toBe(1)

    let newPage = await ui.expectNewTab(page, async() => {
        await page.getByRole('link', { name: 'chronicdisease.org' }).click()
    })

    expect(page.context().pages().length).toBe(2)
    expect(page.url()).toEqual("https://healmatwork.org/about/")
    expect(newPage.url()).toEqual("https://chronicdisease.org/")

    await newPage.close()
})