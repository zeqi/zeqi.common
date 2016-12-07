console.log('Wellcome to test js!');

var common = require('./index');

var SingletonFactory = common.SingletonFactory;
var MapMgrt =  common.MapMgrt;


//-----------The part of singleton factory module------------
var dataService = SingletonFactory.CREATE_INSTANCE('DataService');
dataService.add('nonghe', { host: '127.0.0.1', port: '8000', description: 'is nonghe data service' });
dataService.add('chanquan', { host: '127.0.0.1', port: '9000', description: 'is chanquan data service' });
var dataService_1 = new SingletonFactory('DataService');
var dataService_2 = SingletonFactory.CREATE_INSTANCE('DataService');
console.log(dataService == dataService_1);
console.log(dataService == dataService_2);
console.log(dataService_2.svcs);
console.log(dataService_2.svcName);
console.log(dataService_2.svcs.nonghe);

var messageService = SingletonFactory.CREATE_INSTANCE('MessageService');
console.log(dataService == messageService);
messageService.add('wechat', { description: 'is wechat' });
messageService.add('device', { description: 'is device' });
console.log(messageService.svcs);
console.log(messageService.get('device'));
console.log(messageService.svcs.wechat);

var messageService_2 = new SingletonFactory('MessageService');
console.log(messageService == messageService_2);
messageService_2.add('im', { description: 'is im' });
console.log(messageService_2.svcs);
console.log(messageService.svcs);

var messageService_3 = new SingletonFactory('MessageService');
console.log(messageService_2 == messageService_3);




//-----------The part of svc map module------------
var serviceMap = new MapMgrt('DataService');
serviceMap.set('nonghe', { host: '127.0.0.1', port: '8000', description: 'is nonghe data service' });
var serviceMap_1 = new MapMgrt('DataService');
console.log(serviceMap == serviceMap_1);
console.log(serviceMap_1.keys());쳌
console.log(serviceMap_1.values());
console.log(serviceMap_1.get('nonghe'));