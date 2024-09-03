const { test, expect } = require('@playwright/test');
import { data } from "testchamber"

test('getRandomString', async() => {
    let str1 = data.getRandomString(8)
    let str2 = data.getRandomString(8) 

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

test('shuffleArray', async() => {
    let array1 = ["first", "second", "third", "forth", "fif"]
    let array2 = [...array1]

    expect(array1).toEqual(array2)
    data.shuffleArray(array1)    
    expect(array1).not.toEqual(array2)
    
})
