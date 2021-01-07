const Item = require('./CacheItem')

const data = {}
const limit = 5
data['newest'] = new Item('newest', 0)
data['oldest'] = new Item('oldest', 0)
let newest = data['newest']
let oldest = data['oldest']
newest.prev = oldest
oldest.next = newest

const insert = (item) => {
    data[newest.key].next = item
    data[item.key].prev = newest
    newest = item

    if (Object.keys(data).length > limit) {
        const key = oldest.key
        oldest = oldest.next
        delete data[key]
    }
}

const set = (key, value) => {
    if (key in data) {
        data[key].prev.next = data[key].next
        data[key].next.prev = data[key].prev
        delete data[key]
    }

    data[key] = new Item(key, value)
    insert(data[key])
}

const get = (key) => {
    if (key in data) {
        return data[key].value
    }

    return null
}

const getAll = () => {
    return data
}

module.exports = { set, get, getAll }