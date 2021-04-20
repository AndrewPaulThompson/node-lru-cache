const lru = require('./lru')

it('sets a cache item', () => {
    const cache = new lru(3)

    // Given I have a cache key & value pair
    const key = 'key'
    const value = 'value'

    // When I set the cache item
    cache.set(key, value)

    // I expect the to retrieve the cache item by key
    const ret = cache.get(key)
    expect(ret).toEqual(value)
})

it('only stores a specified number of item', () => {
    // Given I have a limit of 5, and initialise the cache with that limit
    const limit = 5
    const cache = new lru(limit)

    // When I add 6 items than the limit
    cache.set('key1', 'value')
    cache.set('key2', 'value')
    cache.set('key3', 'value')
    cache.set('key4', 'value')
    cache.set('key5', 'value')
    cache.set('key6', 'value')

    // Then the total number of items in cache is equal to the limit
    const items = Object.keys(cache.getAll()).length
    expect(items).toEqual(limit)
})

it('removes least recently used items', () => {
    const cache = new lru(3)

    // Given I have some cache items
    cache.set('key1', 'value1')
    cache.set('key2', 'value2')
    cache.set('key3', 'value3')

    // When I use one of the items
    cache.get('key1')

    // And if I add a new cache item
    cache.set('key4', 'value4')

    // Then I expect the cache item I used recently to be available
    const key1 = cache.get('key1')
    expect(key1).toBe('value1')

    // And I expect the least recently used key to be removed
    const key2 = cache.get('key2')
    expect(key2).toBeNull()
})
