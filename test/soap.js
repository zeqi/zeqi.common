'use strict';

/*var soap = require('soap');
var xml2js = require('xml2js');
var url = 'http://116.255.142.23:8081/Service/WebServiceOperatePort?wsdl';
var args = { idcard: '610126196509280042', orgcode: '61012600120501' };;
soap.createClient(url, function (err, client) {
  client.delete(args, function (err, result) {
    // console.log(result);
    var xml = result.body;
    return xml2js.parseString(xml, { explicitArray: false, ignoreAttrs: true }, function (err, data) {
      if (err) {
        return console.log('error', err);
      }
      return console.log('data', data);
    });
  });
});*/

/*var soap = require('soap');
var xml2js = require('xml2js');
var url = 'http://www.webxml.com.cn/WebServices/WeatherWebService.asmx?wsdl';
var args = { byProvinceName: '江苏' };
var soaptest = function () {
  soap.createClient(url, function (err, client) {
    client.getSupportCity(args, function (err, result) {
      var xml = result.getSupportCityResult.string;
      console.log(xml);
    });
  });
}

soaptest();*/

var debug = require('debug')('zeqi.common:test:soap');
/*class Test {
  constructor() {

  }
  static init() {
    var self = this;
    console.log('');
  }

  init(name) {
    debug('arguments', arguments);
    var self = this;
    console.log(name);
  }
}

Test.init();

var test = new Test();
test.init('zeqi');*/

var names = ['zeqi', 'zhiqiang'];
// console.log(names.join('、'));

debug(typeof names);
