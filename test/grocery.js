/**
 * Created by zeqi
 * @description
 * @module Common
 * @version 1.0.0
 * @author Xijun Zhu <zhuzeqi2010@163.com>
 * @File svcMgrt
 * @Date 17-2-8
 * @Wechat zhuzeqi2010
 * @QQ 304566647
 * @Office-email zhuxijun@b2cf.cn
 */

'use strict';

var str = '      zhangsan,lisi,    wangwang    ';
// console.log(str.trim());
console.log(str.replace(/(\s*)/g, ""));

var url = '/1111'
if (/^\/((bids|news)\/.*(\/data$)|logout$)/g.test(url)) {
    console.log('regex is true');
}

class EmitterConfig {
    constructor() {

    }

    static checkSmsConfig() {
        console.log('checkSmsConfig');
    }
}

class Sms extends EmitterConfig {
    constructor() {
        super();
    }

    static send(mobile, content) {
        this.checkSmsConfig();
    }
}

Sms.send();

[1, 2, 3].every((item) => {
    if(item == 2)
        return;
    console.log(item);
});
console.log(123123);