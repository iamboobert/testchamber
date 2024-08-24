const { test, expect } = require('@playwright/test');
const { data } = require("testchamber")

test('generateRandomString', async() => {
    let str1 = data.generateRandomString(8)
    let str2 = data.generateRandomString(8) 

    expect(str1).toHaveLength(8)
    expect(str2).toHaveLength(8)
    expect(str1).not.toEqual(str2)
})

