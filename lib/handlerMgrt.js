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
        this.handlers = [];
        this.cursor = -1;
        this.defer = Q.defer();
    }

    has(handler) {
        var hasHandler = false;
        this.handlers.forEach(item => {
            if (handler.name == item.name) {
                hasHandler = true;
                return;
            }
        });
        return hasHandler;
    }

    add(handler) {
        if (!this.has(handler)) {
            this.handlers.push(handler);
        }
    }

    remove(handler) {
        var self = this;
        this.handlers.forEach((item, index) => {
            if (handler.name == item.name) {
                this.handlers.splice(index, 1);
                return true;
            }
        });
        return false;
    }

    currentHandler() {
        return this.handlers[this.cursor];
    }

    get hasNext() {
        if (this.cursor >= this.handlers.length - 1) {
            return false;
        }
        return true;
    }

    next() {
        var self = this;
        if (!self.hasNext) {
            return null;
        }
        self.cursor++;
        return self.handlers[self.cursor];
    }

    _done(context, error) {
        var self = this;
        console.log(self);


        if (self.hasNext) {
            self.next().doAsync(self._done.bind(self, context));
            return;
        }

        return self.defer.resolve(context);
        //return self.defer.promise.nodeify(callback)
    }

    handlersAsync(context, callback) {
        this._done();
        return this.defer.promise.nodeify(callback);
        /*var self = this;
        self.defer = Q.defer();
        if (self.hasNext) {
            self.next().doAsync(self._done.bind(self, context));
        } else {
            return Q.reject(new Error('No handler registered!'));
        }*/
        //return self.defer.promise.nodeify(callback);
    }
}

module.exports.HandlerMgrt = HandlerMgrt



