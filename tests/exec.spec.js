const { test, expect } = require('@playwright/test');
import { exe } from "testchamber"

test('asyncRetryLoop', async() => {
    let staticclass = class {
        static counter = 0
    }    
    
    //success path
    let actualSuucessResult = await exe.asyncRetryLoop(async()=>{
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
        await exe.asyncRetryLoop(async()=>{
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

test(`sleep`, async() => {
    let before = Date.now() 
    await exe.sleep(1000)
    let after = Date.now()

    expect(after-before).toBeGreaterThanOrEqual(1000)    
})