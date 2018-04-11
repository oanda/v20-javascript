/* jshint esversion: 6 */

"use strict";

var Definition = require('./base').Definition;
var Property = require('./base').Property;
var Field = require('./base').Field;




const MT4TransactionHeartbeat_Properties = [
    new Property(
        'type',
        'type',
        "The string \"HEARTBEAT\"",
        'primitive',
        'string'
    ),
    new Property(
        'time',
        'time',
        "The date/time when the TransactionHeartbeat was created.",
        'primitive',
        'primitives.DateTime'
    ),
];

class MT4TransactionHeartbeat extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Transaction Heartbeat {time}";

        this._nameFormat = "";

        this._properties = MT4TransactionHeartbeat_Properties;

        data = data || {};

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "HEARTBEAT";
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

    }
}

class EntitySpec {
    constructor(context) {
        this.context = context;
        this.MT4TransactionHeartbeat = MT4TransactionHeartbeat;
    }



}

exports.MT4TransactionHeartbeat = MT4TransactionHeartbeat;

exports.EntitySpec = EntitySpec;
