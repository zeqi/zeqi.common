'use strict';

var kafka = require('kafka-node');
var debug = require('debug')('zeqi.common:lib:im:broker');
let CommonResult = require('../utils/result');
class Broker extends CommonResult {
  constructor(client) {
    this.client = client;
    this.producer = null;
    this.consumer = null;
  }

  set client(client) {
    if (!(client instanceof kafka.Client)) {
      debug('client', 'client invalid', client);
      throw { errorCode }
    }
    this._client = client;
  }

  get client() {
    return this._client;
  }
}