/* jshint esversion: 6 */

"use strict";

var Definition = require('./base').Definition;
var Property = require('./base').Property;
var Field = require('./base').Field;

var transaction = require('./transaction');



const Position_Properties = [
    new Property(
        'instrument',
        "Instrument",
        "The Position's Instrument.",
        'primitive',
        'primitives.InstrumentName'
    ),
    new Property(
        'pl',
        "Profit/Loss",
        "Profit/loss realized by the Position over the lifetime of the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'unrealizedPL',
        "Unrealized Profit/Loss",
        "The unrealized profit/loss of all open Trades that contribute to this Position.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginUsed',
        "Margin Used",
        "Margin currently used by the Position.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'resettablePL',
        "Resettable Profit/Loss",
        "Profit/loss realized by the Position since the Account's resettablePL was last reset by the client.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'financing',
        "Financing",
        "The total amount of financing paid/collected for this instrument over the lifetime of the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'commission',
        "Commission",
        "The total amount of commission paid for this instrument over the lifetime of the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'guaranteedExecutionFees',
        "Guranteed Execution Fee",
        "The total amount of fees charged over the lifetime of the Account for the execution of guaranteed Stop Loss Orders for this instrument.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'long',
        "Long Side",
        "The details of the long side of the Position.",
        'object',
        'position.PositionSide'
    ),
    new Property(
        'short',
        "Short Side",
        "The details of the short side of the Position.",
        'object',
        'position.PositionSide'
    ),
];

class Position extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "{instrument}, {pl} PL {unrealizedPL} UPL";

        this._nameFormat = "Position";

        this._properties = Position_Properties;

        data = data || {};

        if (data['instrument'] !== undefined) {
            this.instrument = data['instrument'];
        }

        if (data['pl'] !== undefined) {
            this.pl = data['pl'];
        }

        if (data['unrealizedPL'] !== undefined) {
            this.unrealizedPL = data['unrealizedPL'];
        }

        if (data['marginUsed'] !== undefined) {
            this.marginUsed = data['marginUsed'];
        }

        if (data['resettablePL'] !== undefined) {
            this.resettablePL = data['resettablePL'];
        }

        if (data['financing'] !== undefined) {
            this.financing = data['financing'];
        }

        if (data['commission'] !== undefined) {
            this.commission = data['commission'];
        }

        if (data['guaranteedExecutionFees'] !== undefined) {
            this.guaranteedExecutionFees = data['guaranteedExecutionFees'];
        }

        if (data['long'] !== undefined) {
            this.long = new PositionSide(data['long']);
        }

        if (data['short'] !== undefined) {
            this.short = new PositionSide(data['short']);
        }

    }
}

const PositionSide_Properties = [
    new Property(
        'units',
        "Units",
        "Number of units in the position (negative value indicates short position, positive indicates long position).",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'averagePrice',
        "Average Price",
        "Volume-weighted average of the underlying Trade open prices for the Position.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'tradeIDs',
        "Trade IDs",
        "List of the open Trade IDs which contribute to the open Position.",
        'array_primitive',
        'TradeID'
    ),
    new Property(
        'pl',
        "Profit/Loss",
        "Profit/loss realized by the PositionSide over the lifetime of the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'unrealizedPL',
        "Unrealized Profit/Loss",
        "The unrealized profit/loss of all open Trades that contribute to this PositionSide.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'resettablePL',
        "Resettable Profit/Loss",
        "Profit/loss realized by the PositionSide since the Account's resettablePL was last reset by the client.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'financing',
        "Financing",
        "The total amount of financing paid/collected for this PositionSide over the lifetime of the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'guaranteedExecutionFees',
        "Guranteed Execution Fees",
        "The total amount of fees charged over the lifetime of the Account for the execution of guaranteed Stop Loss Orders attached to Trades for this PositionSide.",
        'primitive',
        'primitives.AccountUnits'
    ),
];

class PositionSide extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "{units} @ {averagePrice}, {pl} PL {unrealizedPL} UPL";

        this._nameFormat = "";

        this._properties = PositionSide_Properties;

        data = data || {};

        if (data['units'] !== undefined) {
            this.units = data['units'];
        }

        if (data['averagePrice'] !== undefined) {
            this.averagePrice = data['averagePrice'];
        }

        if (data['tradeIDs'] !== undefined) {
            this.tradeIDs = data['tradeIDs'];
        }

        if (data['pl'] !== undefined) {
            this.pl = data['pl'];
        }

        if (data['unrealizedPL'] !== undefined) {
            this.unrealizedPL = data['unrealizedPL'];
        }

        if (data['resettablePL'] !== undefined) {
            this.resettablePL = data['resettablePL'];
        }

        if (data['financing'] !== undefined) {
            this.financing = data['financing'];
        }

        if (data['guaranteedExecutionFees'] !== undefined) {
            this.guaranteedExecutionFees = data['guaranteedExecutionFees'];
        }

    }
}

const CalculatedPositionState_Properties = [
    new Property(
        'instrument',
        "Instrument",
        "The Position's Instrument.",
        'primitive',
        'primitives.InstrumentName'
    ),
    new Property(
        'netUnrealizedPL',
        "Net Unrealized Profit/Loss",
        "The Position's net unrealized profit/loss",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'longUnrealizedPL',
        "Long Unrealized Profit/Loss",
        "The unrealized profit/loss of the Position's long open Trades",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'shortUnrealizedPL',
        "Short Unrealized Profit/Loss",
        "The unrealized profit/loss of the Position's short open Trades",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginUsed',
        "Margin Used",
        "Margin currently used by the Position.",
        'primitive',
        'primitives.AccountUnits'
    ),
];

class CalculatedPositionState extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = CalculatedPositionState_Properties;

        data = data || {};

        if (data['instrument'] !== undefined) {
            this.instrument = data['instrument'];
        }

        if (data['netUnrealizedPL'] !== undefined) {
            this.netUnrealizedPL = data['netUnrealizedPL'];
        }

        if (data['longUnrealizedPL'] !== undefined) {
            this.longUnrealizedPL = data['longUnrealizedPL'];
        }

        if (data['shortUnrealizedPL'] !== undefined) {
            this.shortUnrealizedPL = data['shortUnrealizedPL'];
        }

        if (data['marginUsed'] !== undefined) {
            this.marginUsed = data['marginUsed'];
        }

    }
}

class EntitySpec {
    constructor(context) {
        this.context = context;
        this.Position = Position;
        this.PositionSide = PositionSide;
        this.CalculatedPositionState = CalculatedPositionState;
    }

    list(
        accountID,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/accounts/{accountID}/positions';


        path = path.replace('{' + 'accountID' + '}', accountID);


        let body = {};

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['positions'] !== undefined) {
                        response.body.positions = msg['positions'].map(x => new Position(x));
                    }

                    if (msg['lastTransactionID'] !== undefined) {
                        response.body.lastTransactionID = msg['lastTransactionID'];
                    }

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

    listOpen(
        accountID,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/accounts/{accountID}/openPositions';


        path = path.replace('{' + 'accountID' + '}', accountID);


        let body = {};

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['positions'] !== undefined) {
                        response.body.positions = msg['positions'].map(x => new Position(x));
                    }

                    if (msg['lastTransactionID'] !== undefined) {
                        response.body.lastTransactionID = msg['lastTransactionID'];
                    }

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
        instrument,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/accounts/{accountID}/positions/{instrument}';


        path = path.replace('{' + 'accountID' + '}', accountID);
        path = path.replace('{' + 'instrument' + '}', instrument);


        let body = {};

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['position'] !== undefined) {
                        response.body.position = new Position(msg['position']);
                    }

                    if (msg['lastTransactionID'] !== undefined) {
                        response.body.lastTransactionID = msg['lastTransactionID'];
                    }

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

    close(
        accountID,
        instrument,
        bodyParams,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/accounts/{accountID}/positions/{instrument}/close';

        bodyParams = bodyParams || {};

        path = path.replace('{' + 'accountID' + '}', accountID);
        path = path.replace('{' + 'instrument' + '}', instrument);


        let body = {};

        if (typeof bodyParams['longUnits'] !== 'undefined')
        {
            body['longUnits'] = bodyParams['longUnits'];
        }

        if (typeof bodyParams['longClientExtensions'] !== 'undefined')
        {
            body['longClientExtensions'] = bodyParams['longClientExtensions'];
        }

        if (typeof bodyParams['shortUnits'] !== 'undefined')
        {
            body['shortUnits'] = bodyParams['shortUnits'];
        }

        if (typeof bodyParams['shortClientExtensions'] !== 'undefined')
        {
            body['shortClientExtensions'] = bodyParams['shortClientExtensions'];
        }

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['longOrderCreateTransaction'] !== undefined) {
                        response.body.longOrderCreateTransaction = new transaction.MarketOrderTransaction(msg['longOrderCreateTransaction']);
                    }

                    if (msg['longOrderFillTransaction'] !== undefined) {
                        response.body.longOrderFillTransaction = new transaction.OrderFillTransaction(msg['longOrderFillTransaction']);
                    }

                    if (msg['longOrderCancelTransaction'] !== undefined) {
                        response.body.longOrderCancelTransaction = new transaction.OrderCancelTransaction(msg['longOrderCancelTransaction']);
                    }

                    if (msg['shortOrderCreateTransaction'] !== undefined) {
                        response.body.shortOrderCreateTransaction = new transaction.MarketOrderTransaction(msg['shortOrderCreateTransaction']);
                    }

                    if (msg['shortOrderFillTransaction'] !== undefined) {
                        response.body.shortOrderFillTransaction = new transaction.OrderFillTransaction(msg['shortOrderFillTransaction']);
                    }

                    if (msg['shortOrderCancelTransaction'] !== undefined) {
                        response.body.shortOrderCancelTransaction = new transaction.OrderCancelTransaction(msg['shortOrderCancelTransaction']);
                    }

                    if (msg['relatedTransactionIDs'] !== undefined) {
                        response.body.relatedTransactionIDs = msg['relatedTransactionIDs'];
                    }

                    if (msg['lastTransactionID'] !== undefined) {
                        response.body.lastTransactionID = msg['lastTransactionID'];
                    }

                }
                else if (response.statusCode == 400)
                {
                    if (msg['longOrderRejectTransaction'] !== undefined) {
                        response.body.longOrderRejectTransaction = new transaction.MarketOrderRejectTransaction(msg['longOrderRejectTransaction']);
                    }

                    if (msg['shortOrderRejectTransaction'] !== undefined) {
                        response.body.shortOrderRejectTransaction = new transaction.MarketOrderRejectTransaction(msg['shortOrderRejectTransaction']);
                    }

                    if (msg['relatedTransactionIDs'] !== undefined) {
                        response.body.relatedTransactionIDs = msg['relatedTransactionIDs'];
                    }

                    if (msg['lastTransactionID'] !== undefined) {
                        response.body.lastTransactionID = msg['lastTransactionID'];
                    }

                    if (msg['errorCode'] !== undefined) {
                        response.body.errorCode = msg['errorCode'];
                    }

                    if (msg['errorMessage'] !== undefined) {
                        response.body.errorMessage = msg['errorMessage'];
                    }

                }
                else if (response.statusCode == 401)
                {
                }
                else if (response.statusCode == 404)
                {
                    if (msg['longOrderRejectTransaction'] !== undefined) {
                        response.body.longOrderRejectTransaction = new transaction.MarketOrderRejectTransaction(msg['longOrderRejectTransaction']);
                    }

                    if (msg['shortOrderRejectTransaction'] !== undefined) {
                        response.body.shortOrderRejectTransaction = new transaction.MarketOrderRejectTransaction(msg['shortOrderRejectTransaction']);
                    }

                    if (msg['relatedTransactionIDs'] !== undefined) {
                        response.body.relatedTransactionIDs = msg['relatedTransactionIDs'];
                    }

                    if (msg['lastTransactionID'] !== undefined) {
                        response.body.lastTransactionID = msg['lastTransactionID'];
                    }

                    if (msg['errorCode'] !== undefined) {
                        response.body.errorCode = msg['errorCode'];
                    }

                    if (msg['errorMessage'] !== undefined) {
                        response.body.errorMessage = msg['errorMessage'];
                    }

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
            'PUT',
            path,
            body,
            undefined,
            handleResponse
        );
    }



}

exports.Position = Position;
exports.PositionSide = PositionSide;
exports.CalculatedPositionState = CalculatedPositionState;

exports.EntitySpec = EntitySpec;
