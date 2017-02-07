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

'use strict';

var cities = [
    { name: "London", "population": 8615246 },
    { name: "Berlin", "population": [{ name: 'lisi', age: 26 }] },
    { name: "Madrid", "population": { name: 'zhangsan', age: 25 } },
    { name: "Rome", "population": { name: 'zeqi', age: 25 } }
];

var jp = require('jsonpath');
/*var names = jp.query(cities, '$..population');
console.log(names);*/

/*console.log(jp.paths(cities, '$..population'));
console.log(jp.nodes(cities, '$..population'));*/
/*console.log(jp.value(cities, '$..population', ['中华小二郎']))
console.log(cities);*/

/*var path = jp.parse('$..population');
console.log(path);*/

/*jp.apply(cities, '$.*', function (value) {
    value.nameDisplayName = value + '中华小二郎';
    return value;
});*/
//console.log(nodes);
//console.log(cities);
//console.log(JSON.stringify(cities));

/*jp.apply(cities, '$..population..*', function (value) {
    console.log(value);
    value.nameDisplayName = '中华小三郎';
    return value;
});
console.log(cities);*/

/*jp.apply(cities, '$..population.*', function (value) {
    console.log(value);
    //console.log(jp.parent(cities, '$..population..name'));
    //value.nameDisplayName = '中华小三郎';
    return value;
});*/



/*jp.apply(cities, '$..population', function (value) {
    console.log(value);
    if(typeof value == 'object'){
        jp.apply(value, '$..name')
    }
    //console.log(jp.parent(cities, '$..population..name'));
    //value.nameDisplayName = '中华小三郎';
    return value;
});*/

/*jp.nodes(cities, '$..population..name').forEach(item => {
    var pathExpression = jp.stringify(item.path);
    var display = pathExpression + 'DisplayName';
    jp.value(cities, display, item.value);

    var sps = pathExpression.split('.');
    console.log(pathExpression.substr(0, pathExpression.length - sps[sps.length - 1].length - 1));
}, this);

console.log(JSON.stringify(cities));*/

var str = '$[1].population[0].name';
str = str.replace(/^(.*)\.(.*)/, '$1.DisplayName');
console.log(str);
