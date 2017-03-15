'use strict';

var common = require('../../../index');
var DS = common.DS;

let mongoose = require('mongoose');
let debug = require('debug')('zhonghua:test:ds:model:user');

let Schema = mongoose.Schema;
let Mixed = Schema.Types.Mixed;

let DATA_SOURCE_NAME = 'ZhongHuaDataSource';
let SCHEMA_NAME = 'UserSchema';

const DEFAULT_DOMAIN_NAME = 'default';
const SCHEMA_TABLE = {};

//================================
//       Schema Part 
//================================

let getSchema = function getSchema(domain) {
    domain = domain || DEFAULT_DOMAIN_NAME;

    if (SCHEMA_TABLE[domain]) {
        return SCHEMA_TABLE[domain];
    }

    /**
     * Schema definition of UserSchema
     */
    let UserSchema = new Schema({

        /**
         * Property definition - username
         * User name 
         *
         * @required
         * @type {String}
         *
         */

        username: String,

        /**
         * Property definition - password
         * Password for login authentication 
         *
         * @required
         * @type {String}
         *
         */

        password: String,

        /**
         * Property definition - archived
         * Archived tag 
         *
         * @optional
         * @type {{type: Boolean, default: false}}
         *
         */

        archived: {
            type: Boolean,
            default: false
        },

        /**
         * Property definition - mobile
         * Cell-phone number of user 
         *
         * @required
         * @type {String}
         *
         */

        mobile: String,

        /**
         * Property definition - status
         * The status user, including: "inactive", "active", "locked" 
         *
         * @required
         * @type {{type: String, default: "active"}}
         *
         */

        status: {
            type: String,
            default: "active"
        },

        /**
         * Property definition - createdTime
         * create time for the record 
         *
         * @optional
         * @type {{type: Date, default: Date.now}}
         *
         */

        createdTime: {
            type: Date,
            default: Date.now
        },

        /**
         * Property definition - lastLoginIP
         * create time for the record 
         *
         * @optional
         * @type {String}
         *
         */

        lastLoginIP: String,

        /**
         * Property definition - lastLoginTime
         * create time for the record 
         *
         * @optional
         * @type {Date}
         *
         */

        lastLoginTime: Date,

        /**
         * Property definition - loginCount
         * create time for the record 
         *
         * @optional
         * @type {{type: Number, default: 1}}
         *
         */

        loginCount: {
            type: Number,
            default: 1
        }

    }, {
        collection: domain + '.sys.user'
    });

    //================================
    //       Index part 
    //================================

    UserSchema.index({
        mobile: 1
    }, {
        unique: true
    });
    UserSchema.index({
        username: 1
    }, {});
    UserSchema.index({
        archived: 1
    }, {});
    UserSchema.index({
        createdTime: 1
    }, {});
    UserSchema.index({
        loginCount: 1
    }, {});
    UserSchema.index({
        lastLoginTime: 1
    }, {});
    UserSchema.index({
        status: 1
    }, {});

    SCHEMA_TABLE[domain] = UserSchema;
    return UserSchema;
};

//================================
//       Getter of mongoose model
//================================

/**
 * Return database model
 * We use a method to return this model, because we may need to check the db status, 
 * if the db connection is unavailable, we need to reconnect it for associating it to 
 * the schema
 *
 * @param {string}, domain, the tenant name
 * @return {Model}, mongoose model
 *
 */

let getDataModel = function getDataModel(domain) {
    let db = DS.getConnection(DATA_SOURCE_NAME);
    return db.model(domain + "." + SCHEMA_NAME, getSchema(domain));
};

module.exports = exports = getDataModel;