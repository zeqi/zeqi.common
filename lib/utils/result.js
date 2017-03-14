/**
 * Created by zeqi
 * @description
 * @module utils
 * @version 1.0.0
 * @author Xijun Zhu <zhuzeqi2010@163.com>
 * @File result
 * @Date 16-12-8
 * @Wechat zhuzeqi2010
 * @QQ 304566647
 * @Office-email zhuxijun@b2cf.cn
 */

'use strict';

class NormalResult {
    constructor(result, code, message, status) {
        this.result = result;
        this.code = code;
        this.message = message;
        this.status = status;
    }

    set status(status) {
        this._status = status;
        if (!this._status || !Result.status[this._status]) {
            this._status = Result.status.ok;
        }
    }

    get status(status) {
        return this._status;
    }

    static get status() {
        return {
            ok: 'ok',
            warning: 'warning',
            error: 'error'
        }
    }
}

class ErrorResult {
    constructor(errorCode, message) {
        this.errorCode = errorCode;
        this.message = message;
    }

    set errorCode(errorCode) {
        this._errorCode = errorCode;
        if (!this._errorCode || !ErrorResult.errorCode[this._errorCode.toString()]) {
            this._errorCode = ErrorResult.errorCode['406'];
        }
    }

    get errorCode(errorCode) {
        return this._errorCode;
    }

    static get errorCode() {
        return {
            200: 200,
            406: 406,
            500: 500
        }
    }

}

class CommonResult {
    constructor(errorCode, message) {
        this.errorCode = errorCode;
        this.message = message;
    }

    static get NormalResult() {
        return NormalResult;
    }

    static get ErrorResult() {
        return ErrorResult;
    }
}

module.exports = CommonResult;