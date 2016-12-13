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

class ProfileHandler extends BaseHandler {
    constructor(content) {
        super(content);
    }

    get name() {
        return 'ProfileHandler';
    }

    doAsync(done) {
        done();
    }
}

userHandlerMgrt.addHandler(new ProfileHandler({}));

userHandlerMgrt.handlersAsync({}).then(data => {
    console.log(data);
}).fail(err => {
    console.log(err);
})






