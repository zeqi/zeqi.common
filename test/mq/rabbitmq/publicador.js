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
    console.log('Conexión exitosa con servidor');

    var mensaje = 'Hola CODEHERO. ' + new Date();

    conexion.publish('zhangsan', mensaje, { durable: true });
    console.log('Mensaje enviado -> %s', mensaje);
    //conexion.disconnect();
});