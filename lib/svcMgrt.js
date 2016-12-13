/**
 * Created by zeqi
 * @description
 * @module SvcMgrt
 * @version 1.0.0
 * @author Xijun Zhu <zhuzeqi2010@163.com>
 * @File svcMgrt
 * @Date 16-12-6
 * @Wechat zhuzeqi2010
 * @QQ 304566647
 * @Office-email zhuxijun@b2cf.cn
 */

'use strict';
// Singleton manager
/**
 * The Singleton manager
 * @constructor
 * @return {object}
 */
let SingletonMgrt = (function () {
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
        /**
         * @constructor
        * @param singletonName {string}
        * @returns {SvcMgrt}
        */
        constructor(singletonName) {
            if (_instance[singletonName]) {
                return _instance[singletonName]
            }
            this.singletonName = singletonName;
        }

        /**
         * add a object to this svc
         * @param name {string}
         * @param value {*}
         * @returns {boolean}
         */
        add(name, value) {
            if (!_svcs[this.singletonName]) {
                _svcs[this.singletonName] = {};
            }
            _svcs[this.singletonName][name] = value;
            return true;
        }

        /**
         * Get the svc value
         * @param name {string}
         * @returns {*}
         */
        get(name) {
            if (!_svcs[this.singletonName]) {
                return null;
            }
            return _svcs[this.singletonName][name];
        }

        /**
         * Remove svc key and value
         * @param name
         * @returns {null}
         */
        removeSvc(name) {
            if (!_svcs[this.singletonName]) {
                return null;
            }
            delete _svcs[this.singletonName][name];
        }

        /**
         * Get the svc all svc object
         * @returns {*}
         */
        get svcs() {
            return _svcs[this.singletonName];
        }

        /**
         * Get singleton manager
         * @property {Object>
         * @static
         * @public
         */
        static get GET_MGRT() {
            return _svcs;
        }

        /**
         * Create a singleton svc
         * @param singletonName {string} key
         * @returns {SvcMgrt}
         * @constructor
         */
        static CREATE_SINGLETON(singletonName) {
            if (!_instance[singletonName]) {
                _instance[singletonName] = new SvcMgrt(singletonName);
            }
            return _instance[singletonName];
        }

        /**
         * Get all singleton in this manager
         * @property {Array}
         * @static
         * @public
         */
        static get GET_SINGLETONS() {
            var singletons = [];
            for (var i in _svcs) {
                singletons.push(_svcs[i]);
            }
            return singletons;
        }

        /**
         * Get singletons size
         * @property {number}
         * @static
         * @public
         */
        static get GET_SINGLETON_SIZE() {
            return Object.keys(_svcs).length;
        }

        /**
         * Get all names from singleton manager
         * @property {Array}
         * @static
         * @public
         */
        static get GET_SINGLETON_NAMES() {
            return Object.keys(_svcs);
        }

        /**
         * Get a singleton by singleton name
         * @param singletonName {K}
         * @returns {V}
         * @constructor
         * @static
         * @public
         */
        static GET_SINGLETON(singletonName) {
            return _svcs[singletonName];
        }

        /**
         * Is exists this singleton ?
         * @param singletonName {K}
         * @returns {boolean}
         * @constructor
         * @static
         * @public
         */
        static HAS_SINGLETON(singletonName) {
            return _svcs.hasOwnProperty(singletonName);
        }

        /**
         * Delete a singleton by singleton singleton
         * @param singletonName {string}
         * @returns {boolean}
         * @constructor
         * @static
         * @public
         */
        static DELETE_SINGLETON(singletonName) {
            delete _svcs[singletonName];
            return true;
        }

        /**
         * Clear all singletons
         * @returns {boolean}
         * @constructor
         * @static
         * @public
         */
        static CLEAR_SINGLETONS() {
            _svcs = {};
            return true;
        }
    }

    return SvcMgrt;
})();

module.exports.SingletonMgrt = SingletonMgrt;

// The Map manager
/**
 * The Map manager
 * @constructor
 */
var MapMgrt = (function () {
    var _map = new Map();

    /**
     * Map manager class
     * @class
     * @return {Map}
     */
    class Mgrt {
        /**
         *
         * @param mapName {k} the name map key ex:object|string|number
         * @returns {V}
         * @constructor
         */
        constructor(mapName) {
            this.mapName = mapName;
            if (!_map.has(mapName)) {
                _map.set(mapName, new Map());
            }
            return _map.get(mapName);
        }

        /**
         * Create a Map
         * @param mapName {K}
         * @returns {V}
         * @constructor
         * @static
         * @public
         */
        static CREATE_MAP(mapName) {
            if (!_map.has(mapName)) {
                _map.set(mapName, new Mgrt(mapName));
            }
            return _map.get(mapName);
        }

        /**
         * Get map manager
         * @property {Map}
         * @static
         * @public
         */
        static get GET_MGRT() {
            return _map;
        }

        /**
         * Get all map in this manager
         * @property {Iterator.<V>}
         * @static
         * @public
         */
        static get GET_MAPS() {
            return _map.values();
        }

        /**
         * Get maps size
         * @property {number}
         * @static
         * @public
         */
        static get GET_MAP_SIZE() {
            return _map.size;
        }

        /**
         * Get all names from map manager
         * @property {Iterator.<K>}
         * @static
         * @public
         */
        static get GET_MAP_NAMES() {
            return _map.keys();
        }

        /**
         * Get a map by map name
         * @param mapName {K}
         * @returns {V}
         * @constructor
         * @static
         * @public
         */
        static GET_MAP(mapName) {
            return _map.get(mapName);
        }

        /**
         * Is exists this map ?
         * @param mapName {K}
         * @returns {boolean}
         * @constructor
         * @static
         * @public
         */
        static HAS_MAP(mapName) {
            return _map.has(mapName);
        }

        /**
         * Delete a map by map name
         * @param mapName {K}
         * @returns {boolean}
         * @constructor
         * @static
         * @public
         */
        static DELETE_MAP(mapName) {
            return _map.delete(mapName);
        }

        /**
         * Clear all maps
         * @returns {boolean}
         * @constructor
         * @static
         * @public
         */
        static CLEAR_MAPS() {
            _map.clear();
            return true;
        }
    }
    return Mgrt;
})();

module.exports.MapMgrt = MapMgrt;

// The WeakMap manager
/**
 * The WeakMap manager
 * @constructor
 */
var WeakMapMgrt = (function () {
    var _map = new Map();

    /**
     * WeakMap manager class
     * @class
     * @return {WeakMap}
     */
    class Mgrt {
        /**
         *
         * @param weakMapName {k} the name map key ex:object|string|number
         * @returns {V}
         * @constructor
         */
        constructor(weakMapName) {
            this.weakMapName = weakMapName;
            if (!_map.has(weakMapName)) {
                _map.set(weakMapName, new WeakMap());
            }
            return _map.get(weakMapName);
        }

        /**
         * Create a WeakMap
         * @param weakMapName {K}
         * @returns {V}
         * @constructor
         * @static
         * @public
         */
        static CREATE_WEAKMAP(weakMapName) {
            if (!_map.has(weakMapName)) {
                _map.set(weakMapName, new Mgrt(weakMapName));
            }
            return _map.get(weakMapName);
        }

        /**
         * Get weakMap manager
         * @property {WeakMap}
         * @static
         * @public
         */
        static get GET_MGRT() {
            return _map;
        }

        /**
         * Get all weakMap in this manager
         * @property {Iterator.<V>}
         * @static
         * @public
         */
        static get GET_WEAKMAPS() {
            return _map.values();
        }

        /**
         * Get weakMaps size
         * @property {number}
         * @static
         * @public
         */
        static get GET_WEAKMAP_SIZE() {
            return _map.size;
        }

        /**
         * Get all names from weakMap manager
         * @property {Iterator.<K>}
         * @static
         * @public
         */
        static get GET_WEAKMAP_NAMES() {
            return _map.keys();
        }

        /**
         * Get a weakMap by weakMap name
         * @param mapName {K}
         * @returns {V}
         * @constructor
         * @static
         * @public
         */
        static GET_WEAKMAP(weakMapName) {
            return _map.get(weakMapName);
        }

        /**
         * Is exists this weakMap ?
         * @param mapName {K}
         * @returns {boolean}
         * @constructor
         * @static
         * @public
         */
        static HAS_WEAKMAP(weakMapName) {
            return _map.has(weakMapName);
        }

        /**
         * Delete a weakMap by weakMap name
         * @param mapName {K}
         * @returns {boolean}
         * @constructor
         * @static
         * @public
         */
        static DELETE_WEAKMAP(weakMapName) {
            return _map.delete(weakMapName);
        }

        /**
         * Clear all weakMaps
         * @returns {boolean}
         * @constructor
         * @static
         * @public
         */
        static CLEAR_WEAKMAPS() {
            _map.clear();
            return true;
        }
    }
    return Mgrt;
})();

module.exports.WeakMapMgrt = WeakMapMgrt;

// The Set manager
/**
 * The Set manager
 * @constructor
 */
var SetMgrt = (function () {
    var _map = new Map();
    /**
     * Set manager class
     * @class
     * @return {Set}
     */
    class Mgrt {
        /**
         * @constructor
         * @param setName {Object}
         * @returns {Set}
         */
        constructor(setName) {
            this.setName = setName;
            if (!_map.has(setName)) {
                _map.set(setName, new Set());
            }
            return _map.get(setName);
        }

        /**
         * Create a Set
         * @param setName {K}
         * @returns {Set}
         * @constructor
         * @static
         * @public
         */
        static CREATE_SET(setName) {
            if (!_map.has(setName)) {
                _map.set(setName, new Mgrt(setName));
            }
            return _map.get(setName);
        }

        /**
         * Get set manager
         * @property {Map>
         * @static
         * @public
         */
        static get GET_MGRT() {
            return _map;
        }

        /**
         * Get all set in this manager
         * @property {Iterator.<V>}
         * @static
         * @public
         */
        static get GET_SETS() {
            return _map.values();
        }

        /**
         * Get sets size
         * @property {number}
         * @static
         * @public
         */
        static get GET_SET_SIZE() {
            return _map.size;
        }

        /**
         * Get all names from set manager
         * @property {Iterator.<K>}
         * @static
         * @public
         */
        static get GET_SET_NAMES() {
            return _map.keys();
        }

        /**
         * Get a set by set name
         * @param setName {K}
         * @returns {V}
         * @constructor
         * @static
         * @public
         */
        static GET_SET(setName) {
            return _map.get(setName);
        }

        /**
         * Is exists this set name ?
         * @param setName {K}
         * @returns {boolean}
         * @constructor
         * @static
         * @public
         */
        static HAS_SET(setName) {
            return _map.has(setName);
        }

        /**
         * Delete a set by set name
         * @param setName {K}
         * @returns {boolean}
         * @constructor
         * @static
         * @public
         */
        static DELETE_SET(setName) {
            return _map.delete(setName);
        }

        /**
         * Clear all sets
         * @returns {boolean}
         * @constructor
         * @static
         * @public
         */
        static CLEAR_SETS() {
            _map.clear();
            return true;
        }
    }
    return Mgrt;
})();

module.exports.SetMgrt = SetMgrt;

// The Array manager
/**
 * The Array manager
 * @constructor
 */
var ArrayMgrt = (function () {
    var _map = new Map();
    /**
     * Array manager class
     * @class
     * @return {Array}
     */
    class Mgrt {
        /**
         * @constructor
         * @param arrayName {Object}
         * @returns {Array}
         */
        constructor(arrayName) {
            this.arrayName = arrayName;
            if (!_map.has(arrayName)) {
                _map.set(arrayName, new Array());
            }
            return _map.get(arrayName);
        }

        /**
         * Create a Array
         * @param arrayName {K}
         * @returns {Array}
         * @constructor
         * @static
         * @public
         */
        static CREATE_ARRAY(arrayName) {
            if (!_map.has(arrayName)) {
                _map.set(arrayName, new Mgrt(arrayName));
            }
            return _map.get(arrayName);
        }

        /**
         * Get array manager
         * @property {Map>
         * @static
         * @public
         */
        static get GET_MGRT() {
            return _map;
        }

        /**
         * Get all array in this manager
         * @property {Iterator.<V>}
         * @static
         * @public
         */
        static get GET_ARRAIES() {
            return _map.values();
        }

        /**
         * Get arraies size
         * @property {number}
         * @static
         * @public
         */
        static get GET_ARRAY_SIZE() {
            return _map.size;
        }

        /**
         * Get all names from array manager
         * @property {Iterator.<K>}
         * @static
         * @public
         */
        static get GET_ARRAY_NAMES() {
            return _map.keys();
        }

        /**
         * Get a array by array name
         * @param setName {K}
         * @returns {V}
         * @constructor
         * @static
         * @public
         */
        static GET_ARRAYT(arrayName) {
            return _map.get(arrayName);
        }

        /**
         * Is exists this array name ?
         * @param setName {K}
         * @returns {boolean}
         * @constructor
         * @static
         * @public
         */
        static HAS_ARRAY(setNaarrayNameme) {
            return _map.has(arrayName);
        }

        /**
         * Delete a array by array name
         * @param setName {K}
         * @returns {boolean}
         * @constructor
         * @static
         * @public
         */
        static DELETE_ARRAY(arrayName) {
            return _map.delete(arrayName);
        }

        /**
         * Clear all arraies
         * @returns {boolean}
         * @constructor
         * @static
         * @public
         */
        static CLEAR_ARRAIES() {
            _map.clear();
            return true;
        }
    }
    return Mgrt;
})();

module.exports.ArrayMgrt = ArrayMgrt;

// The manager factory
/**
 * The manager factory
 * @constructor
 */
var ManagerMgrt = (function () {
    var _map = new Map();

    /**
     * Factory class
     * @class
     * @return {Map}
     */
    class Mgrt {
        /**
         *
         * @param key {k} the key ex:object|string|number
         * @param type {Mgrt.TYPE}
         * @returns {V}
         * @constructor
         */
        constructor(key, type) {
            this.key = key;
            this.type = type;
            if (!_map.has(key)) {
                switch (type) {
                    case Mgrt.TYPE.MAP:
                        _map.set(key, new Map());
                        break;
                    case Mgrt.TYPE.WEAKMAP:
                        _map.set(key, new WeakMap());
                        break;
                    case Mgrt.TYPE.SET:
                        _map.set(key, new Set());
                        break;
                    case Mgrt.TYPE.ARRAY:
                        _map.set(key, new Array());
                        break;
                    default:
                        return '无效的类型';
                }
            }
            return _map.get(key);
        }

        static get TYPE() {
            return {
                MAP: 'MAP',
                WEAKMAP: 'WEAKMAP',
                SET: 'SET',
                ARRAY: 'ARRAY',
            }
        }

        set type(type) {
            if (!Mgrt.TYPE.hasOwnProperty(type)) {
                throw new Error('无效的类型');
            }
            this._type = type;
        }

        /**
         * Create a manager
         * @param key {K}
         * @param type {Mgrt.TYPE}
         * @returns {V}
         * @constructor
         * @static
         * @public
         */
        static CREATE_MANAGER(key, type) {
            if (!_map.has(key)) {
                _map.set(key, new Mgrt(type, key));
            }
            return _map.get(key);
        }

        /**
         * Get factory
         * @property {Map}
         * @static
         * @public
         */
        static get GET_MGRT() {
            return _map;
        }

        /**
         * Get all manager
         * @property {Iterator.<V>}
         * @static
         * @public
         */
        static get GET_MANAGERS() {
            return _map.values();
        }

        /**
         * Get manager size
         * @property {number}
         * @static
         * @public
         */
        static get GET_MANAGER_SIZE() {
            return _map.size;
        }

        /**
         * Get all key from factory
         * @property {Iterator.<K>}
         * @static
         * @public
         */
        static get GET_MANAGER_NAMES() {
            return _map.keys();
        }

        /**
         * Get a manager by key
         * @param key {K}
         * @returns {V}
         * @constructor
         * @static
         * @public
         */
        static GET_MANAGER(key) {
            return _map.get(key);
        }

        /**
         * Is exists this key in factory ?
         * @param key {K}
         * @returns {boolean}
         * @constructor
         * @static
         * @public
         */
        static HAS_MANAGER(key) {
            return _map.has(key);
        }

        /**
         * Delete a manager by key
         * @param key {K}
         * @returns {boolean}
         * @constructor
         * @static
         * @public
         */
        static DELETE_MANAGER(key) {
            return _map.delete(key);
        }

        /**
         * Clear all manager
         * @returns {boolean}
         * @constructor
         * @static
         * @public
         */
        static CLEAR_MANAGERS() {
            _map.clear();
            return true;
        }
    }
    return Mgrt;
})();

module.exports.ManagerMgrt = ManagerMgrt;