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
        return this.constructor.name;
    }

    /**
     * 
     * 
     * @param done {function} ex: done(action, error);  action->HandlerMgrt.actions
     * 
     * @memberOf BaseHandler
     */
    do(done) {
        done();
    }

    undo(done) {
        done();
    }
}

module.exports.BaseHandler = BaseHandler;

class HandlerMgrt {
    constructor() {
        this.handlers = [];
        this.cursor = -1;
        this.defer = Q.defer();
        this.terminateCursor = -1;
        this.error = null;
    }

    /**
     * Handler executive action
     * 
     * @readonly
     * @static
     * 
     * @memberOf HandlerMgrt
     */
    static get actions() {
        return {
            continue: 'continue',
            terminate: 'terminate',
            revoke: 'revoke'
        }
    }

    /**
     * Handler executive action
     * 
     * @readonly
     * 
     * @memberOf HandlerMgrt
     */
    get actions() {
        return HandlerMgrt.actions;
    }

    /**
     * Just handler exists in handlers
     * 
     * @param {any} handler
     * @returns {boolean}
     * 
     * @memberOf HandlerMgrt
     */
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

    get current() {
        return this.handlers[this.cursor];
    }

    get hasNext() {
        if (!this.handlers[this.cursor + 1]) {
            return false;
        }
        return true;
    }

    get next() {
        if (!this.hasNext) {
            return null;
        }
        this.cursor++;
        return this.handlers[this.cursor];
    }

    get hasPrevious() {
        if (!this.handlers[this.cursor - 1]) {
            return false;
        }
        return true;
    }

    get previous() {
        if (!this.hasPrevious) {
            return null;
        }
        this.cursor--;
        return this.handlers[this.cursor];
    }

    get content() {
        var content = null;
        if (this.handlers.length > 1) {
            content = this.handlers[0].content;
        }
        return content;
    }

    /**
     * 
     * 
     * @param {any} error  ex: true->Continue execution ,false->Termination of execution, object->error, Revocation execution
     * @returns
     * 
     * @memberOf HandlerMgrt
     */
    done(action, error) {
        var self = this;
        self.error = error;
        switch (action) {
            case self.actions.revoke:
                if (self.terminateCursor < 0) {
                    self.terminateCursor = self.cursor;
                    self.cursor++;
                }
                if (self.hasPrevious) {
                    return self.previous.undo(self.done.bind(self, action, error));
                }
                if (self.error) {
                    return self.defer.reject(self.error);
                }
                return self.defer.resolve(self.content);
            case self.actions.terminate:
                self.terminateCursor = self.cursor;
                if (self.error) {
                    return self.defer.reject(self.error);
                }
                return self.defer.resolve(self.content);
            case self.actions.continue:
            default:
                if (self.hasNext) {
                    return self.next.do(self.done.bind(self));
                }
                return self.defer.resolve(self.content);
        }
    }

    handlersAsync(callback) {
        this.done();
        return this.defer.promise.nodeify(callback);
    }
}

module.exports.HandlerMgrt = HandlerMgrt



