'use strict';

var common = require('../../index');
var DS = common.DS;

DS.initAllDS({
  "ZhongHuaDataSource": {
    "dsType": "mongodb",
    "host": "localhost",
    "port": "27017",
    "db": "zhonghua",
    "user": "",
    "password": ""
  },
  "ZhongHuaMsgStoreDataSource": {
    "dsType": "mongodb",
    "host": "localhost",
    "port": "27017",
    "db": "zhonghua_message",
    "user": "",
    "password": ""
  },
  "ZhongHuaRedisDataSource": {
    "dsType": "redis",
    "host": "localhost",
    "port": "6279",
    "db": 0,
    "user": "",
    "password": ""
  }
});

var redisConnection = DS.getConnection('ZhongHuaRedisDataSource');
if (redisConnection)
  redisConnection.set('ds_redis_ZhongHuaRedisDataSource', 'ZhongHuaRedisDataSource');

var UserModel = require('./model/user');
var user = { username: 'zeqi', password: '123123', mobile: '13621026810' };
let model = UserModel('tianchao')(user);
model.save(function (err, savedRecord) {
  if (err) {
    console.log('error', err);
    return err;
  }
  console.log('doc', savedRecord);
  return savedRecord;
});
