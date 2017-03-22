'use strict';

var debug = require('debug')('zeqi.common:lib:ds');

let BaseDs = require('./base');
let MongDS = require('./mongo');
let RedisDS = require('./redis');

class DS extends BaseDs {
  constructor() {

  }

  static initAllDS(conf) {
    var method = 'initAllDS';
    debug(method,'DataProviders conf', conf);
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