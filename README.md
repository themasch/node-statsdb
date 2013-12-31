# statsdb

the probably most simple [statsd](https://github.com/etsy/statsd) backend.
Just pipe everything into [redis](http://redis.io) and be happy.

# Installation

*npm coming soon*

# Configuration

```js
{
//  ...
// all of this is optional
, statsdbRedisPort: 1337
, statsdbRedisHost: 'localhost'
, statsdbRedisOptions: { /* see [node-redis docs](https://github.com/mranney/node_redis#rediscreateclientport-host-options) */ }
// this is not
, backends: [ "statsdb" /*, ...*/ ]
}

```
# TODO

A lot. Lifetime of values, garbage collection, authentication on redis, error handling...
