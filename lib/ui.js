class ui {

    /**
     * waits for the first `selector` to be present on `page`
     * 
     * @param page playwright page object 
     * @param {String} selector selector  
     */
    static async waitForFirst(page, selector) {
        await page.waitForFunction(
            (selector) => document.querySelectorAll(selector).length > 0,
            selector
        )
    }

    
}

module.exports = { ui }