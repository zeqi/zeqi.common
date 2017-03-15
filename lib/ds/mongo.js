'use strict';

let BaseDS = require('./base');
let mongoose = require('mongoose');

class MongoDS extends BaseDS {
  constructor(config) {

  }

  static checkConf(conf) {
    if (!conf) {
      throw new this.ErrorResult(406, 'mongodb conf invalid');
    }
    return true;
  }

  static setDSOptions(attr, options) {
    if (typeof options.uri == 'string')
      this.dsMgrt.set(attr, new this.DSOptions(options, mongoose.createConnection(options.uri, options)));
    else
      this.dsMgrt.set(attr, new this.DSOptions(options, mongoose.createConnection(options.host, options.dbname, options.port, options)));
  }

  static init(conf) {
    conf = this.getDSConfByType(this.dsType.mongodb, conf);
    this.checkConf(conf);
    for (var attr in conf) {
      if (attr && conf[attr]) {
        var connection = this.getConnection(attr);
        if (connection && connection.readyState === 1) {
          continue;
        }
        var options = {
          dsType: this.dsType.mongodb,
          uri: conf[attr].uri,
          host: conf[attr].host || 'localhost',
          port: conf[attr].port || 27017,
          dbname: conf[attr].db,
          user: conf[attr].user || '',
          pass: conf[attr].password || ''
        }
        this.setDSOptions(attr, options);
      }
    }
  }
}

module.exports = MongoDS;