/* jshint esversion: 6 */

"use strict";

var Definition = require('./base').Definition;
var Property = require('./base').Property;
var Field = require('./base').Field;




const Price_Properties = [
    new Property(
        'instrument',
        'instrument',
        "The Price's Instrument.",
        'primitive',
        'primitives.InstrumentName'
    ),
    new Property(
        'time',
        'time',
        "The date/time when the Price was created",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'status',
        'status',
        "The status of the Price.",
        'primitive',
        'pricing.PriceStatus'
    ),
    new Property(
        'bids',
        'bids',
        "The list of prices and liquidity available on the Instrument's bid side. It is possible for this list to be empty if there is no bid liquidity currently available for the Instrument in the Account.",
        'array_object',
        'PriceBucket'
    ),
    new Property(
        'asks',
        'asks',
        "The list of prices and liquidity available on the Instrument's ask side. It is possible for this list to be empty if there is no ask liquidity currently available for the Instrument in the Account.",
        'array_object',
        'PriceBucket'
    ),
    new Property(
        'closeoutBid',
        'closeoutBid',
        "The closeout bid Price. This Price is used when a bid is required to closeout a Position (margin closeout or manual) yet there is no bid liquidity. The closeout bid is never used to open a new position.",
        'primitive',
        'pricing.PriceValue'
    ),
    new Property(
        'closeoutAsk',
        'closeoutAsk',
        "The closeout ask Price. This Price is used when a ask is required to closeout a Position (margin closeout or manual) yet there is no ask liquidity. The closeout ask is never used to open a new position.",
        'primitive',
        'pricing.PriceValue'
    ),
    new Property(
        'quoteHomeConversionFactors',
        'quoteHomeConversionFactors',
        "The factors used to convert quantities of this price's Instrument's quote currency into a quantity of the Account's home currency.",
        'object',
        'pricing.QuoteHomeConversionFactors'
    ),
    new Property(
        'unitsAvailable',
        'unitsAvailable',
        "Representation of many units of an Instrument are available to be traded for both long and short Orders.",
        'object',
        'pricing.UnitsAvailable'
    ),
];

class Price extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = Price_Properties;

        data = data || {};

        if (data['instrument'] !== undefined) {
            this.instrument = data['instrument'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['status'] !== undefined) {
            this.status = data['status'];
        }

        if (data['bids'] !== undefined) {
            this.bids = data['bids'].map(x => new PriceBucket(x));
        }

        if (data['asks'] !== undefined) {
            this.asks = data['asks'].map(x => new PriceBucket(x));
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
            this.unitsAvailable = new UnitsAvailable(data['unitsAvailable']);
        }

    }
}

const PriceBucket_Properties = [
    new Property(
        'price',
        'price',
        "The Price offered by the PriceBucket",
        'primitive',
        'pricing.PriceValue'
    ),
    new Property(
        'liquidity',
        'liquidity',
        "The amount of liquidity offered by the PriceBucket",
        'primitive',
        'integer'
    ),
];

class PriceBucket extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = PriceBucket_Properties;

        data = data || {};

        if (data['price'] !== undefined) {
            this.price = data['price'];
        }

        if (data['liquidity'] !== undefined) {
            this.liquidity = data['liquidity'];
        }

    }
}

const QuoteHomeConversionFactors_Properties = [
    new Property(
        'positiveUnits',
        'positiveUnits',
        "The factor used to convert a positive amount of the Price's Instrument's quote currency into a positive amount of the Account's home currency.  Conversion is performed by multiplying the quote units by the conversion factor.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'negativeUnits',
        'negativeUnits',
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

const UnitsAvailable_Properties = [
    new Property(
        'long',
        'long',
        "The units available breakdown for long Orders.",
        'object',
        'pricing.UnitsAvailableDetails'
    ),
    new Property(
        'short',
        'short',
        "The units available breakdown for short Orders.",
        'object',
        'pricing.UnitsAvailableDetails'
    ),
];

class UnitsAvailable extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = UnitsAvailable_Properties;

        data = data || {};

        if (data['long'] !== undefined) {
            this.long = new UnitsAvailableDetails(data['long']);
        }

        if (data['short'] !== undefined) {
            this.short = new UnitsAvailableDetails(data['short']);
        }

    }
}

const UnitsAvailableDetails_Properties = [
    new Property(
        'default',
        'default',
        "The number of units that are available to be traded using an Order with a positionFill option of \"DEFAULT\". For an Account with hedging enabled, this value will be the same as the \"OPEN_ONLY\" value. For an Account without hedging enabled, this value will be the same as the \"REDUCE_FIRST\" value.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'reduceFirst',
        'reduceFirst',
        "The number of units that may are available to be traded with an Order with a positionFill option of \"REDUCE_FIRST\".",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'reduceOnly',
        'reduceOnly',
        "The number of units that may are available to be traded with an Order with a positionFill option of \"REDUCE_ONLY\".",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'openOnly',
        'openOnly',
        "The number of units that may are available to be traded with an Order with a positionFill option of \"OPEN_ONLY\".",
        'primitive',
        'primitives.DecimalNumber'
    ),
];

class UnitsAvailableDetails extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = UnitsAvailableDetails_Properties;

        data = data || {};

        if (data['default'] !== undefined) {
            this.default = data['default'];
        }

        if (data['reduceFirst'] !== undefined) {
            this.reduceFirst = data['reduceFirst'];
        }

        if (data['reduceOnly'] !== undefined) {
            this.reduceOnly = data['reduceOnly'];
        }

        if (data['openOnly'] !== undefined) {
            this.openOnly = data['openOnly'];
        }

    }
}

class EntitySpec {
    constructor(context) {
        this.context = context;
        this.Price = Price;
        this.PriceBucket = PriceBucket;
        this.QuoteHomeConversionFactors = QuoteHomeConversionFactors;
        this.UnitsAvailable = UnitsAvailable;
        this.UnitsAvailableDetails = UnitsAvailableDetails;
    }

    get(
        accountID,
        queryParams,
        responseHandler
    )
    {
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

        let body = {};

        function handleResponse(response) {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['prices'] !== undefined) {
                        response.body.prices = msg['prices'].map(x => new Price(x));
                    }

                }

                if (response.statusCode == 400)
                {
                    if (msg['errorMessage'] !== undefined) {
                        response.body.errorMessage = msg['errorMessage'];
                    }

                    if (msg['errorCode'] !== undefined) {
                        response.body.errorCode = msg['errorCode'];
                    }

                }

                if (response.statusCode == 401)
                {
                    if (msg['errorMessage'] !== undefined) {
                        response.body.errorMessage = msg['errorMessage'];
                    }

                    if (msg['errorCode'] !== undefined) {
                        response.body.errorCode = msg['errorCode'];
                    }

                }

                if (response.statusCode == 404)
                {
                    if (msg['errorMessage'] !== undefined) {
                        response.body.errorMessage = msg['errorMessage'];
                    }

                    if (msg['errorCode'] !== undefined) {
                        response.body.errorCode = msg['errorCode'];
                    }

                }

                if (response.statusCode == 405)
                {
                    if (msg['errorMessage'] !== undefined) {
                        response.body.errorMessage = msg['errorMessage'];
                    }

                    if (msg['errorCode'] !== undefined) {
                        response.body.errorCode = msg['errorCode'];
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

exports.Price = Price;
exports.PriceBucket = PriceBucket;
exports.QuoteHomeConversionFactors = QuoteHomeConversionFactors;
exports.UnitsAvailable = UnitsAvailable;
exports.UnitsAvailableDetails = UnitsAvailableDetails;

exports.EntitySpec = EntitySpec;
