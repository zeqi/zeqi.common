console.log('Wellcome to test js!');

var common = require('./../index');

var SingletonMgrt = common.SingletonMgrt;
var MapMgrt = common.MapMgrt;
var SetMgrt = common.SetMgrt;
var ArrayMgrt = common.ArrayMgrt;


//-----------The part of singleton factory module------------
/*var dataService = SingletonMgrt.CREATE_SINGLETON('DataService');
dataService.add('nonghe', { host: '127.0.0.1', port: '8000', description: 'is nonghe data service' });
dataService.add('chanquan', { host: '127.0.0.1', port: '9000', description: 'is chanquan data service' });
var dataService_1 = new SingletonMgrt('DataService');
var dataService_2 = SingletonMgrt.CREATE_SINGLETON('DataService');
console.log(dataService == dataService_1);
console.log(dataService == dataService_2);
console.log(dataService_2.svcs);
console.log(dataService_2.svcName);
console.log(dataService_2.svcs.nonghe);

var messageService = SingletonMgrt.CREATE_SINGLETON('MessageService');
console.log(dataService == messageService);
messageService.add('wechat', { description: 'is wechat' });
messageService.add('device', { description: 'is device' });
console.log(messageService.svcs);
console.log(messageService.get('device'));
console.log(messageService.svcs.wechat);

var messageService_2 = new SingletonMgrt('MessageService');
console.log(messageService == messageService_2);
messageService_2.add('im', { description: 'is im' });
console.log(messageService_2.svcs);
console.log(messageService.svcs);

var messageService_3 = new SingletonMgrt('MessageService');
console.log(messageService_2 == messageService_3);

console.log('--------------------------------');
console.log(SingletonMgrt.GET_SINGLETONS);*/




//-----------The part of svc map module------------
/*var serviceMap = new MapMgrt('DataService');
serviceMap.set('nonghe', { host: '127.0.0.1', port: '8000', description: 'is nonghe data service' });
serviceMap.set('chanquan', { host: '127.0.0.1', port: '9000', description: 'is chanquan data service' });
var serviceMap_1 = new MapMgrt('DataService');*/
/*console.log(serviceMap == serviceMap_1);
console.log(serviceMap_1.keys());
console.log(serviceMap_1.values());
console.log(serviceMap_1.get('nonghe'));*/

/*var serviceMap_2 = MapMgrt.CREATE_MAP('DataService');

var messageService = MapMgrt.CREATE_MAP('MessageService');
console.log(serviceMap == serviceMap_2);
console.log(MapMgrt.GET_MAP_SIZE);
console.log(MapMgrt.GET_MAP('DataService'));
console.log(MapMgrt.GET_MAP_NAMES);
console.log(MapMgrt.GET_MAPS);
console.log(MapMgrt.DELETE_MAP('MessageService'));
console.log(MapMgrt.GET_MAPS);
console.log(MapMgrt.CLEAR_MAPS());
console.log(MapMgrt.GET_MAPS);*/

//-----------The part of svc set module------------
var handler = new SetMgrt('handler');
handler.add({ name: 'zeqi', age: 25 });
var handler_1 = new SetMgrt('handler');
console.log(handler == handler_1);
var hook = new SetMgrt('hook');
console.log(handler==hook);
console.log(SetMgrt.GET_SET_SIZE);
console.log(SetMgrt.GET_SET_NAMES);
console.log(SetMgrt.GET_MGRT);

//-----------The part of object module------------
/*var svc = {
    name: 'zeqi',
    age: 25,
    ssid: 12,
    address: {
        province: 'gansu',
        city: 'www'
    }
}

delete svc['ssid', 'address'];
console.log(svc); 
svc[{zhonghua:123}] = 'sousou';
//delete svc[{zhonghua:123}];
console.log(svc);
console.log(Object.keys(svc));
console.log(Object.getOwnPropertyNames(svc));
console.log(Object.freeze(svc));
var _svc = Object.call(svc,['sss'])
console.log(_svc);
console.log(Object.keys(svc).length);
console.log(svc.hasOwnProperty('www'));
console.log(Object.values());
console.log(222)*/