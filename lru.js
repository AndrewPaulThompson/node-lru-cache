const item = require('./cache-item')
const cache = require('./cache')

/**
 * Least Recently Used cache
 */
class lru extends cache {
    constructor(limit = 5) {
        super(limit)
        this.newest = null
        this.oldest = null
        this.setup()
    }

    /**
     * Setup the newest & oldest data nodes
     */
    setup = () => {
        // Create an Item for the newest & oldest
        this.data['newest'] = new item('newest', 0)
        this.data['oldest'] = new item('oldest', 0)

        // Set them as properties on the class
        this.newest = this.data['newest']
        this.oldest = this.data['oldest']

        // Create a reference between them
        this.newest.prev = this.oldest
        this.oldest.next = this.newest
    }

    /**
     * Inserts a cache item into storage using LRU
     * @param {Item} item Cache Item
     */
    insert = (item) => {
        // Set the current newest item's next reference to the new Item
        this.data[this.newest.key].next = item

        // Set the new Item's previous reference to the current newest item
        this.data[item.key].prev = this.newest

        // Set the current newest item to the new Item
        this.newest = item
    
        // If we are at the cache storage limit
        if (Object.keys(this.data).length > this.limit) {
            // Get the current oldest item's key
            const key = this.oldest.key

            // Set the oldest item to the current oldest item's next reference (next oldest)
            this.oldest = this.oldest.next

            // Delete the current oldest item
            delete this.data[key]
        }
    }

    /**
     * Sets a cache item
     * @param {string} key Cache key
     * @param {string} value Cache value
     */
    set = (key, value) => {
        // If the current key already exists
        if (key in this.data) {
            // Set point the previous & next items to each other
            this.data[key].prev.next = this.data[key].next
            this.data[key].next.prev = this.data[key].prev

            // Then delete the item, so we can replace it (forcing it to be the newest item)
            delete this.data[key]
        }

        // Create an Item
        this.data[key] = new item(key, value)

        // and insert it
        this.insert(this.data[key])
    }
}

module.exports = lru
