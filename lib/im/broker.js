'use strict';

let Q = require('q');
let kafka = require('kafka-node');
let debug = require('debug');
let log = debug('zeqi.common:lib:im:broker:log');
let error = debug('zeqi.common:lib:im:broker:error');
let CommonResult = require('../utils/result');

class Payload {
  constructor(topic, messages) {
    this.topic = topic;
  }

  set topic(topic) {
    this._topic = topic;
  }
  get topic() {
    return this._topic;
  }

  set messages(messages) {
    this._messages = messages;
  }
  get messages() {
    return this._messages;
  }
}

class Broker extends CommonResult {
  constructor(client) {
    this.client = client;
  }

  set client(client) {
    if (!(client instanceof kafka.Client)) {
      debug('client', 'client invalid', client);
      throw { errorCode }
    }
    this._client = client;
    this._producer = new kafka.HighLevelProducer(client);
  }

  get client() {
    return this._client;
  }

  get producer() {
    return this._producer;
  }

  static get Payload() {
    return Payload;
  }

  static checkPayloads(payloads) {
    var method = 'checkPayloads';
    if (typeof payloads != 'object') {
      throw 
    }
  }

  /**
   * send messages
   * 
   * @param {Array} payloads ex:[topic: <string>, messages: <string|Array>]
   * 
   * @memberOf Broker
   */
  send(payloads, callback) {
    var method = 'send';
    return Q.Promise((resolve, reject) => {
      this.producer.send(payloads, (err, data) => {
        if (err) {
          error(method, err);
          return reject(err);
        } else {
          log(method, data);
          return resolve(data);
        }
      });
    }).nodeify(callback);
  }
}