const lru = require('./lru')
const cache = new lru(3)

cache.set('key', 'value')
const cached = cache.get('key')

console.log(cached)