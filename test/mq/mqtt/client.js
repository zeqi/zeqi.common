/**
 * Created by zeqi
 * @description
 * @module SvcMgrt
 * @version 1.0.0
 * @author Xijun Zhu <zhuzeqi2010@163.com>
 * @File svcMgrt
 * @Date 17-2-8
 * @Wechat zhuzeqi2010
 * @QQ 304566647
 * @Office-email zhuxijun@b2cf.cn
 */

'use strict';

var mqtt  = require('mqtt');  
//var client  = mqtt.connect('mqtt://test.mosca.io');  
//var client  = mqtt.connect('mqtt://192.168.103.237');  
//var client  = mqtt.connect('mqtt://m2m.vicbang.com',{  
//    username:'13800000000',  
//    password:'123456',  
//    clientId:'app_13800000000'  
//});
  
for(var i = 0; i <2000;i++){  
    var client  = mqtt.connect('mqtt://localhost',{  
        /*username:'username',  
        password:'password',  */
        clientId:'app_13800000000_'+i  
    });  
  
    client.on('connect', function () {  
        //console.log('connected.....');  
        client.subscribe('#');  
        client.publish('app2dev/', 'Hello mqtt');  
    });  
  
    client.on('message', function (topic, message) {  
        // message is Buffer
        console.log(topic);
        console.log(message.toString());  
        //client.end();  
    });  
}  