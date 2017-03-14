var Utils = require('../../lib/utils');

var DateUtil = Utils.DateUtil;
var time = new Date();
console.log(DateUtil.timeSubtract(time.getTime() + 5 * 60 * 1000, time));

console.log(process.cwd());

console.log((10 - 2) % 3);