/**
 * Created by zeqi
 * @description
 * @module test
 * @version 1.0.0
 * @author Xijun Zhu <zhuzeqi2010@163.com>
 * @File svcMgrt
 * @Date 16-12-9
 * @Wechat zhuzeqi2010
 * @QQ 304566647
 * @Office-email zhuxijun@b2cf.cn
 */

'use strict';
/// <reference path="../../typings/tsd.d.ts" />

console.log('Wellcome to handlers manager test!');

var common = require('./../../index');

var SingletonMgrt = common.SingletonMgrt;
var MapMgrt = common.MapMgrt;
var SetMgrt = common.SetMgrt;
var ArrayMgrt = common.ArrayMgrt;
var BaseHandler = common.BaseHandler;
var HandlerMgrt = common.HandlerMgrt;

var userHandlerMgrt = new HandlerMgrt();

class AgeHandler extends BaseHandler {
    constructor(content) {
        super(content);
    }

    get name() {
        return 'ProfileHandler';
    }

    doAsync(done) {
        var self = this;
        var content = self.content;
        content.age = 25;
        done();
    }
}

class QQHandler extends BaseHandler {
    constructor(content) {
        super(content);
    }

    get name() {
        return 'QQHandler';
    }

    doAsync(done) {
        var self = this;
        var content = self.content;
        content.QQ = 304566647;
        done();
    }
}

var content = {
    name:'zeqi'
}

userHandlerMgrt.add(new AgeHandler(content));

userHandlerMgrt.add(new QQHandler(content));

userHandlerMgrt.handlersAsync(content).then(data => {
    console.log(content);
}).fail(err => {
    console.log(err);
})

/*var handler = new Map();

var profileHandler = new ProfileHandler({});
handler.set('www', profileHandler);
handler.set('good', profileHandler);

var keys = handler.keys();

console.log(keys);*/








