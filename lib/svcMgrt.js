/**
 * Created by zeqi
 * @description
 * @module Factory
 * @version 1.0.0
 * @author Xijun Zhu <zhuzeqi2010@163.com>
 * @File svcMgrt
 * @Date 16-12-6
 * @Wechat zhuzeqi2010
 * @QQ 304566647
 * @Office-email zhuxijun@b2cf.cn
 */

'use strict';

/**
 * Factory for managing singleton pattern
 * @constructor
 * @return {object}
 */
let SingletonFactory = (function() {
    /**
     * @type object
     */
    var _svcs = {};
     /**
     * @type object
     */
    var _instance = {};
    /**
     * The Factory function
     * @class
     */
    class SvcMgrt {
        constructor(_svcName) {
            if (_instance[_svcName]) {
                return _instance[_svcName]
            }
            this.svcName = _svcName;
        }

        /**
         * Create a singleton svc
         * @param _svcName {string} key
         * @returns {SvcMgrt}
         * @constructor
         */
        static CREATE_INSTANCE(_svcName) {
            if (!_instance[_svcName]) {
                _instance[_svcName] = new SvcMgrt(_svcName);
            }
            return _instance[_svcName];
        }

        /**
         * add a object to this svc
         * @param name {string}
         * @param value {*}
         * @returns {boolean}
         */
        add(name, value) {
            if (!_svcs[this.svcName]) {
                _svcs[this.svcName] = {};
            }
            _svcs[this.svcName][name] = value;
            return true;
        }

        /**
         * Get the svc value
         * @param name {string}
         * @returns {*}
         */
        get(name) {
            if (!_svcs[this.svcName]) {
                return null;
            }
            return _svcs[this.svcName][name];
        }

        /**
         * Remove svc key and value
         * @param name
         * @returns {null}
         */
        removeSvc(name) {
            if (!_svcs[this.svcName]) {
                return null;
            }
            delete _svcs[this.svcName][name];
        }

        /**
         * Get the svc all svc object
         * @returns {*}
         */
        get svcs() {
            return _svcs[this.svcName];
        }
    }

    return SvcMgrt;
})();

module.exports.SingletonFactory = SingletonFactory;

/**
 * The map manager
 * @constructor
 */
var MapMgrt = (function() {
    var map = new Map();
    /**
     * Map manager class
     * @class
     * @return {Map}
     */
    class Mgrt {
        /**
         * @constructor
         * @param _svcName {K}
         * @returns {V}
         */
        constructor(_svcName) {
            this.svcName = _svcName;
            if (!map.has(_svcName)) {
                map.set(_svcName, new Map());
            }
            return map.get(_svcName);
        }
    }
    return Mgrt;
})();

module.exports.MapMgrt = MapMgrt;
