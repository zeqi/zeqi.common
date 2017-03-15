'use strict';

let BaseDs = require('./base');
let MongDS = require('./mongo');
let RedisDS = require('./redis');

class DS extends BaseDs {
  constructor() {

  }

  static initAllDS(conf) {
    MongDS.init(conf);
    RedisDS.init(conf);
  }

  static get MongDS() {
    return MongDS;
  }

  static get RedisDS() {
    return RedisDS;
  }
}

module.exports.DS = DS;