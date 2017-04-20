'use strict';

var kafka = require('kafka-node');
var common = require('../../index');
var Producer = common.IM.Producer;
var Consumer = common.IM.Consumer;
/*var client = new kafka.Client('127.0.0.1:2181');

var topic = 'tianjing';

function onMessage(message) {
  console.log('broker', message);
}

var producer = Producer.init(client);
var consumer = Consumer.init(client, topic, onMessage, {
  groupId: topic,
  autoCommit: true,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024
});

var data = {event: 'chat message', payload: {username: 'Test', message: '天地悠悠22222222222'}};
producer.sendMessagesByTopics(topic, data).then(data => {
  data = {event: 'chat message', payload: {username: 'Test_1', message: '过客匆匆3333333333'}};
  return producer.sendMessagesByTopics(topic, data)
}).then(data => {
  return data;
}).fail(err => {
  console.log(err);
  return err;
});*/

var a = 0;
console.log(++a);
console.log(a);

var b = 0;
console.log(b++);
console.log(b);

for (var i = 0; i < 5; i++) {
  console.log(i);
}