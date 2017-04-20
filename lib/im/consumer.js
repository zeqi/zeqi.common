'use strict';

let Q = require('q');
let kafka = require('kafka-node');
let debug = require('debug');
let log = debug('zeqi.common:lib:im:consumer:log');
let error = debug('zeqi.common:lib:im:consumer:error');
let CommonResult = require('../utils/result');

class ConsumerOptions extends CommonResult {
  constructor(topics, options) {
    super()
    this.topics = topics;
    this.options = options || { autoCommit: true, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };
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
}

class ConsumerFact extends ConsumerOptions {
  constructor(client, topics, options, onMessage) {
    super(topics, options);
    this.client = client;
    this.onMessage = onMessage;
    this.consumer = null;
  }

  set client(client) {
    if (!(client instanceof kafka.Client)) {
      error('client', 'client invalid', client);
      throw this.errorResult(406, 'client invalid');
    }
    this._client = client;
  }

  get client() {
    return this._client;
  }

  set onMessage(onMessage) {
    if (typeof onMessage != 'function') {
      this._onMessage = function (message) {
        console.log(message);
        return Q.resolve(message);
      };
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
    this.consumer = new kafka.HighLevelConsumer(this.client, this.topics, this.options);
    this.consumer.on('message', this.onMessage.bind(this));
    this.consumer.on('error', this.onError.bind(this));
  }

  static get ConsumerOptions() {
    return ConsumerOptions;
  }

  static init(client, topics, options, onMessage) {
    var consumerFact = new ConsumerFact(client, topics, options, onMessage);
    consumerFact.init();
    return consumerFact;
  }
}

module.exports = ConsumerFact;