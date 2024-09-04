const crypto = require("crypto")
const fs = require("fs")
const officeParser = require('officeparser')

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

     /**
     * converts a readstream into a buffer
     * 
     * @param {*} stream stream to convert
     * @returns buffer
     */
     static streamToBuffer(stream) {
        return new Promise((resolve, reject) => {        
            const _buf = [];    
            stream.on("data", (chunk) => _buf.push(chunk));
            stream.on("end", () => resolve(Buffer.concat(_buf)));
            stream.on("error", (err) => reject(err));    
        })
    }

    /**
     * extracts text from an office document that has been read into a buffer
     *  
     * @param {*} buffer buffer 
     * @returns text of document
     */
    static async documentBufferToString(buffer) {
        return (await officeParser.parseOfficeAsync(buffer)).trim()
    }
}

module.exports = { data }