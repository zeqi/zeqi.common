/**
 * Created by zeqi
 * @description
 * @module Common
 * @version 1.0.0
 * @author Xijun Zhu <zhuzeqi2010@163.com>
 * @File svcMgrt
 * @Date 16-12-6
 * @Wechat zhuzeqi2010
 * @QQ 304566647
 * @Office-email zhuxijun@b2cf.cn
 */



var Mgrt = require('./lib/mgrt');
var DS = require('./lib/ds');
var IM = require('./lib/im');

Object.assign(module.exports, {Mgrt: Mgrt}, {DS: DS}, {IM: IM});
//Object.assign(module.exports, handlerMgrt);

/*module.exports.SingletonMgrt = svcMgrt.SingletonMgrt;
 module.exports.MapMgrt = svcMgrt.MapMgrt;
 module.exports.SetMgrt = svcMgrt.SetMgrt;
 module.exports.ArrayMgrt = svcMgrt.ArrayMgrt;*/