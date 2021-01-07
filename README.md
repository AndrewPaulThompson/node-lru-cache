## A toy LRU cache built in nodejs

### Usage

```
const cache = require('./cache')

cache.set('key', 'value')
const cached = cache.get('key')

console.log(cached)
```