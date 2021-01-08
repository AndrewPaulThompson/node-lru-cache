const lru = require('./lru')
const lruCache = new lru(3)

lruCache.set('key', 'value')
const item = lruCache.get('key')

console.log(item)

const rr = require('./rr')
const rrCache = new rr(4)

rrCache.set('key', 'value')
const item = rrCache.get('key')

console.log(item)

