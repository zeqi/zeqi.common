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

/**
 * Base handler
 *
 * @class BaseHandler
 */
class BaseHandler {
    /**
     * Creates an instance of BaseHandler.
     *
     * @param {any} content
     *
     * @memberOf BaseHandler
     */
    constructor(content) {
        this.content = content;
    }

    /**
     * This handler name
     *
     * @readonly
     *
     * @memberOf BaseHandler
     */
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

    /**
     * undo operation
     *
     * @param {any} done
     *
     * @memberOf BaseHandler
     */
    undo(done) {
        done();
    }
}

module.exports.BaseHandler = BaseHandler;

/**
 * Handler manager
 *
 * @class HandlerMgrt
 */
class HandlerMgrt {
    /**
     * Creates an instance of HandlerMgrt.
     *
     *
     * @memberOf HandlerMgrt
     */
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
     * @returns {{continue: string, terminate: string, revoke: string}}
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
     * @returns {{continue: string, terminate: string, revoke: string}}
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

    /**
     * Add a handler to handler manager handlers
     *
     * @param {any} handler
     *
     * @memberOf HandlerMgrt
     */
    add(handler) {
        if (!this.has(handler)) {
            this.handlers.push(handler);
        }
    }

    /**
     * Remove a handler from handler manager
     *
     * @param {any} handler
     * @returns
     *
     * @memberOf HandlerMgrt
     */
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

    /**
     * Get current handler
     *
     * @readonly
     *
     * @memberOf HandlerMgrt
     */
    get current() {
        return this.handlers[this.cursor];
    }

    /**
     * Just exists next handler
     *
     * @readonly
     *
     * @memberOf HandlerMgrt
     */
    get hasNext() {
        if (!this.handlers[this.cursor + 1]) {
            return false;
        }
        return true;
    }

    /**
     * Get next handler
     *
     * @readonly
     *
     * @memberOf HandlerMgrt
     */
    get next() {
        if (!this.hasNext) {
            return null;
        }
        this.cursor++;
        return this.handlers[this.cursor];
    }

    /**
     * Just exists previous handler
     *
     * @readonly
     *
     * @memberOf HandlerMgrt
     */
    get hasPrevious() {
        if (!this.handlers[this.cursor - 1]) {
            return false;
        }
        return true;
    }

    /**
     * Get previous handler
     *
     * @readonly
     *
     * @memberOf HandlerMgrt
     */
    get previous() {
        if (!this.hasPrevious) {
            return null;
        }
        this.cursor--;
        return this.handlers[this.cursor];
    }

    /**
     * Get handler manager execute result
     *
     * @readonly
     *
     * @memberOf HandlerMgrt
     */
    get content() {
        var content = null;
        if (this.handlers.length > 1) {
            content = this.handlers[0].content;
        }
        return content;
    }

    /**
     * Do some thing for handlers
     * @param action {HandlerMgrt.actions}
     * @param error {*} error message
     * @returns {*}
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

    /**
     * Execute handlers entrance function
     * @param callback {function}
     * @returns {Promise<T>}
     * @memberOf HandlerMgrt
     */
    handlersAsync(callback) {
        this.done();
        return this.defer.promise.nodeify(callback);
    }
}

module.exports.HandlerMgrt = HandlerMgrt



