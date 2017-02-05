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
        return this.constructor.name;
    }

    do(done) {
        var self = this;
        var content = self.content;
        content.age = 25;
        done();
    }
    undo(done) {
        delete this.content.age;
        done();
    }
}

class QQHandler extends BaseHandler {
    constructor(content) {
        super(content);
    }

    get name() {
        return this.constructor.name;
    }

    do(done) {
        var self = this;
        var content = self.content;
        content.QQ = 304566647;
        //done();
        /*done(HandlerMgrt.actions.continue);
        done(HandlerMgrt.action.revoke);
        done(HandlerMgrt.action.terminate);*/
        //throw error
        done(HandlerMgrt.action.revoke, { code: 406, message: 'Invalid name' });
    }

    undo(done) {
        console.log('Undo opration!');
        delete this.content.QQ;
        done();
    }
}

var content = {
    name: 'zeqi'
}

userHandlerMgrt.add(new AgeHandler(content));

userHandlerMgrt.add(new QQHandler(content));

console.log(userHandlerMgrt.handlers);

userHandlerMgrt.handlersAsync().then(data => {
    console.log(data);
}).fail(err => {
    console.log(err);
});

var svcHandler = new MapMgrt('jianghu');
svcHandler.set('zeqi', { name: 'zeqi' });
console.log(svcHandler.keys());

var time = new Date();
console.log(time.getTime());
console.log(time.getTimezoneOffset());


var user = {
    name: 'zeqi',
    age: 25,
    user: {}
}
/*console.log(Object.keys(user));
Object.assign(user.user, user);
console.log(user);
*/
/*var user = {
    name: 'zeqi',
    age: 25
}*/

for (var i in user) {
    if (i == 'name') {
        continue;
    }
    console.log(i);
}

