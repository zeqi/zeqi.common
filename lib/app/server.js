'use strict';

var http = require('http');
var https = require('https');
var util = require('util');
var Q = require('q');
/**
 * App server class
 *
 * @class AppServer
 */
class AppServer {

  /**
   * Creates an instance of AppServer.
   *
   * @param name {string} server name
   * @param server {http.Server|https.Server}
   *
   * @memberOf AppServer
   */
  constructor(name, server) {
    this.name = name;
    this.server = server;
  }

  static get protocol() {
    return {
      http: 'http',
      https: 'https'
    };
  }

  /**
   * Just server
   * @param server {http.Server|https.Server}
   * @returns {boolean}
   */
  static isHttpOrHttpsServer(server) {
    if (!(server instanceof http.Server || server instanceof https.Server)) {
      return false;
    }
    return true;
  }

  isHttpOrHttpsServer(server) {
    return AppServer.isHttpOrHttpsServer(server);
  }

  set name(name) {
    if (name == undefined || name == null || name == NaN) {
      throw new Error('Server name invalid');
    }
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set server(server) {
    if (!(server instanceof http.Server || server instanceof https.Server)) {
      throw new Error('Not HTTP or HTTPS server');
    }

    this._server = server;
  }

  get server() {
    return this._server;
  }
}

module.exports = AppServer;