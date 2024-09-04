import * as crypto from 'crypto'
import * as fs from 'fs'

class data {

    /**
     * generates a random string of length 
     * @param length length of string
     * @returns random string
     */
    static getRandomString(length) {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let str = '';
        for (let i = 0; i < length; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    
        return str;
    }

    /**
     * returns a random number between min and max inclusive
     * @param min min number  
     * @param max max number
     * @returns random number
     */
    static getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * shuffles an array in place / by reference
     * @param {*} array array to shuffle
     */
    static shuffleArray(array) { 
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }     

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
     * hashes a readstream
     * 
     * @param {*} stream stream to hash
     * @param {*} hashName hash to use, defaulted to sha1
     * @returns hash of stream as a string
     */
    static async hashStream(stream, hashName = 'sha1') {
        return new Promise((resolve, reject) => {
            const hash = crypto.createHash(hashName);
            stream.on('error', err => reject(err));
            stream.on('data', chunk => hash.update(chunk));
            stream.on('end', () => resolve(hash.digest('hex')));
          });
    }

    /**
     * hashes a file from a path
     * 
     * @param {*} path path to file
     * @param {*} hashName hash to use, defaulted to sha1
     * @returns hash of stream as a string
     */
    static async hashFile(path, hashName = 'sha1') {
        let stream = fs.createReadStream(path)
        return data.hashStream(stream, hashName)
    }
}

module.exports = { data }