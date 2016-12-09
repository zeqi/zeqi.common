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

/*class Task {
    constructor(name) {
        this.name = name;
    }

    do() {
        name
    }

    get name() {
        return this.name;
    }

    set name(name) {
        this.name = name;
    }
}*/

/*var task = new Task('http');
task.name = 'www';*/

// console.log(task.name);

class Circle {
    constructor(radius) {
        this.radius = radius;
        Circle.circlesMade++;
    };
    static draw(circle, canvas) {
        // Canvas绘制代码
    };
    static get circlesMade() {
        return !this._count ? 0 : this._count;
    };
    static set circlesMade(val) {
        this._count = val;
    };
    area() {
        return Math.pow(this.radius, 2) * Math.PI;
    };
    get radius() {
        return this._radius;
    };
    set radius(radius) {
        if (!Number.isInteger(radius))
            throw new Error("圆的半径必须为整数。");
        this._radius = radius;
    };
}

var circle = new Circle(10);

class TaskMgrt {
    constructor() {
        this.tasks = new Map();
    }

    addTask(task) {

    }
}