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

var mosca = require('mosca');  
var MqttServer = new mosca.Server({  
    port: 1883  
});  
  
MqttServer.on('clientConnected', function(client){  
    console.log('client connected', client.id);  
});  
  
/** 
 * 监听MQTT主题消息 
 **/  
MqttServer.on('published', function(packet, client) {  
    var topic = packet.topic;  
    console.log('message-arrived--->','topic ='+topic+',message = '+ packet.payload.toString());  
  
});  
  
MqttServer.on('ready', function(){  
    console.log('mqtt is running...');  
    //MqttServer.authenticate = authenticate;  
});  