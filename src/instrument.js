/* jshint esversion: 6 */

"use strict";

var Definition = require('./base').Definition;
var Property = require('./base').Property;
var Field = require('./base').Field;




const Candlestick_Properties = [
    new Property(
        'time',
        'time',
        "The start time of the candlestick",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'bid',
        'bid',
        "The candlestick data based on bids. Only provided if bid-based candles were requested.",
        'object',
        'instrument.CandlestickData'
    ),
    new Property(
        'ask',
        'ask',
        "The candlestick data based on asks. Only provided if ask-based candles were requested.",
        'object',
        'instrument.CandlestickData'
    ),
    new Property(
        'mid',
        'mid',
        "The candlestick data based on midpoints. Only provided if midpoint-based candles were requested.",
        'object',
        'instrument.CandlestickData'
    ),
    new Property(
        'volume',
        'volume',
        "The number of prices created during the time-range represented by the candlestick.",
        'primitive',
        'integer'
    ),
    new Property(
        'complete',
        'complete',
        "A flag indicating if the candlestick is complete. A complete candlestick is one whose ending time is not in the future.",
        'primitive',
        'boolean'
    ),
];

class Candlestick extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = Candlestick_Properties;

        data = data || {};

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['bid'] !== undefined) {
            this.bid = new CandlestickData(data['bid']);
        }

        if (data['ask'] !== undefined) {
            this.ask = new CandlestickData(data['ask']);
        }

        if (data['mid'] !== undefined) {
            this.mid = new CandlestickData(data['mid']);
        }

        if (data['volume'] !== undefined) {
            this.volume = data['volume'];
        }

        if (data['complete'] !== undefined) {
            this.complete = data['complete'];
        }

    }
}

const CandlestickData_Properties = [
    new Property(
        'o',
        'o',
        "The first (open) price in the time-range represented by the candlestick.",
        'primitive',
        'pricing.PriceValue'
    ),
    new Property(
        'h',
        'h',
        "The highest price in the time-range represented by the candlestick.",
        'primitive',
        'pricing.PriceValue'
    ),
    new Property(
        'l',
        'l',
        "The lowest price in the time-range represented by the candlestick.",
        'primitive',
        'pricing.PriceValue'
    ),
    new Property(
        'c',
        'c',
        "The last (closing) price in the time-range represented by the candlestick.",
        'primitive',
        'pricing.PriceValue'
    ),
];

class CandlestickData extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = CandlestickData_Properties;

        data = data || {};

        if (data['o'] !== undefined) {
            this.o = data['o'];
        }

        if (data['h'] !== undefined) {
            this.h = data['h'];
        }

        if (data['l'] !== undefined) {
            this.l = data['l'];
        }

        if (data['c'] !== undefined) {
            this.c = data['c'];
        }

    }
}

class EntitySpec {
    constructor(context) {
        this.context = context;
        this.Candlestick = Candlestick;
        this.CandlestickData = CandlestickData;
    }

    candles(
        instrument,
        queryParams,
        responseHandler
    )
    {
        let path = '/v3/instruments/{instrument}/candles';

        queryParams = queryParams || {};

        path = path.replace('{' + 'instrument' + '}', instrument);

        path = path + "?";
        if (typeof queryParams['price'] !== 'undefined') {
            path = path + "price=" + queryParams['price'] + "&";
        }
        if (typeof queryParams['granularity'] !== 'undefined') {
            path = path + "granularity=" + queryParams['granularity'] + "&";
        }
        if (typeof queryParams['count'] !== 'undefined') {
            path = path + "count=" + queryParams['count'] + "&";
        }
        if (typeof queryParams['from'] !== 'undefined') {
            path = path + "from=" + queryParams['from'] + "&";
        }
        if (typeof queryParams['to'] !== 'undefined') {
            path = path + "to=" + queryParams['to'] + "&";
        }
        if (typeof queryParams['smooth'] !== 'undefined') {
            path = path + "smooth=" + queryParams['smooth'] + "&";
        }
        if (typeof queryParams['includeFirst'] !== 'undefined') {
            path = path + "includeFirst=" + queryParams['includeFirst'] + "&";
        }
        if (typeof queryParams['dailyAlignment'] !== 'undefined') {
            path = path + "dailyAlignment=" + queryParams['dailyAlignment'] + "&";
        }
        if (typeof queryParams['alignmentTimezone'] !== 'undefined') {
            path = path + "alignmentTimezone=" + queryParams['alignmentTimezone'] + "&";
        }
        if (typeof queryParams['weeklyAlignment'] !== 'undefined') {
            path = path + "weeklyAlignment=" + queryParams['weeklyAlignment'] + "&";
        }

        let body = {};

        function handleResponse(response) {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['instrument'] !== undefined) {
                        response.body.instrument = msg['instrument'];
                    }

                    if (msg['granularity'] !== undefined) {
                        response.body.granularity = msg['granularity'];
                    }

                    if (msg['candles'] !== undefined) {
                        response.body.candles = msg['candles'].map(x => new Candlestick(x));
                    }

                }

                if (response.statusCode == 400)
                {
                    if (msg['errorCode'] !== undefined) {
                        response.body.errorCode = msg['errorCode'];
                    }

                    if (msg['errorMessage'] !== undefined) {
                        response.body.errorMessage = msg['errorMessage'];
                    }

                }

                if (response.statusCode == 401)
                {
                    if (msg['errorCode'] !== undefined) {
                        response.body.errorCode = msg['errorCode'];
                    }

                    if (msg['errorMessage'] !== undefined) {
                        response.body.errorMessage = msg['errorMessage'];
                    }

                }

                if (response.statusCode == 404)
                {
                    if (msg['errorCode'] !== undefined) {
                        response.body.errorCode = msg['errorCode'];
                    }

                    if (msg['errorMessage'] !== undefined) {
                        response.body.errorMessage = msg['errorMessage'];
                    }

                }

                if (response.statusCode == 405)
                {
                    if (msg['errorCode'] !== undefined) {
                        response.body.errorCode = msg['errorCode'];
                    }

                    if (msg['errorMessage'] !== undefined) {
                        response.body.errorMessage = msg['errorMessage'];
                    }

                }
            }

            if (responseHandler)
            {
                responseHandler(response);
            }
        }

        this.context.request(
            'GET',
            path,
            body,
            handleResponse
        );
    }



}

exports.Candlestick = Candlestick;
exports.CandlestickData = CandlestickData;

exports.EntitySpec = EntitySpec;
