class cache {
    constructor(limit) {
        this.data = {}
        this.limit = limit
    }

    /**
     * Gets an item by it's key, returns null if no item for the key is found
     * @param {string} key Cache key
     */
    get = (key) => {
        if (key in this.data) {
            return this.data[key].value
        }
    
        return null
    }

    /**
     * Gets all of the current items stored
     */
    getAll = () => {
        return this.data
    }
}

module.exports = cache