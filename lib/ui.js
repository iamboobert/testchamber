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
             /* c8 ignore next */
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
             /* c8 ignore next */
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
     * given a parentSelector and a childSelector that is relative to the parentSelector, will
     * return the element from parentSelector who's childSelector's text is child text
     * 
     * useful for finding a row (element in parentSelector) who's cell's value (childSelector) is childText
     * 
     * @param {*} page playwright page object
     * @param {*} parentSelector selector representing the parents (rows)
     * @param {*} childSelector selector relative to parentSelector matching the "key" cell (cell)
     * @param {*} childText text to match in childSelector
     * @param opts optional overrides:
     * ```
     * {
     *  "property": 'innerText',    //property to read from
     *  "contains": false           //performs contains rather than strict match
     * } 
     * @returns element from parentSelector
     */
    static async findElementWithChildHavingText(page, parentSelector, childSelector, childText, opts = null) {
        const defaultOptions = {
            "property": 'innerText',
            "contains": false
        }
        const actualOptions = {...defaultOptions, ...opts}
        
        let result = null;
        let tableRows = await page.$$(parentSelector);
        for(let i=0; i<tableRows.length; i++) {
            let row = tableRows[i]
            let cell = await row.$(childSelector)
            if(!cell) { continue }
            let actualCellText = await ui.getTextOfElement(cell, actualOptions)
            if((actualOptions.contains && actualCellText.includes(childText)) || (!actualOptions.contains && actualCellText == childText)) { 
                result = row;
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

    /**
     * waits for elementhandle to include text
     * @param {*} page playwright page object
     * @param {*} element elementhandle to wait on
     * @param {*} text text to wait for
     * @param opts optional overrides:
     * ```
     * {
     *  "timeOutMs": 5000,    //amount of time to wait
     *  "contains": false     //performs contains rather than strict match
     * } 
     */
    static async waitForTextInElement(page, element, text, opts) {  
        const defaultOptions = {
            "timeOutMs": 5000,
            "contains": false
        }
        const actualOptions = {...defaultOptions, ...opts}
        let useContains = actualOptions.contains
        await page.waitForFunction(
            /* c8 ignore next 7 */
            ({element, text, contains}) => {
                let innerText  = element.innerText.trim()
                if((contains && innerText.includes(text)) || (!contains && innerText == text)) { 
                    return true
                }
                return false                    
            },
            {element, text, useContains},
            {timeout: actualOptions.timeOutMs}
        )  
    }

    /**     
     * waits for at least one element matching `selector` to contain `text`
     * @param {*} page playwright page object
     * @param {*} selector selector to wait for
     * @param {*} text text to search for
     * @param opts optional overrides:
     * ```
     * {
     *  "timeOutMs": 5000,    //amount of time to wait
     *  "contains": false     //performs contains rather than strict match
     * }
     */
    static async waitForText(page, selector, text, opts) { 
        const defaultOptions = {
            "timeOutMs": 5000,
            "contains": false
        }
        const actualOptions = {...defaultOptions, ...opts}
        let useContains = actualOptions.contains
        await page.waitForFunction(
            /* c8 ignore next 9 */
            ({selector, text, contains}) => {
                let elements = document.querySelectorAll(selector)
                for(let i=0; i<elements.length; i++) { 
                    let innerText  = elements[i].innerText.trim()
                    if((contains && innerText.includes(text)) || (!contains && innerText == text)) { 
                        return true
                    }
                }
                return false;
            },
            {selector, text, useContains},
            {timeout: actualOptions.timeOutMs}
        )    
    }

     /**
     * does an action that triggers a new tab to be opened, returning the new page representing that tab
     * callers really should call .close on the returned page 
     * 
     * @param {*} page puppeteer page object of the source page 
     * @param {*} actionClosure closure that triggers the new tab
     * @returns new puppeteer page for the new tab 
     */
     static async expectNewTab(page, actionClosure) {
        let [newPage] = await Promise.all([
            new Promise(resolve => page.once('popup', resolve)),
            actionClosure()
        ])
        return newPage
    }

}

module.exports = { ui }