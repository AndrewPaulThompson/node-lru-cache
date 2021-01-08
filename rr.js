const item = require('./cache-item')
const cache = require('./cache')

/**
 * Random replacement cache
 */
class rr extends cache {
    constructor(limit = 5) {
        super(limit)
    }

    /**
     * Inserts a cache item, deletes a random existing key if the storage is full
     * @param {item} item Cache Item
     */
    insert(item) {
        // If we're at the storage limit
        if (Object.keys(this.data).length >= this.limit) {
            // Get a random key
            const keyInt = Math.floor(Math.random() * Object.keys(this.data).length)
            const key = Object.keys(this.data)[keyInt]

            // And delete it
            delete this.data[key]
        }

        // Add the new item to storage
        this.data[item.key] = item
    }

    /**
     * Sets a cache item
     * @param {string} key Cache key
     * @param {string} value Cache value
     */
    set = (key, value) => {
        // If the current key already exists, update it's value
        if (key in this.data) {
            this.data[key] = value
            return
        }

        // Handle inserting the new item
        this.insert(new item(key, value))
    }
}

module.exports = rr
