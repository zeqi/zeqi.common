'use strict';

let BaseDS = require('./base');
let redis = require('redis');

class RedisDS extends BaseDS {
  constructor() {

  }

  static checkConf(conf) {
    if (!conf) {
      throw new this.ErrorResult(406, 'redis conf invalid');
    }
    return true;
  }

  static setDSOptions(attr, options) {
    this.dsMgrt.set(attr, new this.DSOptions(options, redis.createClient(options)));
  }

  static init(conf) {
    conf = this.getDSConfByType(this.dsType.redis, conf);
    this.checkConf(conf);
    for (var attr in conf) {
      if (attr && conf[attr]) {
        if (this.getConnection(attr)) {
          continue;
        }
        var options = {
          dsType: this.dsType.redis,
          host: conf[attr].host || 'localhost',
          port: conf[attr].port || 6379,
          db: conf[attr].db || 0,
          user: conf[attr].user || ''
          // password: conf[attr].password || ''
        }
        this.setDSOptions(attr, options);
      }
    }
  }
}

module.exports = RedisDS;