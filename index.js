const cache = require('./cache')

cache.set('key', 'value')
const cached = cache.get('key')

console.log(cached)