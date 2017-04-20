'use strict';

let Q = require('q');
let kafka = require('kafka-node');
let debug = require('debug');
let log = debug('zeqi.common:lib:im:consumer:log');
let error = debug('zeqi.common:lib:im:consumer:error');
let BaseIm = require('./base');

class ConsumerOptions extends BaseIm {
  constructor(client, topics, options) {
    super(client);
    this.origTopics = topics;
    this.topics = topics;
    this.options = options || { autoCommit: true, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };
  }

  getConsumerTopics(topics) {
    return ConsumerFact.getConsumerTopics(topics);
  }

  set topics(topics) {
    var method = 'topics';
    var correntTopics = this.getConsumerTopics(topics);
    if (correntTopics.length < 1) {
      error(method, 'topics invalid', topics);
      throw this.ErrorResult(406, 'topics invalid');
    }
    this._topics = correntTopics;
  }

  get topics() {
    return this._topics;
  }
}

class ConsumerFact extends ConsumerOptions {
  constructor(client, topics, options, onMessage) {
    super(client, topics, options);
    this.client = client;
    this.onMessage = onMessage;
    this.consumer = null;
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

  close() {

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