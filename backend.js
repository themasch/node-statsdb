var redis = require('redis')
var statsdb = {}
module.exports = statsdb

statsdb.init = function(startup, config, events, logger)
{
    config = config || {}
    config.prefix = config.prefix || ''
    var state = {
        config: config,
        logger: logger,
        client: redis.createClient(
            config.statsdbRedisPort || null,
            config.statsdbRedisHost || null,
            config.statsdbRedisOptions || null
        ),
        status: {
            start_time: startup,
            last_write: 0,
            last_error: 0,
            errors: [],
            total_writes: 0
        }
    }

    events.on('flush', statsdb.flush.bind(state))
    events.on('status', statsdb.status.bind(state))
    return true
}

statsdb.flush = function(timestamp, metrics)
{
    var write = statsdb.store.bind(this)
    for(var type in metrics) {
        for(var key in metrics[type]) {
            var value = metrics[type][key]
            write(timestamp, type, key, value)
        }
    }
    this.status.last_write = Date.now() / 1000 | 0
    this.status.total_writes++
}

statsdb.status = function(write)
{
    var now = Date.now() / 1000 | 0
    var s   = this.status
    write(null, 'statsdb', 'last_write', now - s.last_write)
    write(null, 'statsdb', 'total_writes', s.total_writes)
    /*write(null, 'statsdb', 'last_error', now - s.last_error)
    write(null, 'statsdb', 'error_count', s.errors.length)
    write(null, 'statsdb', 'errors', (s.errors.length == 0) ? 'none' : s.errors)*/
}

statsdb.store = function(time, type, key, value)
{
    var encoded = time + "|" + value
    var metric_key = this.config.prefix + type + '.' + key
    this.client.zadd(metric_key, time, encoded)
}
