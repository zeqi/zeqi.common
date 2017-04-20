'use strict';

let Q = require('q');
let kafka = require('kafka-node');
let debug = require('debug');
let log = debug('zeqi.common:lib:im:broker:log');
let error = debug('zeqi.common:lib:im:broker:error');
let socketio = require('socket.io');

let CommonResult = require('../utils/result');
let BaseIm = require('./base');
let ProducerFact = require('./producer');
let ConsumerFact = require('./consumer');

class ClientOptions extends CommonResult {
  constructor(connectionString, clientId, options) {
    super();
    this.connectionString = connectionString || '127.0.0.1:2181';
    this.clientId = clientId;
    this.options = options;
  }
}

class Broker extends BaseIm {
  constructor(name, server, clientOptions) {
    super();
    this.name = name;
    this.server = server;
    this.clientOptions = clientOptions || new ClientOptions();;
    this.default_port = 3000;

    this.client = null;
    this.io = null;
    this.producerFact = null;
    this.consumerFact_Mgrt = new Map();
  }

  set clientOptions(clientOptions) {
    if (!(clientOptions instanceof Broker.ClientOptions)) {
      error('clientOptions', 'clientOptions invalid', clientOptions);
      throw new this.ErrorResult(406, 'clientOptions invalid');
    }
    this._clientOptions = clientOptions;
  }

  get clientOptions() {
    return this._clientOptions;
  }

  onMessage(message) {
    console.log(message);
    this.io.emit(message.topic, message);
  }

  createConsumer(topics, options) {
    var consumerFact = this.consumerFact_Mgrt.get(topics);
    if (!consumerFact) {
      var consumerFact = ConsumerFact.init(this.client, topics, options, this.onMessage.bind(this));
      this.consumerFact_Mgrt.set(topics, consumerFact);
    }
    return consumerFact;
  }

  deleteConsumer(topics) {
    var consumerFact = this.consumerFact_Mgrt.get(topics);
    if (!consumerFact) {

    }
    return consumerFact;
  }

  init() {
    this.client = new kafka.Client(this.clientOptions.connectionString, this.clientOptions.clientId, this.clientOptions.options);
    this.producerFact = ProducerFact.init(this.client);

    if (this.server) {
      this.io = socketio(this.server);
    }
    else {
      this.io = socketio();
      this.io.listen(this.default_port);
    }
  }

  static get ClientOptions() {
    return ClientOptions;
  }

  static init(name, server, clientOptions) {
    var broker = new Broker(name, server, clientOptions);
    broker.init();
    return broker;
  }
}

module.exports = Broker;