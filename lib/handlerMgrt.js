/**
 * Created by zeqi
 * @description
 * @module TaskMgrt
 * @version 1.0.0
 * @author Xijun Zhu <zhuzeqi2010@163.com>
 * @File svcMgrt
 * @Date 16-12-9
 * @Wechat zhuzeqi2010
 * @QQ 304566647
 * @Office-email zhuxijun@b2cf.cn
 */

'use strict';
/// <reference path="../typings/tsd.d.ts" />

var Q = require('q');

/*class Task {
    constructor(name) {
        console.log(name);
        this.name = name;
    }

    set name(name) {
        console.log(name.substr(0, 1));
        console.log(name.substr(name.length - 1, 1));
        this._name = name;
    }

    get name() {
        return this._name;
    }

    do() {

    }

    start() {

    }

    end() {

    }
}*/

//var http = new Task('http');
//task.name = 'www';

/*module.exports = Task;
module.exports.http = new Task('http');
module.exports.www = new Task('www');*/


class BaseHandler {
    constructor(content) {
        this.content = content;
    }

    get name() {
        return 'BaseHandler';
    }

    doAsync(done) {
        done();
    }
}

module.exports.BaseHandler = BaseHandler;

class HandlerMgrt {
    constructor() {
        this.handlers = new Map();
        this.cursor = -1;
    }

    addHandler(handler) {
        if (!this.handlers.has(handler.name)) {
            this.handlers.set(handler.name, handler);
        }
    }

    removeHandler(handler) {
        if (this.handlers.has(handler.name)) {
            this.handlers.delete(handler.name);
        }
    }

    currentHandler() {
        return this.handlers.get(this.handlers.keys[this.cursor]);
    }

    get hanNetxtHandler() {
        if (this.cursor >= this.handlers.size - 1) {
            return false;
        }
        return true;
    }

    nextHandler() {
        if (!this.hanNetxtHandler) {
            return null;
        }
        this.cursor++;

        this.handlers.keys();
        return this.handlers.get(this.handlers.keys()[this.cursor]);
    }

    _done() {
        return Q.resolve();
    }

    handlersAsync(context, callback) {
        var self = this;
        var defer = Q.defer();
        if (self.hanNetxtHandler) {
            self.nextHandler().doAsync(self._done.bind(_self));
        } else {
            Q.reject(new Error('No handler registered!'));
        }


        return defer.promise.nodeify(callback);
    }
}

module.exports.HandlerMgrt = HandlerMgrt



