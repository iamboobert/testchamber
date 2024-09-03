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
        
}

module.exports = { data }