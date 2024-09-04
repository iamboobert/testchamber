const { test, expect } = require('@playwright/test');
const fs = require("fs")
const path = require("path")
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

test('asyncRetryLoop', async() => {
    let staticclass = class {
        static counter = 0
    }    
    
    //success path
    let actualSuucessResult = await data.asyncRetryLoop(async()=>{
        staticclass.counter++
        if(staticclass.counter >= 3) {
            return true
        }
        return false
    })
    expect(actualSuucessResult).toBe(true)

    
    //retries exhausted path
    //NOTE: expect().toThrow and .toThrowError still seem to result in the error being thrown
    //hence the verification via t/c block
    staticclass.counter = 0
    let errored = false
    try {
        await data.asyncRetryLoop(async()=>{
            staticclass.counter++
            if(staticclass.counter >= 3) {
                return true
            }
            return false
        }, {tries: 2})
    } catch(err) {
        errored = true
    }
    if(!errored) {
        throw new Error(`did not fail after retries exhausted`)
    }
})

test(`hashStream`, async() => {
    const testFilePath = path.resolve(__dirname, "../resources", "testfile.txt")
    const testFileStream = fs.createReadStream(testFilePath)
    const expectedHash = `272eec4d2a7ebc55b3f1c11cf34affa14ffe82bf`
    
    expect(await data.hashStream(testFileStream)).toEqual(expectedHash)
})

test(`hashFile`, async() => {
    const testFilePath = path.resolve(__dirname, "../resources", "testfile.txt")
    const expectedHash = `272eec4d2a7ebc55b3f1c11cf34affa14ffe82bf`
    
    expect(await data.hashFile(testFilePath)).toEqual(expectedHash)
})

test(`streamToBuffer`, async() => {
    const testFilePath = path.resolve(__dirname, "../resources", "testfile.txt")
    const testFileStream = fs.createReadStream(testFilePath)
    
    let actualBuffer = await data.streamToBuffer(testFileStream)
    let expectedBuffer = Buffer.from(`i am a test file MEOW`)
    expect(actualBuffer).toEqual(expectedBuffer)
})

test(`documentBufferToString`, async() => {
    const testFilePath = path.resolve(__dirname, "../resources", "test-word-doc.docx")
    const testFileStream = fs.createReadStream(testFilePath)
    const testFileBuffer = await data.streamToBuffer(testFileStream) 
    
    let actualText = await data.documentBufferToString(testFileBuffer)
    expect(actualText).toEqual(`I am a word document huzzah`)
})
