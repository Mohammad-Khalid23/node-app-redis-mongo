/* eslint-disable no-dupe-keys */
/* eslint-disable no-undef */
const redis = require('redis');
const client = redis.createClient(6379,'redis');
client.on('ready',function() {
    console.log("Redis is ready");
   });
   
   client.on('error',function() {
    console.log("Error in Redis");
   });
// let redisAsync = require('./helper/redisAsync')(client);
const promiser = (resolve, reject) => (err, data) => {
  if (err) { reject(err); }
  resolve(data);
};


module.exports = function () {
  return {
    get: function (key) {
      return new Promise((resolve, reject) => {
        client.get(key, promiser(resolve, reject));
      });
    },
    set: function (key, value) {
      return new Promise((resolve, reject) => {
        client.set(key, value, promiser(resolve, reject));
      });
    },
    del: function (key) {
      return new Promise((resolve, reject) => {
        client.del(key, promiser(resolve, reject));
      });
    },
    incr: function (key) {
      return new Promise((resolve, reject) => {
        client.incr(key, promiser(resolve, reject));
      });
    },
    decr: function (key) {
      return new Promise((resolve, reject) => {
        client.decr(key, promiser(resolve, reject));
      });
    },
    hgetall: function (key) {
      return new Promise((resolve, reject) => {
        client.hgetall(key, promiser(resolve, reject));
      });
    },
    hincrby: function (key, subKey, num) {
      return new Promise((resolve, reject) => {
        client.hincrby(key, subKey, num, promiser(resolve, reject));
      });
    },
    hget: function (key, subKey) {
      return new Promise((resolve, reject) => {
        client.hget(key, subKey, promiser(resolve, reject));
      });
    },
    hset: function (key, subKey, value) {
      return new Promise((resolve, reject) => {
        client.hset(key, subKey, value, promiser(resolve, reject));
      });
    },
    hdel: function (key, subKey) {
      return new Promise((resolve, reject) => {
        client.hdel(key, subKey, promiser(resolve, reject));
      });
    },
    rpush: function (key, subkey) {
      return new Promise((resolve, reject) => {
        client.rpush(key, subkey, promiser(resolve, reject));
      });
    },
    llen: function (key) {
      return new Promise((resolve, reject) => {
        client.llen(key, promiser(resolve, reject));
      });
    },
    lrange: function (key, start, finish) {
      return new Promise((resolve, reject) => {
        client.lrange(key, start, finish, promiser(resolve, reject));
      });
    },
    lrem: function (key, amount, subkey) {
      return new Promise((resolve, reject) => {
        client.lrem(key, amount, subkey, promiser(resolve, reject));
      });
    },
    del: function (key) {
      return new Promise((resolve, reject) => {
        client.del(key, promiser(resolve, reject));
      });
    },
    lpop: function (key) {
      return new Promise((resolve, reject) => {
        client.lpop(key, promiser(resolve, reject));
      });
    },
    geoadd: function (key, long, lat, subKey) {
      return new Promise((resolve, reject) => {
        client.geoadd(key, long, lat, subKey, promiser(resolve, reject));
      });
    },
    geopos: function (key, subKey) {
      return new Promise((resolve, reject) => {
        client.geopos(key, ...subKey, promiser(resolve, reject));
      });
    },
    georadius: function (key, long, lat, distance, unit) {
      return new Promise((resolve, reject) => {
        client.georadius(key, long, lat, distance, unit, 'WITHDIST', 'ASC', promiser(resolve, reject));
      });
    },
    keys: function (key) {
      return new Promise((resolve, reject) => {
        client.keys(key, promiser(resolve, reject));
      });
    },
    llen: function (key) {
      return new Promise((resolve, reject) => {
        client.llen(key, promiser(resolve, reject));
      });
    },
    multi: function () {
      return client.multi();
    },
    exec: function (multi) {
      return new Promise((resolve, reject) => {
        multi.exec(promiser(resolve, reject));
      });
    }
  };
};
