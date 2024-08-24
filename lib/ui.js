class ui {

    /**
     * waits for the first `selector` to be present on `page`
     * 
     * @param page playwright page object 
     * @param { String } selector selector  
     */
    static async waitForFirst(page, selector) {
        await page.waitForFunction(
            (selector) => document.querySelectorAll(selector).length > 0,
            selector
        )
    }

    /**
     * waits for count amount of elements to be present matched by selector 
     * @param page playwright page object 
     * @param { String } selector selector
     * @param { Number } count amount to wait for
     */
    static async waitForCount(page, selector, count) {
        await page.waitForFunction(
            ({selector, count}) => document.querySelectorAll(selector).length == count,
            {selector, count}
        ) 
    }
    
    /**
     * waits for at least count amount of elements to be present matched by selector 
     * @param page playwright page object 
     * @param { String } selector selector
     * @param { Number } count amount to wait for
    */
    static async waitForAtLeastCount(page, selector, count) {
        await page.waitForFunction(
            ({selector, count}) => document.querySelectorAll(selector).length >= count,
            {selector, count}
        ) 
    }

    /**
     * returns the text of an element
     * 
     * @param element element returned by page.$
     * @param opts optional overrides:
     * ```
     * {
     *  "property": 'innerText' //property to read from
     * }
     * ``` 
     * @returns text of element
    */
    static async getTextOfElement(element, opts=null) {
        const defaultOptions = {
            "property": 'innerText'
        }
        const actualOptions = {...defaultOptions, ...opts}
        return (await (await element.getProperty(actualOptions.property)).jsonValue()).trim();
    }

    /**
     * returns array of text for array of elements
     * 
     * @param elementList elements returned by page.$$ 
     * @param opts optional overrides:
     * ```
     * {
     *  "property": 'innerText',   //property to read from
     *  "includeEmpties": false    //include empty entries
     * }
     * ``` 
     * @returns array of text for elements
    */
    static async getTextOfElements(elementList, opts=null) {
        const defaultOptions = {
            "property": 'innerText',
            "includeEmpties": false
        }
        const actualOptions = {...defaultOptions, ...opts}

        let results = []
        for(let i=0; i<elementList.length; i++) { 
            let txt = await ui.getTextOfElement(elementList[i], actualOptions) 
            if(txt || actualOptions.includeEmpties) { 
                results.push(txt)
            }
        }
        return results;
    }


    /**
     * returns the first element having or containing text from elementList
     * @param elementList elements returned by page.$$
     * @param {*} text text to look for
     * @param opts optional overrides:
     * ```
     * {
     *  "property": 'innerText',    //property to read from
     *  "contains": false           //performs contains rather than strict match
     * }
     * ``` 
     * @returns element matching text, or null if not found
     */
    static async findElementInListHavingText(elementList, text, opts=null) {
        const defaultOptions = {
            "property": 'innerText',
            "contains": false
        }
        const actualOptions = {...defaultOptions, ...opts}

        let result = null;
        for(let i=0; i<elementList.length; i++) { 
            let el = elementList[i]
            let elText =  await ui.getTextOfElement(el, actualOptions) 
            if((actualOptions.contains && elText.includes(text)) || (!actualOptions.contains && elText == text)) { 
                result = el;
                break;
            } 
        }
        return result;
    }

    /**
     * clears an element text by selecting all and backspacing
     * @param page playwright page object 
     * @param element element to clear returned by page.$
     */
    static async clearElementText(page, element) {
        await element.click();
        await page.keyboard.down('Control')
        await page.keyboard.press('KeyA')
        await page.keyboard.up('Control')
        await page.keyboard.press('Backspace')
    }
}

module.exports = { ui }