class exe {

    /**
     * retries an async function 
     * 
     * @param {*} asyncFunction async function to call 
     * @param {*} opts optional overrides:
     * ```
     * {
     *  "tries": 10, //retries 
     *  "pause": 1000, //ms pause before next retry
     *  "message": ''   //message to include for error if tries exhausted
     * }
     * ``` 
     * @returns result of async function
     */
    static async asyncRetryLoop(asyncFunction, opts) {
        const defaultOptions = {
            "tries": 10,
            "pause": 1000,
            "message": ''
        }
        const actualOptions = {...defaultOptions, ...opts}
        
        let success = false;
        let res = false;
        for(let i=0; i<actualOptions.tries; i++) { 
            
            try { 
                res = await asyncFunction();
                if(!res) { 
                    throw new Error('returned false');
                }
                success = true;
                break;                               
            } catch(err) { 
                await new Promise(function(resolve) {
                    setTimeout(resolve, actualOptions.pause)
                })                                            
            }
        }
        if(!success) {
            throw new Error(`asyncRetryLoop: failed after ${actualOptions.tries} tries. ${actualOptions.message}`)
        }  
        return res 
    }

    /**
     * blocks until ms milliseconds have passed
     * 
     * @param {*} ms milliseconds to sleep
     */
    static async sleep(ms) {
        await new Promise(resolve => setTimeout(resolve, ms));
    }

}

module.exports = { exe }