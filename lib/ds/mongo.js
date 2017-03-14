'use strict';

let BaseDS = require('./base');
let mongoose = require('mongoose');

class DS extends BaseDS {
  constructor(config) {

  }

  static checkMongodbConf(conf) {
    if (!conf) {
      throw new this.ErrorResult(406, 'mongodb conf invalid');
    }
    return true;
  }

  static init(conf) {
    conf = this.getDSConfByType(this.dsType.mongodb, conf);
    checkMongodbConf(conf)
    for (var attr in conf) {
      if (attr && conf[attr]) {
        var options = {
          user: conf[attr].user || '',
          pass: conf[attr].password || ''
        }
        this.dsMgrt.set(attr, mongoose.createConnection(conf[attr].host || 'localhost', conf[attr].db, conf[attr].port || 27017, options));
      }
    }
  }
}

module.exports = DS;