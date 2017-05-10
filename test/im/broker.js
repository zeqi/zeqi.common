'use strict';

var kafka = require('kafka-node');
var common = require('../../index');
/*var Producer = common.IM.ProducerFact;
var Consumer = common.IM.ConsumerFact;*/
var Broker = common.IM.Broker;
// var client = new kafka.Client('127.0.0.1:2181');

var topic = 'tianjing';
var broker = Broker.init('zeqi.websocket');
var producer = broker.producerFact;
var consumer = broker.createConsumer(topic);
var beijing_consumer = broker.createConsumer('beijing');
broker.topicExists(topic);

var data = { event: 'chat message', payload: { username: 'Test', message: '天地悠悠22222222222' } };
producer.sendMessagesByTopics(topic, data).then(data => {
  data = { event: 'chat message', payload: { username: 'Test_1', message: '过客匆匆3333333333' } };
  return producer.sendMessagesByTopics(topic, data)
}).then(data => {
  return data;
}).fail(err => {
  console.log(err);
  return err;
});

/*var a = 0;
console.log(++a);
console.log(a);

var b = 0;
console.log(b++);
console.log(b);*/

/*for (var i = 0; i < 5; i++) {
  console.log('for', i);
  setTimeout(function () {
    console.log('setTimeout', i);
  }, 1000)
}

console.log('next', i);*/

/*function gencb(i) {
  //console.log('gencb', i);
  return function () {
    console.log('gencb return', i);
  }
}

for (var i = 0; i < 5; i++) {
  console.log('for', i);
  setTimeout(gencb(i), 1000)
}

console.log('next', i);*/
/*
var crypto = require('crypto');
var password_1 = crypto.createHash('md5').update('123123').digest('hex');
console.log(password_1);
var password_2 = crypto.createHash('md5').update('123123').digest('hex');
console.log(password_2);

var randomStr = Math.random().toString();
console.log('randomStr', randomStr);
console.log(randomStr.substr(randomStr.length - 4));*/