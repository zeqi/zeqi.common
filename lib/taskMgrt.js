/**
 * Created by zeqi
 * @description
 * @module TaskMgrt
 * @version 1.0.0
 * @author Xijun Zhu <zhuzeqi2010@163.com>
 * @File svcMgrt
 * @Date 16-12-9
 * @Wechat zhuzeqi2010
 * @QQ 304566647
 * @Office-email zhuxijun@b2cf.cn
 */

'use strict';
/// <reference path="../typings/tsd.d.ts" />

class Task {
    constructor(name) {
        console.log(name);
        this.name = name;
    }

    set name(name) {
        /*console.log(name.substr(0, 1));
        console.log(name.substr(name.length - 1, 1));*/
        this._name = name;
    }

    get name() {
        return this._name;
    }

    do() {

    }

    start() {

    }

    end() {

    }
}

//var http = new Task('http');
//task.name = 'www';

module.exports = Task;
module.exports.http = new Task('http');
module.exports.www = new Task('www');

/*console.log(task.name);

class TaskMgrt {
    constructor() {
        this.tasks = new Map();
    }

    addTask(task) {

    }
}

var taskMgrt = new TaskMgrt();*/

