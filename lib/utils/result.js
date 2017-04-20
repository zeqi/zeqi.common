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

    static get status() {
        return {
            ok: 'ok',
            warning: 'warning',
            error: 'error'
        }
    }

    set status(status) {
        this._status = status;
        if (!status || !Result.status[status.toString()]) {
            this._status = Result.status.ok;
        }
    }

    get status() {
        return this._status;
    }
}

class ErrorResult {
    constructor(errorCode, message) {
        this.errorCode = errorCode;
        this.message = message;
    }

    static get errorCode() {
        return {
            error_406: 406,
            error_500: 500
        }
    }

    set errorCode(errorCode) {
        this._errorCode = errorCode;
        if (!errorCode || !ErrorResult.errorCode[errorCode.toString()]) {
            this._errorCode = ErrorResult.errorCode.error_406;
        }
    }

    get errorCode() {
        return this._errorCode;
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

    get NormalResult() {
        return CommonResult.NormalResult;
    }

    static get ErrorResult() {
        return ErrorResult;
    }

    static errorResult(errorCode, message) {
        return new this.ErrorResult(errorCode, message);
    }

    get ErrorResult() {
        return CommonResult.ErrorResult;
    }

    errorResult(errorCode, message) {
        return new this.ErrorResult(errorCode, message);
    }
}

module.exports = CommonResult;