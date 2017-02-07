/**
 * Created by zeqi
 * @description
 * @module SvcMgrt
 * @version 1.0.0
 * @author Xijun Zhu <zhuzeqi2010@163.com>
 * @File svcMgrt
 * @Date 17-2-7
 * @Wechat zhuzeqi2010
 * @QQ 304566647
 * @Office-email zhuxijun@b2cf.cn
 */

'use strict';

var amqp = require('amqp');

var conexion = amqp.createConnection({ host: 'localhost' });

conexion.on('ready', function () {
    conexion.queue('sencilla', { autoDelete: false, durable: true }, function (cola) {
        console.log('Conexión existosa con cola %s', cola.name);
        cola.subscribe(function (mensaje) {
            console.log('Mensaje recibido -> %s', mensaje.data.toString('utf-8'));
        });
    });

    conexion.queue('zhangsan', { autoDelete: false, durable: true }, function (cola) {
        console.log('Conexión existosa con cola %s', cola.name);
        cola.subscribe(function (mensaje) {
            console.log('Mensaje recibido -> %s', mensaje.data.toString('utf-8'));
        });
    });
});