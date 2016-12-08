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



var svcMgrt = require('./lib/svcMgrt');
// module.exports.call(svcMgrt, this);
// console.log(module.exports);
Object.assign(module.exports, svcMgrt);

// console.log(module.exports);
/*module.exports.SingletonMgrt = svcMgrt.SingletonMgrt;
module.exports.MapMgrt = svcMgrt.MapMgrt;
module.exports.SetMgrt = svcMgrt.SetMgrt;*/

console.log(module.exports);