'use strict';

let CommonResult = require('../utils/result');
let svcMgrt = require('../svcMgrt');
let MapMgrt = svcMgrt.MapMgrt;

class DSOptions {
  /**
   * Creates an instance of DSOptions.
   * @param {Object} options DataSource conf
   * @param {any} connection 
   * 
   * @memberOf DSOptions
   */
  constructor(options, connection) {
    this.options = options;
    this.connection = connection;
  }
}

class BaseDS extends CommonResult {
  constructor() {

  }

  static get DSOptions() {
    return DSOptions;
  }

  static get dsType() {
    return {
      mongodb: 'mongodb',
      redis: 'redis'
    }
  }

  static get ds_mgrt_name() {
    return 'DataSource';
  }

  static set dsMgrt(dsMgrt) {
    this._dsMgrt = dsMgrt;
  }

  static get dsMgrt() {
    return this._dsMgrt;
  }

  static set dsConf(dsConf) {
    this._dsConf = dsConf;
  }

  static get dsConf() {
    return this._dsConf;
  }

  static initDSMgrt(conf) {
    this.dsConf = conf;
    this.dsMgrt = MapMgrt.CREATE_MAP(this.ds_mgrt_name);
  }

  /**
   * 
   * 
   * @static
   * @param {string} name Data source name
   * @returns 
   * 
   * @memberOf BaseDS
   */
  static getConnection(name) {
    if (!this.dsMgrt) {
      this.initDSMgrt();
    }
    var conn = this.dsMgrt.get(name);
    if (!conn || !(conn instanceof this.DSOptions)) {
      return null;
    }

    return conn.connection;
  }

  static getDSConfByType(dsType, conf) {
    if (!this.dsType[dsType]) {
      throw { errorCode: 406, message: 'Not support ' }
    }

    conf = conf || this.dsConf;
    if (typeof conf != 'object') {
      return null;
    }

    var dsConf = {};
    if (conf.dsType) {
      dsConf['default'] = conf;
    }

    for (var attr in conf) {
      if (attr && conf[attr] && conf[attr].dsType && conf[attr].dsType == this.dsType[dsType]) {
        dsConf[attr] = conf[attr];
      }
    }
    return dsConf;
  }

  get dsMgrt() {
    if (!BaseDS.dsMgrt) {
      BaseDS.initDSMgrt();
    }
    return BaseDS.dsMgrt;
  }
}

module.exports = BaseDS;