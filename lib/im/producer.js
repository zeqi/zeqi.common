
'use strict';

let Q = require('q');
var jp = require('jsonpath');
let kafka = require('kafka-node');
let debug = require('debug');
let log = debug('zeqi.common:lib:im:producer:log');
let error = debug('zeqi.common:lib:im:producer:error');
let CommonResult = require('../utils/result');

class Payload {
  constructor(topic, messages) {
    this.topic = topic;
    this.messages = messages;
  }
}

class Producer extends CommonResult {
  constructor(client) {
    super();
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

  static get StatusEnum() {
    return {
      ready: 'ready'
    };
  }

  get status() {
    return this._status;
  }

  get producer() {
    return this._producer;
  }

  static get Payload() {
    return Payload;
  }

  /**
   * Check current payloads
   * 
   * @static
   * @param {Producer.Payload} payloads 
   * @returns 
   * 
   * @memberOf Producer
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
   * @param {Producer.Payload} payloads 
   * @returns 
   * 
   * @memberOf Producer
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
    * @memberOf Producer
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
   * @param {Producer.Payload} payloads 
   * @returns 
   * 
   * @memberOf Producer
   */
  checkPayloads(payloads) {
    return Producer.checkPayloads(payloads);
  }

  /**
   * Get correct payloads by already exist payloads
   * 
   * @param {Producer.Payload} payloads 
   * @returns 
   * 
   * @memberOf Producer
   */
  getCorrectPayloads(payloads) {
    return Producer.getCorrectPayloads(payloads);
  }

  /**
   * Get payloads by topics and messages
   * 
   * @param {Array} topics string array
   * @param {Array} messages string array
   * @returns 
   * 
   * @memberOf Producer
   */
  getPayloadsByTopicsAndMessages(topics, messages) {
    return Producer.getPayloadsByTopicsAndMessages(topics, messages);
  }

  isReady() {
    if (this.status == Producer.StatusEnum.ready) {
      return Q.resolve(Producer.StatusEnum.ready);
    }
    return Q.Promise((resolve, reject) => {
      this.producer.on('ready', () => {
        this._status = Producer.StatusEnum.ready;
        return resolve(Producer.StatusEnum.ready);
      });
    });
  }

  /**
   * Send messages
   * 
   * @param {Producer.Payload} payloads ex:[topic: <string>, messages: <string|Array>]
   * @param {function} callback 
   * @returns 
   * 
   * @memberOf Producer
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
   * @memberOf Producer
   */
  sendMessagesByTopics(topics, messages, callback) {
    var method = 'sendMessagesByTopics';
    var payloads = this.getPayloadsByTopicsAndMessages(topics, messages);
    return this.send(payloads, callback);
  }

  static init(client) {
    return new Producer(client);
  }
}

module.exports = Producer;