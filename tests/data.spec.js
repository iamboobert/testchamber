const { test, expect } = require('@playwright/test');
const { data } = require("testchamber")

test('generateRandomString', async() => {
    let str1 = data.generateRandomString(8)
    let str2 = data.generateRandomString(8) 

    expect(str1).toHaveLength(8)
    expect(str2).toHaveLength(8)
    expect(str1).not.toEqual(str2)
})

test('getRandomNumber', async() => {
    let num1 = data.getRandomNumber(500,1000)
    let num2 = data.getRandomNumber(500,1000) 
    
    expect(num1).toBeGreaterThanOrEqual(500)
    expect(num1).toBeLessThanOrEqual(1000)
    expect(num2).toBeGreaterThanOrEqual(500)
    expect(num2).toBeLessThanOrEqual(1000)
    expect(num1).not.toEqual(num2)
})

