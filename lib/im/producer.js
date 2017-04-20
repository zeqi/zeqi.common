
'use strict';

let Q = require('q');
var jp = require('jsonpath');
let kafka = require('kafka-node');
let debug = require('debug');
let log = debug('zeqi.common:lib:im:producer:log');
let error = debug('zeqi.common:lib:im:producer:error');
let BaseIm = require('./base');

class Payload {
  constructor(topic, messages) {
    this.topic = topic;
    this.messages = messages;
  }
}

class ProducerFact extends BaseIm {
  constructor(client) {
    super(client);
    this.producer = null;
  }

  static get StatusEnum() {
    return {
      ready: 'ready'
    };
  }

  get status() {
    return this._status;
  }

  static get Payload() {
    return Payload;
  }

  /**
   * Check current payloads
   * 
   * @static
   * @param {ProducerFact.Payload} payloads 
   * @returns 
   * 
   * @memberOf ProducerFact
   */
  static checkPayloads(payloads) {
    var method = 'checkPayloads';
    if (typeof payloads != 'object') {
      debug(method, 'payloads invalid', payloads);
      return false;
    }
    if (!Array.isArray(payloads)) {
      payloads = [payloads];
    }
    var result = true;
    payloads.forEach(payload => {
      if (!(payload instanceof this.Payload)) {
        debug(method, 'payload invalid', payload);
        result = false;
      }
    });
    return result;
  }

  /**
   * Get correct payloads by already exist payloads
   * 
   * @static
   * @param {ProducerFact.Payload} payloads 
   * @returns 
   * 
   * @memberOf ProducerFact
   */
  static getCorrectPayloads(payloads) {
    if (!payloads) {
      return null;
    }
    if (!Array.isArray(payloads)) {
      payloads = [payloads];
    }
    var result = [];
    payloads.forEach(payload => {
      if (payload instanceof this.Payload) {
        result.push(payload);
      }
    });
    return result
  }

  /**
    * Get payloads by topics and messages
    * 
    * @param {Array} topics string array
    * @param {Array} messages string array
    * @returns 
    * 
    * @memberOf ProducerFact
    */
  static getPayloadsByTopicsAndMessages(topics, messages) {
    var method = 'getPayloadsByTopicsAndMessages';
    if (!topics || !messages) {
      return null;
    }
    if (!Array.isArray(topics)) {
      topics = [topics];
    }
    if (!Array.isArray(messages)) {
      messages = [messages];
    }

    var result = [];
    topics.forEach(topic => {
      if (typeof topic != 'string') {
        return;
      }
      messages.forEach(message => {
        if (typeof message == 'string') {
          result.push(new this.Payload(topic, message));
          return;
        }
        else if (Array.isArray(message)) {
          var just = true;
          message.forEach(item => {
            if (typeof item != 'string') {
              just = false;
            }
          });
          if (just) {
            result.push(new this.Payload(topic, message));
            return;
          }
        }
        else if (typeof message == 'object') {
          result.push(new this.Payload(topic, JSON.stringify(message)));
          return;
        }
      });
    });
    return result;
  }

  /**
   * Check current payloads
   * 
   * @static
   * @param {ProducerFact.Payload} payloads 
   * @returns 
   * 
   * @memberOf ProducerFact
   */
  checkPayloads(payloads) {
    return ProducerFact.checkPayloads(payloads);
  }

  /**
   * Get correct payloads by already exist payloads
   * 
   * @param {ProducerFact.Payload} payloads 
   * @returns 
   * 
   * @memberOf ProducerFact
   */
  getCorrectPayloads(payloads) {
    return ProducerFact.getCorrectPayloads(payloads);
  }

  /**
   * Get payloads by topics and messages
   * 
   * @param {Array} topics string array
   * @param {Array} messages string array
   * @returns 
   * 
   * @memberOf ProducerFact
   */
  getPayloadsByTopicsAndMessages(topics, messages) {
    return ProducerFact.getPayloadsByTopicsAndMessages(topics, messages);
  }

  isReady() {
    if (this.status == ProducerFact.StatusEnum.ready) {
      return Q.resolve(ProducerFact.StatusEnum.ready);
    }
    return Q.Promise((resolve, reject) => {
      this.producer.on('ready', () => {
        this._status = ProducerFact.StatusEnum.ready;
        return resolve(ProducerFact.StatusEnum.ready);
      });
    });
  }

  /**
   * Send messages
   * 
   * @param {ProducerFact.Payload} payloads ex:[topic: <string>, messages: <string|Array>]
   * @param {function} callback 
   * @returns 
   * 
   * @memberOf ProducerFact
   */
  send(payloads, callback) {
    var method = 'send';
    payloads = this.getCorrectPayloads(payloads);
    return this.isReady().then(status => {
      var topics = jp.query(payloads, '$..topic');
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
      /*this.client.topicExists(topics, (err, data) => {
        console.log('error', err);
        console.log('data', data);
      })*/
      /*this.producer.createTopics(topics, false, (err, data) => {
        console.log('error', err);
        console.log('data', data);
      });*/
      /*return Q.Promise((resolve, reject) => {
        this.producer.send(payloads, (err, data) => {
          if (err) {
            error(method, err);
            return reject(err);
          } else {
            log(method, data);
            return resolve(data);
          }
        });
      }).nodeify(callback);*/
    })
  }

  /**
   * Send messages by topics
   * 
   * @param {Array} topics string Array
   * @param {Array} messages string Array
   * @param {function} callback 
   * @returns 
   * 
   * @memberOf ProducerFact
   */
  sendMessagesByTopics(topics, messages, callback) {
    var method = 'sendMessagesByTopics';
    var payloads = this.getPayloadsByTopicsAndMessages(topics, messages);
    return this.send(payloads, callback);
  }

  init() {
    this.producer = new kafka.HighLevelProducer(this.client);
    this.isReady();
  }

  static init(client) {
    var producerFact = new ProducerFact(client);
    producerFact.init();
    return producerFact;
  }
}

module.exports = ProducerFact;