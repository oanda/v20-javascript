/* jshint esversion: 6 */

"use strict";

var Definition = require('./base').Definition;
var Property = require('./base').Property;
var Field = require('./base').Field;

var pricing_common = require('./pricing_common');
var Price = pricing_common.Price;
var order = require('./order');
var instrument = require('./instrument');



const ClientPrice_Properties = [
    new Property(
        'type',
        "Type",
        "The string \"PRICE\". Used to identify the a Price object when found in a stream.",
        'primitive',
        'string'
    ),
    new Property(
        'instrument',
        "Instrument",
        "The Price's Instrument.",
        'primitive',
        'primitives.InstrumentName'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Price was created",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'status',
        "Status",
        "The status of the Price.",
        'primitive',
        'pricing.PriceStatus'
    ),
    new Property(
        'tradeable',
        "Is Tradeable",
        "Flag indicating if the Price is tradeable or not",
        'primitive',
        'boolean'
    ),
    new Property(
        'bids',
        "Bids",
        "The list of prices and liquidity available on the Instrument's bid side. It is possible for this list to be empty if there is no bid liquidity currently available for the Instrument in the Account.",
        'array_object',
        'PriceBucket'
    ),
    new Property(
        'asks',
        "Asks",
        "The list of prices and liquidity available on the Instrument's ask side. It is possible for this list to be empty if there is no ask liquidity currently available for the Instrument in the Account.",
        'array_object',
        'PriceBucket'
    ),
    new Property(
        'closeoutBid',
        "Closeout Bid",
        "The closeout bid Price. This Price is used when a bid is required to closeout a Position (margin closeout or manual) yet there is no bid liquidity. The closeout bid is never used to open a new position.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'closeoutAsk',
        "Closeout Ask",
        "The closeout ask Price. This Price is used when a ask is required to closeout a Position (margin closeout or manual) yet there is no ask liquidity. The closeout ask is never used to open a new position.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'quoteHomeConversionFactors',
        "Quote Home Conversions",
        "The factors used to convert quantities of this price's Instrument's quote currency into a quantity of the Account's home currency. When the includeHomeConversions is present in the pricing request (regardless of its value), this field will not be present.",
        'object',
        'pricing.QuoteHomeConversionFactors'
    ),
    new Property(
        'unitsAvailable',
        "Units Available",
        "Representation of how many units of an Instrument are available to be traded by an Order depending on its postionFill option.",
        'object',
        'order.UnitsAvailable'
    ),
];

class ClientPrice extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = ClientPrice_Properties;

        data = data || {};

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "PRICE";
        }

        if (data['instrument'] !== undefined) {
            this.instrument = data['instrument'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['status'] !== undefined) {
            this.status = data['status'];
        }

        if (data['tradeable'] !== undefined) {
            this.tradeable = data['tradeable'];
        }

        if (data['bids'] !== undefined) {
            this.bids = data['bids'].map(x => new pricing_common.PriceBucket(x));
        }

        if (data['asks'] !== undefined) {
            this.asks = data['asks'].map(x => new pricing_common.PriceBucket(x));
        }

        if (data['closeoutBid'] !== undefined) {
            this.closeoutBid = data['closeoutBid'];
        }

        if (data['closeoutAsk'] !== undefined) {
            this.closeoutAsk = data['closeoutAsk'];
        }

        if (data['quoteHomeConversionFactors'] !== undefined) {
            this.quoteHomeConversionFactors = new QuoteHomeConversionFactors(data['quoteHomeConversionFactors']);
        }

        if (data['unitsAvailable'] !== undefined) {
            this.unitsAvailable = new order.UnitsAvailable(data['unitsAvailable']);
        }

    }
}

const QuoteHomeConversionFactors_Properties = [
    new Property(
        'positiveUnits',
        "Positive Units",
        "The factor used to convert a positive amount of the Price's Instrument's quote currency into a positive amount of the Account's home currency.  Conversion is performed by multiplying the quote units by the conversion factor.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'negativeUnits',
        "Negative Units",
        "The factor used to convert a negative amount of the Price's Instrument's quote currency into a negative amount of the Account's home currency.  Conversion is performed by multiplying the quote units by the conversion factor.",
        'primitive',
        'primitives.DecimalNumber'
    ),
];

class QuoteHomeConversionFactors extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = QuoteHomeConversionFactors_Properties;

        data = data || {};

        if (data['positiveUnits'] !== undefined) {
            this.positiveUnits = data['positiveUnits'];
        }

        if (data['negativeUnits'] !== undefined) {
            this.negativeUnits = data['negativeUnits'];
        }

    }
}

const HomeConversions_Properties = [
    new Property(
        'currency',
        'currency',
        "The currency to be converted into the home currency.",
        'primitive',
        'primitives.Currency'
    ),
    new Property(
        'accountGain',
        "Account Gain",
        "The factor used to convert any gains for an Account in the specified currency into the Account's home currency. This would include positive realized P/L and positive financing amounts. Conversion is performed by multiplying the positive P/L by the conversion factor.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'accountLoss',
        "Account Loss The factor used to convert any losses for an Account in the specified currency into the Account's home currency. This would include negative realized P/L and negative financing amounts. Conversion is performed by multiplying the positive P/L by the conversion factor.",
        "The string representation of a decimal number.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'positionValue',
        "Position Value",
        "The factor used to convert a Position or Trade Value in the specified currency into the Account's home currency. Conversion is performed by multiplying the Position or Trade Value by the conversion factor.",
        'primitive',
        'primitives.DecimalNumber'
    ),
];

class HomeConversions extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = HomeConversions_Properties;

        data = data || {};

        if (data['currency'] !== undefined) {
            this.currency = data['currency'];
        }

        if (data['accountGain'] !== undefined) {
            this.accountGain = data['accountGain'];
        }

        if (data['accountLoss'] !== undefined) {
            this.accountLoss = data['accountLoss'];
        }

        if (data['positionValue'] !== undefined) {
            this.positionValue = data['positionValue'];
        }

    }
}

const PricingHeartbeat_Properties = [
    new Property(
        'type',
        "Type",
        "The string \"HEARTBEAT\"",
        'primitive',
        'string'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Heartbeat was created.",
        'primitive',
        'primitives.DateTime'
    ),
];

class PricingHeartbeat extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Pricing Heartbeat {time}";

        this._nameFormat = "";

        this._properties = PricingHeartbeat_Properties;

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
        this.ClientPrice = ClientPrice;
        this.QuoteHomeConversionFactors = QuoteHomeConversionFactors;
        this.HomeConversions = HomeConversions;
        this.PricingHeartbeat = PricingHeartbeat;
    }

    basePrices(
        queryParams,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/pricing';

        queryParams = queryParams || {};


        path = path + "?";
        if (typeof queryParams['time'] !== 'undefined') {
            path = path + "time=" + queryParams['time'] + "&";
        }

        let body = {};

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['prices'] !== undefined) {
                        response.body.prices = msg['prices'].map(x => new pricing_common.Price(x));
                    }

                }
                else if (response.statusCode == 400)
                {
                }
                else if (response.statusCode == 401)
                {
                }
                else if (response.statusCode == 404)
                {
                }
                else if (response.statusCode == 405)
                {
                }
                //
                // Assume standard error response with errorCode and errorMessage
                //
                else
                {
                    if (msg['errorCode'] !== undefined) {
                        response.body.errorCode = msg['errorCode'];
                    }

                    if (msg['errorMessage'] !== undefined) {
                        response.body.errorMessage = msg['errorMessage'];
                    }
                }
            }

            responseHandler(response);
        };


        this.context.request(
            'GET',
            path,
            body,
            undefined,
            handleResponse
        );
    }

    getPriceRange(
        instrument,
        queryParams,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/pricing/range';

        queryParams = queryParams || {};

        path = path.replace('{' + 'instrument' + '}', instrument);

        path = path + "?";
        if (typeof queryParams['from'] !== 'undefined') {
            path = path + "from=" + queryParams['from'] + "&";
        }
        if (typeof queryParams['to'] !== 'undefined') {
            path = path + "to=" + queryParams['to'] + "&";
        }

        let body = {};

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['prices'] !== undefined) {
                        response.body.prices = msg['prices'].map(x => new pricing_common.Price(x));
                    }

                }
                else if (response.statusCode == 400)
                {
                }
                else if (response.statusCode == 401)
                {
                }
                else if (response.statusCode == 404)
                {
                }
                else if (response.statusCode == 405)
                {
                }
                //
                // Assume standard error response with errorCode and errorMessage
                //
                else
                {
                    if (msg['errorCode'] !== undefined) {
                        response.body.errorCode = msg['errorCode'];
                    }

                    if (msg['errorMessage'] !== undefined) {
                        response.body.errorMessage = msg['errorMessage'];
                    }
                }
            }

            responseHandler(response);
        };


        this.context.request(
            'GET',
            path,
            body,
            undefined,
            handleResponse
        );
    }

    get(
        accountID,
        queryParams,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/accounts/{accountID}/pricing';

        queryParams = queryParams || {};

        path = path.replace('{' + 'accountID' + '}', accountID);

        path = path + "?";
        if (typeof queryParams['instruments'] !== 'undefined') {
            path = path + "instruments=" + queryParams['instruments'] + "&";
        }
        if (typeof queryParams['since'] !== 'undefined') {
            path = path + "since=" + queryParams['since'] + "&";
        }
        if (typeof queryParams['includeUnitsAvailable'] !== 'undefined') {
            path = path + "includeUnitsAvailable=" + queryParams['includeUnitsAvailable'] + "&";
        }
        if (typeof queryParams['includeHomeConversions'] !== 'undefined') {
            path = path + "includeHomeConversions=" + queryParams['includeHomeConversions'] + "&";
        }

        let body = {};

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['prices'] !== undefined) {
                        response.body.prices = msg['prices'].map(x => new ClientPrice(x));
                    }

                    if (msg['homeConversions'] !== undefined) {
                        response.body.homeConversions = msg['homeConversions'].map(x => new HomeConversions(x));
                    }

                    if (msg['time'] !== undefined) {
                        response.body.time = msg['time'];
                    }

                }
                else if (response.statusCode == 400)
                {
                }
                else if (response.statusCode == 401)
                {
                }
                else if (response.statusCode == 404)
                {
                }
                else if (response.statusCode == 405)
                {
                }
                //
                // Assume standard error response with errorCode and errorMessage
                //
                else
                {
                    if (msg['errorCode'] !== undefined) {
                        response.body.errorCode = msg['errorCode'];
                    }

                    if (msg['errorMessage'] !== undefined) {
                        response.body.errorMessage = msg['errorMessage'];
                    }
                }
            }

            responseHandler(response);
        };


        this.context.request(
            'GET',
            path,
            body,
            undefined,
            handleResponse
        );
    }

    stream(
        accountID,
        queryParams,
        streamChunkHandler,
        responseHandler,
        errorHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }

        if (!streamChunkHandler)
        {
            throw "No streamChunkHandler provided for streaming API call"
        }

        let path = '/v3/accounts/{accountID}/pricing/stream';

        queryParams = queryParams || {};

        path = path.replace('{' + 'accountID' + '}', accountID);

        path = path + "?";
        if (typeof queryParams['instruments'] !== 'undefined') {
            path = path + "instruments=" + queryParams['instruments'] + "&";
        }
        if (typeof queryParams['snapshot'] !== 'undefined') {
            path = path + "snapshot=" + queryParams['snapshot'] + "&";
        }

        let body = {};

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['price'] !== undefined) {
                        response.body.price = new ClientPrice(msg['price']);
                    }

                    if (msg['heartbeat'] !== undefined) {
                        response.body.heartbeat = new PricingHeartbeat(msg['heartbeat']);
                    }

                }
                else if (response.statusCode == 400)
                {
                }
                else if (response.statusCode == 401)
                {
                }
                else if (response.statusCode == 404)
                {
                }
                else if (response.statusCode == 405)
                {
                }
                //
                // Assume standard error response with errorCode and errorMessage
                //
                else
                {
                    if (msg['errorCode'] !== undefined) {
                        response.body.errorCode = msg['errorCode'];
                    }

                    if (msg['errorMessage'] !== undefined) {
                        response.body.errorMessage = msg['errorMessage'];
                    }
                }
            }

            responseHandler(response);
        };

        function generateStreamParser(streamChunkHandler)
        {
            return (chunk) => {
                let msg = JSON.parse(chunk);

                if (msg.type == "HEARTBEAT")
                {
                    streamChunkHandler(new PricingHeartbeat(msg));
                }
                else if (msg.type == "PRICE")
                {
                    streamChunkHandler(new Price(msg));
                }
            }
        }

        this.context.request(
            'GET',
            path,
            body,
            generateStreamParser(streamChunkHandler),
            handleResponse,
            errorHandler
        );
    }

    candles(
        instrument,
        queryParams,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/accounts/{accountID}/instruments/{instrument}/candles';

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
        if (typeof queryParams['units'] !== 'undefined') {
            path = path + "units=" + queryParams['units'] + "&";
        }

        let body = {};

        let handleResponse = (response) => {
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
                        response.body.candles = msg['candles'].map(x => new instrument.Candlestick(x));
                    }

                }
                else if (response.statusCode == 400)
                {
                }
                else if (response.statusCode == 401)
                {
                }
                else if (response.statusCode == 404)
                {
                }
                else if (response.statusCode == 405)
                {
                }
                //
                // Assume standard error response with errorCode and errorMessage
                //
                else
                {
                    if (msg['errorCode'] !== undefined) {
                        response.body.errorCode = msg['errorCode'];
                    }

                    if (msg['errorMessage'] !== undefined) {
                        response.body.errorMessage = msg['errorMessage'];
                    }
                }
            }

            responseHandler(response);
        };


        this.context.request(
            'GET',
            path,
            body,
            undefined,
            handleResponse
        );
    }



}

exports.ClientPrice = ClientPrice;
exports.QuoteHomeConversionFactors = QuoteHomeConversionFactors;
exports.HomeConversions = HomeConversions;
exports.PricingHeartbeat = PricingHeartbeat;

exports.EntitySpec = EntitySpec;
