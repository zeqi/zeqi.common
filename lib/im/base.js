'use strict';

let Q = require('q');
let kafka = require('kafka-node');
let debug = require('debug');
let log = debug('zeqi.common:lib:im:base:log');
let error = debug('zeqi.common:lib:im:base:error');
let CommonResult = require('../utils/result');

class BaseIM extends CommonResult {
  constructor(client) {
    super();
    this.client = client;
  }

  set client(client) {
    if (client && !(client instanceof kafka.Client)) {
      debug('client', 'client invalid', client);
      throw new this.ErrorResult(406, 'client invalid');
    }
    this._client = client;
  }

  get client() {
    return this._client;
  }

  /**
   * Get object array by topics
   * 
   * @static
   * @param {any} topics 
   * @returns {Array} object array ex:[{topic:'beijing'}]
   * 
   * @memberOf BaseIM
   */
  static getConsumerTopics(topics) {
    var method = 'getConsumerTopics';
    if (!topics) {
      error(method, 'topics invalid', topics);
      return [];
    }
    if (!Array.isArray(topics)) {
      topics = [topics];
    }
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
    });
    return result;
  }

  /**
   * Get string array by topics
   * 
   * @static
   * @param {any} topics 
   * @returns {Array} string array topics. ex: ['beijing']
   * 
   * @memberOf BaseIM
   */
  static getStringArrayTopics(topics) {
    var method = 'getStringArrayTopics';
    if (!topics) {
      error(method, 'topics invalid', topics);
      return [];
    }
    if (!Array.isArray(topics)) {
      topics = [topics];
    }
    var result = [];
    topics.forEach(item => {
      if (typeof item == 'string') {
        result.push(item);
        return;
      }
      else if (item && typeof item.topic == 'string') {
        result.push(item.topic);
        return;
      }
    });
    return result;
  }

  topicExists(topics, callback) {
    return Q.Promise((resolve, reject) => {
      this.client.topicExists([topics], (err) => {
        if (err) {
          return reject(false);
        }
        return resolve(true);
      });
    }).nodeify(callback);
  }

}

module.exports = BaseIM;