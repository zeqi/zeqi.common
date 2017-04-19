'use strict';

let Q = require('q');
let kafka = require('kafka-node');
let debug = require('debug');
let log = debug('zeqi.common:lib:im:consumer:log');
let error = debug('zeqi.common:lib:im:consumer:error');
let CommonResult = require('../utils/result');
/*let svcMgrt = require('../mgrt');
let MapMgrt = svcMgrt.MapMgrt;
let mgrt = MapMgrt.*/

class Consumer extends CommonResult {
  constructor(client, topics, options, onMessage) {
    super();
    this.client = client;
    this.topics = topics;
    this.options = options || { autoCommit: true, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };
    this.onMessage = onMessage;
    this.init();
  }

  set client(client) {
    if (!(client instanceof kafka.Client)) {
      error('client', 'client invalid', client);
      throw this.ErrorResult(406, 'client invalid');
    }
    this._client = client;
  }

  get client() {
    return this._client;
  }

  set topics(topics) {
    var method = 'topics';
    if (!topics) {
      error(method, 'topics invalid', topics);
      throw this.ErrorResult(406, 'topics invalid');
    }
    if (!Array.isArray(topics)) {
      topics = [topics];
    }
    var just = true;
    var result = [];
    topics.forEach(item => {
      if (typeof item == 'string') {
        result.push({ topic: item });
        return;
      }
      else if (item && typeof item.topic == 'string') {
        result.push(item);
        return;
      }
      just = false;
    });
    if (!just) {
      throw this.ErrorResult(406, 'topic invalid');
    }
    this._topics = result;
  }

  get topics() {
    return this._topics;
  }

  set onMessage(onMessage) {
    if (typeof onMessage != 'function') {
      this._onMessage = function (message) {
        console.log(message);
        return Q.resolve(message);
      }
      return;
    }
    this._onMessage = onMessage;
  }

  get onMessage() {
    return this._onMessage;
  }

  onError(err) {
    console.log(err);
    return Q.reject(err);
  }

  init() {
    var consumer = new kafka.HighLevelConsumer(this.client, this.topics, this.options);
    consumer.on('message', this.onMessage.bind(this));
    consumer.on('error', this.onError.bind(this));
  }

  static init(client, topics, options, onMessage) {
    return new Consumer(client, topics, onMessage, options);
  }
}

module.exports = Consumer;