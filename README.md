# statsdb

the most simple statsd backend.
Just pipe everything into [redis](http://redis.io) and be happy.

# Installation

**npm coming soon**

# Configuration

```json
{
  ...
// all of this is optional
, statsdbRedisPort: 1337
, statsdbRedisHost: 'localhost'
, statsdbRedisOptions: { /* see [node-redis docs](https://github.com/mranney/node_redis#rediscreateclientport-host-options) */ }
// this is not
, backends: [ "statsdb" /*, ...*/ ]
}

```

# TODO

A lot. Livetime of values, garbage collection, auth on redis, errorhandling...
