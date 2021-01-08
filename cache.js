const Item = require('./cache-item')

class cache {
    constructor(limit) {
        this.data = {}
        this.limit = limit
        this.newest = null
        this.oldest = null
        this.setup()
    }

    /**
     * Setup the newest & oldest data nodes
     */
    setup = () => {
        // Create an Item for the newest & oldest
        this.data['newest'] = new Item('newest', 0)
        this.data['oldest'] = new Item('oldest', 0)

        // Set them as properties on the class
        this.newest = this.data['newest']
        this.oldest = this.data['oldest']

        // Create a reference between them
        this.newest.prev = this.oldest
        this.oldest.next = this.newest
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
