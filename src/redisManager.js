const redis = require('redis')

const REDIS_HOST = process.env.REDIS_HOST || "redis"; // container name or network alias
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT, REDIS_HOST);

client.on("connect", () => {
    console.log(
      "✓-- " + "Redis client pid=>" + process.pid + " Connected"
    )
  })
  
  client.on("error", function() {
    console.log(
      "x-- " + "Redis client pid=>" + process.pid + " error"
    )
  })

var cacheData = (key, jsonData) => {
  client.set(key, JSON.stringify(jsonData) , (err, reply) => {
    console.log('redis reply: ' + reply + '\t' + 'redis err: ' + err)
  })
}

var getCachedData = (key, callback) => {
  client.get(key, (err, reply) => {
    if (err != null) {
      console.log('redis err: ' + err.message)
      callback(false, err.message)
    } else if (reply == null) {
      callback(false, "not available")
    } else {
      callback(true, reply)
    }
  })
}

module.exports = {

    cacheData,
    getCachedData,
}