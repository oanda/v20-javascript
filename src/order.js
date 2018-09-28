/* jshint esversion: 6 */

"use strict";

var Definition = require('./base').Definition;
var Property = require('./base').Property;
var Field = require('./base').Field;

var transaction = require('./transaction');
var primitives = require('./primitives');



const OrderIdentifier_Properties = [
    new Property(
        'orderID',
        'orderID',
        "The OANDA-assigned Order ID",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'clientOrderID',
        'clientOrderID',
        "The client-provided client Order ID",
        'primitive',
        'transaction.ClientID'
    ),
];

class OrderIdentifier extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = OrderIdentifier_Properties;

        data = data || {};

        if (data['orderID'] !== undefined) {
            this.orderID = data['orderID'];
        }

        if (data['clientOrderID'] !== undefined) {
            this.clientOrderID = data['clientOrderID'];
        }

    }
}

const DynamicOrderState_Properties = [
    new Property(
        'id',
        "Order ID",
        "The Order's ID.",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'trailingStopValue',
        "Trailing Stop Value",
        "The Order's calculated trailing stop value.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'triggerDistance',
        "Trigger Distance",
        "The distance between the Trailing Stop Loss Order's trailingStopValue and the current Market Price. This represents the distance (in price units) of the Order from a triggering price. If the distance could not be determined, this value will not be set.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'isTriggerDistanceExact',
        "Trigger Distance Is Exact",
        "True if an exact trigger distance could be calculated. If false, it means the provided trigger distance is a best estimate. If the distance could not be determined, this value will not be set.",
        'primitive',
        'boolean'
    ),
];

class DynamicOrderState extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = DynamicOrderState_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['trailingStopValue'] !== undefined) {
            this.trailingStopValue = data['trailingStopValue'];
        }

        if (data['triggerDistance'] !== undefined) {
            this.triggerDistance = data['triggerDistance'];
        }

        if (data['isTriggerDistanceExact'] !== undefined) {
            this.isTriggerDistanceExact = data['isTriggerDistanceExact'];
        }

    }
}

const Order_Properties = [
    new Property(
        'id',
        "Order ID",
        "The Order's identifier, unique within the Order's Account.",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'createTime',
        "Create Time",
        "The time when the Order was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'state',
        "State",
        "The current state of the Order.",
        'primitive',
        'order.OrderState'
    ),
    new Property(
        'clientExtensions',
        "Client Extensions",
        "The client extensions of the Order. Do not set, modify, or delete clientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
];

class Order extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "Order {id}";

        this._properties = Order_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['createTime'] !== undefined) {
            this.createTime = data['createTime'];
        }

        if (data['state'] !== undefined) {
            this.state = data['state'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new transaction.ClientExtensions(data['clientExtensions']);
        }

    }

    static create(order) {
        if (! order["type"])
        {
            return new Order(order);
        }
        else if (order["type"] == "TAKE_PROFIT")
        {
            return new TakeProfitOrder(order);
        }
        else if (order["type"] == "STOP_LOSS")
        {
            return new StopLossOrder(order);
        }
        else if (order["type"] == "TRAILING_STOP_LOSS")
        {
            return new TrailingStopLossOrder(order);
        }
        else if (order["type"] == "MARKET")
        {
            return new MarketOrder(order);
        }
        else if (order["type"] == "FIXED_PRICE")
        {
            return new FixedPriceOrder(order);
        }
        else if (order["type"] == "LIMIT")
        {
            return new LimitOrder(order);
        }
        else if (order["type"] == "STOP")
        {
            return new StopOrder(order);
        }
        else if (order["type"] == "MARKET_IF_TOUCHED")
        {
            return new MarketIfTouchedOrder(order);
        }

        return new Order(order);
    }
}

const MarketOrder_Properties = [
    new Property(
        'id',
        "Order ID",
        "The Order's identifier, unique within the Order's Account.",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'createTime',
        "Create Time",
        "The time when the Order was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'state',
        "State",
        "The current state of the Order.",
        'primitive',
        'order.OrderState'
    ),
    new Property(
        'clientExtensions',
        "Client Extensions",
        "The client extensions of the Order. Do not set, modify, or delete clientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'type',
        "Type",
        "The type of the Order. Always set to \"MARKET\" for Market Orders.",
        'primitive',
        'order.OrderType'
    ),
    new Property(
        'instrument',
        "Instrument",
        "The Market Order's Instrument.",
        'primitive',
        'primitives.InstrumentName'
    ),
    new Property(
        'units',
        "Amount",
        "The quantity requested to be filled by the Market Order. A posititive number of units results in a long Order, and a negative number of units results in a short Order.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'timeInForce',
        "Time In Force",
        "The time-in-force requested for the Market Order. Restricted to FOK or IOC for a MarketOrder.",
        'primitive',
        'order.TimeInForce'
    ),
    new Property(
        'priceBound',
        "Price Bound",
        "The worst price that the client is willing to have the Market Order filled at.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'positionFill',
        "Position Fill",
        "Specification of how Positions in the Account are modified when the Order is filled.",
        'primitive',
        'order.OrderPositionFill'
    ),
    new Property(
        'tradeClose',
        "Trade Close Details",
        "Details of the Trade requested to be closed, only provided when the Market Order is being used to explicitly close a Trade.",
        'object',
        'transaction.MarketOrderTradeClose'
    ),
    new Property(
        'longPositionCloseout',
        "Long Position Close Details",
        "Details of the long Position requested to be closed out, only provided when a Market Order is being used to explicitly closeout a long Position.",
        'object',
        'transaction.MarketOrderPositionCloseout'
    ),
    new Property(
        'shortPositionCloseout',
        "Short Position Close Details",
        "Details of the short Position requested to be closed out, only provided when a Market Order is being used to explicitly closeout a short Position.",
        'object',
        'transaction.MarketOrderPositionCloseout'
    ),
    new Property(
        'marginCloseout',
        "Margin Closeout Details",
        "Details of the Margin Closeout that this Market Order was created for",
        'object',
        'transaction.MarketOrderMarginCloseout'
    ),
    new Property(
        'delayedTradeClose',
        "Delayed Trade Close Details",
        "Details of the delayed Trade close that this Market Order was created for",
        'object',
        'transaction.MarketOrderDelayedTradeClose'
    ),
    new Property(
        'takeProfitOnFill',
        "Take Profit On Fill",
        "TakeProfitDetails specifies the details of a Take Profit Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Take Profit, or when a Trade's dependent Take Profit Order is modified directly through the Trade.",
        'object',
        'transaction.TakeProfitDetails'
    ),
    new Property(
        'stopLossOnFill',
        "Stop Loss On Fill",
        "StopLossDetails specifies the details of a Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Stop Loss, or when a Trade's dependent Stop Loss Order is modified directly through the Trade.",
        'object',
        'transaction.StopLossDetails'
    ),
    new Property(
        'trailingStopLossOnFill',
        "Trailing Stop Loss On Fill",
        "TrailingStopLossDetails specifies the details of a Trailing Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Trailing Stop Loss, or when a Trade's dependent Trailing Stop Loss Order is modified directly through the Trade.",
        'object',
        'transaction.TrailingStopLossDetails'
    ),
    new Property(
        'tradeClientExtensions',
        "Trade Client Extensions",
        "Client Extensions to add to the Trade created when the Order is filled (if such a Trade is created). Do not set, modify, or delete tradeClientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'fillingTransactionID',
        "Filling Transaction ID",
        "ID of the Transaction that filled this Order (only provided when the Order's state is FILLED)",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'filledTime',
        "Filled Time",
        "Date/time when the Order was filled (only provided when the Order's state is FILLED)",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'tradeOpenedID',
        "Trade Opened ID",
        "Trade ID of Trade opened when the Order was filled (only provided when the Order's state is FILLED and a Trade was opened as a result of the fill)",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'tradeReducedID',
        "Trade Reduced ID",
        "Trade ID of Trade reduced when the Order was filled (only provided when the Order's state is FILLED and a Trade was reduced as a result of the fill)",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'tradeClosedIDs',
        "Trade Closed IDs",
        "Trade IDs of Trades closed when the Order was filled (only provided when the Order's state is FILLED and one or more Trades were closed as a result of the fill)",
        'array_primitive',
        'TradeID'
    ),
    new Property(
        'cancellingTransactionID',
        "Cancelling Transction ID",
        "ID of the Transaction that cancelled the Order (only provided when the Order's state is CANCELLED)",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'cancelledTime',
        "Cancelled Time",
        "Date/time when the Order was cancelled (only provided when the state of the Order is CANCELLED)",
        'primitive',
        'primitives.DateTime'
    ),
];

class MarketOrder extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "{units} units of {instrument}";

        this._nameFormat = "Market Order {id}";

        this._properties = MarketOrder_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['createTime'] !== undefined) {
            this.createTime = data['createTime'];
        }

        if (data['state'] !== undefined) {
            this.state = data['state'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new transaction.ClientExtensions(data['clientExtensions']);
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "MARKET";
        }

        if (data['instrument'] !== undefined) {
            this.instrument = data['instrument'];
        }

        if (data['units'] !== undefined) {
            this.units = data['units'];
        }

        if (data['timeInForce'] !== undefined) {
            this.timeInForce = data['timeInForce'];
        }
        else {
            this.timeInForce = "FOK";
        }

        if (data['priceBound'] !== undefined) {
            this.priceBound = data['priceBound'];
        }

        if (data['positionFill'] !== undefined) {
            this.positionFill = data['positionFill'];
        }
        else {
            this.positionFill = "DEFAULT";
        }

        if (data['tradeClose'] !== undefined) {
            this.tradeClose = new transaction.MarketOrderTradeClose(data['tradeClose']);
        }

        if (data['longPositionCloseout'] !== undefined) {
            this.longPositionCloseout = new transaction.MarketOrderPositionCloseout(data['longPositionCloseout']);
        }

        if (data['shortPositionCloseout'] !== undefined) {
            this.shortPositionCloseout = new transaction.MarketOrderPositionCloseout(data['shortPositionCloseout']);
        }

        if (data['marginCloseout'] !== undefined) {
            this.marginCloseout = new transaction.MarketOrderMarginCloseout(data['marginCloseout']);
        }

        if (data['delayedTradeClose'] !== undefined) {
            this.delayedTradeClose = new transaction.MarketOrderDelayedTradeClose(data['delayedTradeClose']);
        }

        if (data['takeProfitOnFill'] !== undefined) {
            this.takeProfitOnFill = new transaction.TakeProfitDetails(data['takeProfitOnFill']);
        }

        if (data['stopLossOnFill'] !== undefined) {
            this.stopLossOnFill = new transaction.StopLossDetails(data['stopLossOnFill']);
        }

        if (data['trailingStopLossOnFill'] !== undefined) {
            this.trailingStopLossOnFill = new transaction.TrailingStopLossDetails(data['trailingStopLossOnFill']);
        }

        if (data['tradeClientExtensions'] !== undefined) {
            this.tradeClientExtensions = new transaction.ClientExtensions(data['tradeClientExtensions']);
        }

        if (data['fillingTransactionID'] !== undefined) {
            this.fillingTransactionID = data['fillingTransactionID'];
        }

        if (data['filledTime'] !== undefined) {
            this.filledTime = data['filledTime'];
        }

        if (data['tradeOpenedID'] !== undefined) {
            this.tradeOpenedID = data['tradeOpenedID'];
        }

        if (data['tradeReducedID'] !== undefined) {
            this.tradeReducedID = data['tradeReducedID'];
        }

        if (data['tradeClosedIDs'] !== undefined) {
            this.tradeClosedIDs = data['tradeClosedIDs'];
        }

        if (data['cancellingTransactionID'] !== undefined) {
            this.cancellingTransactionID = data['cancellingTransactionID'];
        }

        if (data['cancelledTime'] !== undefined) {
            this.cancelledTime = data['cancelledTime'];
        }

    }
}

const FixedPriceOrder_Properties = [
    new Property(
        'id',
        "Order ID",
        "The Order's identifier, unique within the Order's Account.",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'createTime',
        "Create Time",
        "The time when the Order was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'state',
        "State",
        "The current state of the Order.",
        'primitive',
        'order.OrderState'
    ),
    new Property(
        'clientExtensions',
        "Client Extensions",
        "The client extensions of the Order. Do not set, modify, or delete clientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'type',
        "Type",
        "The type of the Order. Always set to \"FIXED_PRICE\" for Fixed Price Orders.",
        'primitive',
        'order.OrderType'
    ),
    new Property(
        'instrument',
        "Instrument",
        "The Fixed Price Order's Instrument.",
        'primitive',
        'primitives.InstrumentName'
    ),
    new Property(
        'units',
        "Amount",
        "The quantity requested to be filled by the Fixed Price Order. A posititive number of units results in a long Order, and a negative number of units results in a short Order.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'price',
        "Price",
        "The price specified for the Fixed Price Order. This price is the exact price that the Fixed Price Order will be filled at.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'positionFill',
        "Position Fill",
        "Specification of how Positions in the Account are modified when the Order is filled.",
        'primitive',
        'order.OrderPositionFill'
    ),
    new Property(
        'tradeState',
        "TradeState",
        "The state that the trade resulting from the Fixed Price Order should be set to.",
        'primitive',
        'string'
    ),
    new Property(
        'takeProfitOnFill',
        "Take Profit On Fill",
        "TakeProfitDetails specifies the details of a Take Profit Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Take Profit, or when a Trade's dependent Take Profit Order is modified directly through the Trade.",
        'object',
        'transaction.TakeProfitDetails'
    ),
    new Property(
        'stopLossOnFill',
        "Stop Loss On Fill",
        "StopLossDetails specifies the details of a Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Stop Loss, or when a Trade's dependent Stop Loss Order is modified directly through the Trade.",
        'object',
        'transaction.StopLossDetails'
    ),
    new Property(
        'trailingStopLossOnFill',
        "Trailing Stop Loss On Fill",
        "TrailingStopLossDetails specifies the details of a Trailing Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Trailing Stop Loss, or when a Trade's dependent Trailing Stop Loss Order is modified directly through the Trade.",
        'object',
        'transaction.TrailingStopLossDetails'
    ),
    new Property(
        'tradeClientExtensions',
        "Trade Client Extensions",
        "Client Extensions to add to the Trade created when the Order is filled (if such a Trade is created). Do not set, modify, or delete tradeClientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'fillingTransactionID',
        "Filling Transaction ID",
        "ID of the Transaction that filled this Order (only provided when the Order's state is FILLED)",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'filledTime',
        "Filled Time",
        "Date/time when the Order was filled (only provided when the Order's state is FILLED)",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'tradeOpenedID',
        "Trade Opened ID",
        "Trade ID of Trade opened when the Order was filled (only provided when the Order's state is FILLED and a Trade was opened as a result of the fill)",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'tradeReducedID',
        "Trade Reduced ID",
        "Trade ID of Trade reduced when the Order was filled (only provided when the Order's state is FILLED and a Trade was reduced as a result of the fill)",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'tradeClosedIDs',
        "Trade Closed IDs",
        "Trade IDs of Trades closed when the Order was filled (only provided when the Order's state is FILLED and one or more Trades were closed as a result of the fill)",
        'array_primitive',
        'TradeID'
    ),
    new Property(
        'cancellingTransactionID',
        "Cancelling Transction ID",
        "ID of the Transaction that cancelled the Order (only provided when the Order's state is CANCELLED)",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'cancelledTime',
        "Cancelled Time",
        "Date/time when the Order was cancelled (only provided when the state of the Order is CANCELLED)",
        'primitive',
        'primitives.DateTime'
    ),
];

class FixedPriceOrder extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "{units} units of {instrument} @ {price}";

        this._nameFormat = "Fixed Price Order {id}";

        this._properties = FixedPriceOrder_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['createTime'] !== undefined) {
            this.createTime = data['createTime'];
        }

        if (data['state'] !== undefined) {
            this.state = data['state'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new transaction.ClientExtensions(data['clientExtensions']);
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "FIXED_PRICE";
        }

        if (data['instrument'] !== undefined) {
            this.instrument = data['instrument'];
        }

        if (data['units'] !== undefined) {
            this.units = data['units'];
        }

        if (data['price'] !== undefined) {
            this.price = data['price'];
        }

        if (data['positionFill'] !== undefined) {
            this.positionFill = data['positionFill'];
        }
        else {
            this.positionFill = "DEFAULT";
        }

        if (data['tradeState'] !== undefined) {
            this.tradeState = data['tradeState'];
        }

        if (data['takeProfitOnFill'] !== undefined) {
            this.takeProfitOnFill = new transaction.TakeProfitDetails(data['takeProfitOnFill']);
        }

        if (data['stopLossOnFill'] !== undefined) {
            this.stopLossOnFill = new transaction.StopLossDetails(data['stopLossOnFill']);
        }

        if (data['trailingStopLossOnFill'] !== undefined) {
            this.trailingStopLossOnFill = new transaction.TrailingStopLossDetails(data['trailingStopLossOnFill']);
        }

        if (data['tradeClientExtensions'] !== undefined) {
            this.tradeClientExtensions = new transaction.ClientExtensions(data['tradeClientExtensions']);
        }

        if (data['fillingTransactionID'] !== undefined) {
            this.fillingTransactionID = data['fillingTransactionID'];
        }

        if (data['filledTime'] !== undefined) {
            this.filledTime = data['filledTime'];
        }

        if (data['tradeOpenedID'] !== undefined) {
            this.tradeOpenedID = data['tradeOpenedID'];
        }

        if (data['tradeReducedID'] !== undefined) {
            this.tradeReducedID = data['tradeReducedID'];
        }

        if (data['tradeClosedIDs'] !== undefined) {
            this.tradeClosedIDs = data['tradeClosedIDs'];
        }

        if (data['cancellingTransactionID'] !== undefined) {
            this.cancellingTransactionID = data['cancellingTransactionID'];
        }

        if (data['cancelledTime'] !== undefined) {
            this.cancelledTime = data['cancelledTime'];
        }

    }
}

const LimitOrder_Properties = [
    new Property(
        'id',
        "Order ID",
        "The Order's identifier, unique within the Order's Account.",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'createTime',
        "Create Time",
        "The time when the Order was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'state',
        "State",
        "The current state of the Order.",
        'primitive',
        'order.OrderState'
    ),
    new Property(
        'clientExtensions',
        "Client Extensions",
        "The client extensions of the Order. Do not set, modify, or delete clientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'type',
        "Type",
        "The type of the Order. Always set to \"LIMIT\" for Limit Orders.",
        'primitive',
        'order.OrderType'
    ),
    new Property(
        'instrument',
        "Instrument",
        "The Limit Order's Instrument.",
        'primitive',
        'primitives.InstrumentName'
    ),
    new Property(
        'units',
        "Amount",
        "The quantity requested to be filled by the Limit Order. A posititive number of units results in a long Order, and a negative number of units results in a short Order.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'price',
        "Price",
        "The price threshold specified for the Limit Order. The Limit Order will only be filled by a market price that is equal to or better than this price.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'timeInForce',
        "Time In Force",
        "The time-in-force requested for the Limit Order.",
        'primitive',
        'order.TimeInForce'
    ),
    new Property(
        'gtdTime',
        "GTD Time",
        "The date/time when the Limit Order will be cancelled if its timeInForce is \"GTD\".",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'positionFill',
        "Position Fill",
        "Specification of how Positions in the Account are modified when the Order is filled.",
        'primitive',
        'order.OrderPositionFill'
    ),
    new Property(
        'triggerCondition',
        "Trigger Condition",
        "Specification of which price component should be used when determining if an Order should be triggered and filled. This allows Orders to be triggered based on the bid, ask, mid, default (ask for buy, bid for sell) or inverse (ask for sell, bid for buy) price depending on the desired behaviour. Orders are always filled using their default price component.\nThis feature is only provided through the REST API. Clients who choose to specify a non-default trigger condition will not see it reflected in any of OANDA's proprietary or partner trading platforms, their transaction history or their account statements. OANDA platforms always assume that an Order's trigger condition is set to the default value when indicating the distance from an Order's trigger price, and will always provide the default trigger condition when creating or modifying an Order.\nA special restriction applies when creating a guaranteed Stop Loss Order. In this case the TriggerCondition value must either be \"DEFAULT\", or the \"natural\" trigger side \"DEFAULT\" results in. So for a Stop Loss Order for a long trade valid values are \"DEFAULT\" and \"BID\", and for short trades \"DEFAULT\" and \"ASK\" are valid.",
        'primitive',
        'order.OrderTriggerCondition'
    ),
    new Property(
        'takeProfitOnFill',
        "Take Profit On Fill",
        "TakeProfitDetails specifies the details of a Take Profit Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Take Profit, or when a Trade's dependent Take Profit Order is modified directly through the Trade.",
        'object',
        'transaction.TakeProfitDetails'
    ),
    new Property(
        'stopLossOnFill',
        "Stop Loss On Fill",
        "StopLossDetails specifies the details of a Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Stop Loss, or when a Trade's dependent Stop Loss Order is modified directly through the Trade.",
        'object',
        'transaction.StopLossDetails'
    ),
    new Property(
        'trailingStopLossOnFill',
        "Trailing Stop Loss On Fill",
        "TrailingStopLossDetails specifies the details of a Trailing Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Trailing Stop Loss, or when a Trade's dependent Trailing Stop Loss Order is modified directly through the Trade.",
        'object',
        'transaction.TrailingStopLossDetails'
    ),
    new Property(
        'tradeClientExtensions',
        "Trade Client Extensions",
        "Client Extensions to add to the Trade created when the Order is filled (if such a Trade is created). Do not set, modify, or delete tradeClientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'fillingTransactionID',
        "Filling Transaction ID",
        "ID of the Transaction that filled this Order (only provided when the Order's state is FILLED)",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'filledTime',
        "Filled Time",
        "Date/time when the Order was filled (only provided when the Order's state is FILLED)",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'tradeOpenedID',
        "Trade Opened ID",
        "Trade ID of Trade opened when the Order was filled (only provided when the Order's state is FILLED and a Trade was opened as a result of the fill)",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'tradeReducedID',
        "Trade Reduced ID",
        "Trade ID of Trade reduced when the Order was filled (only provided when the Order's state is FILLED and a Trade was reduced as a result of the fill)",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'tradeClosedIDs',
        "Trade Closed IDs",
        "Trade IDs of Trades closed when the Order was filled (only provided when the Order's state is FILLED and one or more Trades were closed as a result of the fill)",
        'array_primitive',
        'TradeID'
    ),
    new Property(
        'cancellingTransactionID',
        "Cancelling Transction ID",
        "ID of the Transaction that cancelled the Order (only provided when the Order's state is CANCELLED)",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'cancelledTime',
        "Cancelled Time",
        "Date/time when the Order was cancelled (only provided when the state of the Order is CANCELLED)",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'replacesOrderID',
        "Replaces Order ID",
        "The ID of the Order that was replaced by this Order (only provided if this Order was created as part of a cancel/replace).",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'replacedByOrderID',
        "Replaced by Order ID",
        "The ID of the Order that replaced this Order (only provided if this Order was cancelled as part of a cancel/replace).",
        'primitive',
        'order.OrderID'
    ),
];

class LimitOrder extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "{units} units of {instrument} @ {price}";

        this._nameFormat = "Limit Order {id}";

        this._properties = LimitOrder_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['createTime'] !== undefined) {
            this.createTime = data['createTime'];
        }

        if (data['state'] !== undefined) {
            this.state = data['state'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new transaction.ClientExtensions(data['clientExtensions']);
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "LIMIT";
        }

        if (data['instrument'] !== undefined) {
            this.instrument = data['instrument'];
        }

        if (data['units'] !== undefined) {
            this.units = data['units'];
        }

        if (data['price'] !== undefined) {
            this.price = data['price'];
        }

        if (data['timeInForce'] !== undefined) {
            this.timeInForce = data['timeInForce'];
        }
        else {
            this.timeInForce = "GTC";
        }

        if (data['gtdTime'] !== undefined) {
            this.gtdTime = data['gtdTime'];
        }

        if (data['positionFill'] !== undefined) {
            this.positionFill = data['positionFill'];
        }
        else {
            this.positionFill = "DEFAULT";
        }

        if (data['triggerCondition'] !== undefined) {
            this.triggerCondition = data['triggerCondition'];
        }
        else {
            this.triggerCondition = "DEFAULT";
        }

        if (data['takeProfitOnFill'] !== undefined) {
            this.takeProfitOnFill = new transaction.TakeProfitDetails(data['takeProfitOnFill']);
        }

        if (data['stopLossOnFill'] !== undefined) {
            this.stopLossOnFill = new transaction.StopLossDetails(data['stopLossOnFill']);
        }

        if (data['trailingStopLossOnFill'] !== undefined) {
            this.trailingStopLossOnFill = new transaction.TrailingStopLossDetails(data['trailingStopLossOnFill']);
        }

        if (data['tradeClientExtensions'] !== undefined) {
            this.tradeClientExtensions = new transaction.ClientExtensions(data['tradeClientExtensions']);
        }

        if (data['fillingTransactionID'] !== undefined) {
            this.fillingTransactionID = data['fillingTransactionID'];
        }

        if (data['filledTime'] !== undefined) {
            this.filledTime = data['filledTime'];
        }

        if (data['tradeOpenedID'] !== undefined) {
            this.tradeOpenedID = data['tradeOpenedID'];
        }

        if (data['tradeReducedID'] !== undefined) {
            this.tradeReducedID = data['tradeReducedID'];
        }

        if (data['tradeClosedIDs'] !== undefined) {
            this.tradeClosedIDs = data['tradeClosedIDs'];
        }

        if (data['cancellingTransactionID'] !== undefined) {
            this.cancellingTransactionID = data['cancellingTransactionID'];
        }

        if (data['cancelledTime'] !== undefined) {
            this.cancelledTime = data['cancelledTime'];
        }

        if (data['replacesOrderID'] !== undefined) {
            this.replacesOrderID = data['replacesOrderID'];
        }

        if (data['replacedByOrderID'] !== undefined) {
            this.replacedByOrderID = data['replacedByOrderID'];
        }

    }
}

const StopOrder_Properties = [
    new Property(
        'id',
        "Order ID",
        "The Order's identifier, unique within the Order's Account.",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'createTime',
        "Create Time",
        "The time when the Order was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'state',
        "State",
        "The current state of the Order.",
        'primitive',
        'order.OrderState'
    ),
    new Property(
        'clientExtensions',
        "Client Extensions",
        "The client extensions of the Order. Do not set, modify, or delete clientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'type',
        "Type",
        "The type of the Order. Always set to \"STOP\" for Stop Orders.",
        'primitive',
        'order.OrderType'
    ),
    new Property(
        'instrument',
        "Instrument",
        "The Stop Order's Instrument.",
        'primitive',
        'primitives.InstrumentName'
    ),
    new Property(
        'units',
        "Amount",
        "The quantity requested to be filled by the Stop Order. A posititive number of units results in a long Order, and a negative number of units results in a short Order.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'price',
        "Price",
        "The price threshold specified for the Stop Order. The Stop Order will only be filled by a market price that is equal to or worse than this price.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'priceBound',
        "Price Bound",
        "The worst market price that may be used to fill this Stop Order. If the market gaps and crosses through both the price and the priceBound, the Stop Order will be cancelled instead of being filled.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'timeInForce',
        "Time In Force",
        "The time-in-force requested for the Stop Order.",
        'primitive',
        'order.TimeInForce'
    ),
    new Property(
        'gtdTime',
        "GTD Time",
        "The date/time when the Stop Order will be cancelled if its timeInForce is \"GTD\".",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'positionFill',
        "Position Fill",
        "Specification of how Positions in the Account are modified when the Order is filled.",
        'primitive',
        'order.OrderPositionFill'
    ),
    new Property(
        'triggerCondition',
        "Trigger Condition",
        "Specification of which price component should be used when determining if an Order should be triggered and filled. This allows Orders to be triggered based on the bid, ask, mid, default (ask for buy, bid for sell) or inverse (ask for sell, bid for buy) price depending on the desired behaviour. Orders are always filled using their default price component.\nThis feature is only provided through the REST API. Clients who choose to specify a non-default trigger condition will not see it reflected in any of OANDA's proprietary or partner trading platforms, their transaction history or their account statements. OANDA platforms always assume that an Order's trigger condition is set to the default value when indicating the distance from an Order's trigger price, and will always provide the default trigger condition when creating or modifying an Order.\nA special restriction applies when creating a guaranteed Stop Loss Order. In this case the TriggerCondition value must either be \"DEFAULT\", or the \"natural\" trigger side \"DEFAULT\" results in. So for a Stop Loss Order for a long trade valid values are \"DEFAULT\" and \"BID\", and for short trades \"DEFAULT\" and \"ASK\" are valid.",
        'primitive',
        'order.OrderTriggerCondition'
    ),
    new Property(
        'takeProfitOnFill',
        "Take Profit On Fill",
        "TakeProfitDetails specifies the details of a Take Profit Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Take Profit, or when a Trade's dependent Take Profit Order is modified directly through the Trade.",
        'object',
        'transaction.TakeProfitDetails'
    ),
    new Property(
        'stopLossOnFill',
        "Stop Loss On Fill",
        "StopLossDetails specifies the details of a Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Stop Loss, or when a Trade's dependent Stop Loss Order is modified directly through the Trade.",
        'object',
        'transaction.StopLossDetails'
    ),
    new Property(
        'trailingStopLossOnFill',
        "Trailing Stop Loss On Fill",
        "TrailingStopLossDetails specifies the details of a Trailing Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Trailing Stop Loss, or when a Trade's dependent Trailing Stop Loss Order is modified directly through the Trade.",
        'object',
        'transaction.TrailingStopLossDetails'
    ),
    new Property(
        'tradeClientExtensions',
        "Trade Client Extensions",
        "Client Extensions to add to the Trade created when the Order is filled (if such a Trade is created). Do not set, modify, or delete tradeClientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'fillingTransactionID',
        "Filling Transaction ID",
        "ID of the Transaction that filled this Order (only provided when the Order's state is FILLED)",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'filledTime',
        "Filled Time",
        "Date/time when the Order was filled (only provided when the Order's state is FILLED)",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'tradeOpenedID',
        "Trade Opened ID",
        "Trade ID of Trade opened when the Order was filled (only provided when the Order's state is FILLED and a Trade was opened as a result of the fill)",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'tradeReducedID',
        "Trade Reduced ID",
        "Trade ID of Trade reduced when the Order was filled (only provided when the Order's state is FILLED and a Trade was reduced as a result of the fill)",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'tradeClosedIDs',
        "Trade Closed IDs",
        "Trade IDs of Trades closed when the Order was filled (only provided when the Order's state is FILLED and one or more Trades were closed as a result of the fill)",
        'array_primitive',
        'TradeID'
    ),
    new Property(
        'cancellingTransactionID',
        "Cancelling Transction ID",
        "ID of the Transaction that cancelled the Order (only provided when the Order's state is CANCELLED)",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'cancelledTime',
        "Cancelled Time",
        "Date/time when the Order was cancelled (only provided when the state of the Order is CANCELLED)",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'replacesOrderID',
        "Replaces Order ID",
        "The ID of the Order that was replaced by this Order (only provided if this Order was created as part of a cancel/replace).",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'replacedByOrderID',
        "Replaced by Order ID",
        "The ID of the Order that replaced this Order (only provided if this Order was cancelled as part of a cancel/replace).",
        'primitive',
        'order.OrderID'
    ),
];

class StopOrder extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "{units} units of {instrument} @ {price}";

        this._nameFormat = "Stop Order {id}";

        this._properties = StopOrder_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['createTime'] !== undefined) {
            this.createTime = data['createTime'];
        }

        if (data['state'] !== undefined) {
            this.state = data['state'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new transaction.ClientExtensions(data['clientExtensions']);
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "STOP";
        }

        if (data['instrument'] !== undefined) {
            this.instrument = data['instrument'];
        }

        if (data['units'] !== undefined) {
            this.units = data['units'];
        }

        if (data['price'] !== undefined) {
            this.price = data['price'];
        }

        if (data['priceBound'] !== undefined) {
            this.priceBound = data['priceBound'];
        }

        if (data['timeInForce'] !== undefined) {
            this.timeInForce = data['timeInForce'];
        }
        else {
            this.timeInForce = "GTC";
        }

        if (data['gtdTime'] !== undefined) {
            this.gtdTime = data['gtdTime'];
        }

        if (data['positionFill'] !== undefined) {
            this.positionFill = data['positionFill'];
        }
        else {
            this.positionFill = "DEFAULT";
        }

        if (data['triggerCondition'] !== undefined) {
            this.triggerCondition = data['triggerCondition'];
        }
        else {
            this.triggerCondition = "DEFAULT";
        }

        if (data['takeProfitOnFill'] !== undefined) {
            this.takeProfitOnFill = new transaction.TakeProfitDetails(data['takeProfitOnFill']);
        }

        if (data['stopLossOnFill'] !== undefined) {
            this.stopLossOnFill = new transaction.StopLossDetails(data['stopLossOnFill']);
        }

        if (data['trailingStopLossOnFill'] !== undefined) {
            this.trailingStopLossOnFill = new transaction.TrailingStopLossDetails(data['trailingStopLossOnFill']);
        }

        if (data['tradeClientExtensions'] !== undefined) {
            this.tradeClientExtensions = new transaction.ClientExtensions(data['tradeClientExtensions']);
        }

        if (data['fillingTransactionID'] !== undefined) {
            this.fillingTransactionID = data['fillingTransactionID'];
        }

        if (data['filledTime'] !== undefined) {
            this.filledTime = data['filledTime'];
        }

        if (data['tradeOpenedID'] !== undefined) {
            this.tradeOpenedID = data['tradeOpenedID'];
        }

        if (data['tradeReducedID'] !== undefined) {
            this.tradeReducedID = data['tradeReducedID'];
        }

        if (data['tradeClosedIDs'] !== undefined) {
            this.tradeClosedIDs = data['tradeClosedIDs'];
        }

        if (data['cancellingTransactionID'] !== undefined) {
            this.cancellingTransactionID = data['cancellingTransactionID'];
        }

        if (data['cancelledTime'] !== undefined) {
            this.cancelledTime = data['cancelledTime'];
        }

        if (data['replacesOrderID'] !== undefined) {
            this.replacesOrderID = data['replacesOrderID'];
        }

        if (data['replacedByOrderID'] !== undefined) {
            this.replacedByOrderID = data['replacedByOrderID'];
        }

    }
}

const MarketIfTouchedOrder_Properties = [
    new Property(
        'id',
        "Order ID",
        "The Order's identifier, unique within the Order's Account.",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'createTime',
        "Create Time",
        "The time when the Order was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'state',
        "State",
        "The current state of the Order.",
        'primitive',
        'order.OrderState'
    ),
    new Property(
        'clientExtensions',
        "Client Extensions",
        "The client extensions of the Order. Do not set, modify, or delete clientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'type',
        "Type",
        "The type of the Order. Always set to \"MARKET_IF_TOUCHED\" for Market If Touched Orders.",
        'primitive',
        'order.OrderType'
    ),
    new Property(
        'instrument',
        "Instrument",
        "The MarketIfTouched Order's Instrument.",
        'primitive',
        'primitives.InstrumentName'
    ),
    new Property(
        'units',
        "Amount",
        "The quantity requested to be filled by the MarketIfTouched Order. A posititive number of units results in a long Order, and a negative number of units results in a short Order.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'price',
        "Price",
        "The price threshold specified for the MarketIfTouched Order. The MarketIfTouched Order will only be filled by a market price that crosses this price from the direction of the market price at the time when the Order was created (the initialMarketPrice). Depending on the value of the Order's price and initialMarketPrice, the MarketIfTouchedOrder will behave like a Limit or a Stop Order.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'priceBound',
        "Price Value",
        "The worst market price that may be used to fill this MarketIfTouched Order.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'timeInForce',
        "Time In Force",
        "The time-in-force requested for the MarketIfTouched Order. Restricted to \"GTC\", \"GFD\" and \"GTD\" for MarketIfTouched Orders.",
        'primitive',
        'order.TimeInForce'
    ),
    new Property(
        'gtdTime',
        "GTD Time",
        "The date/time when the MarketIfTouched Order will be cancelled if its timeInForce is \"GTD\".",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'positionFill',
        "Position Fill",
        "Specification of how Positions in the Account are modified when the Order is filled.",
        'primitive',
        'order.OrderPositionFill'
    ),
    new Property(
        'triggerCondition',
        "Trigger Condition",
        "Specification of which price component should be used when determining if an Order should be triggered and filled. This allows Orders to be triggered based on the bid, ask, mid, default (ask for buy, bid for sell) or inverse (ask for sell, bid for buy) price depending on the desired behaviour. Orders are always filled using their default price component.\nThis feature is only provided through the REST API. Clients who choose to specify a non-default trigger condition will not see it reflected in any of OANDA's proprietary or partner trading platforms, their transaction history or their account statements. OANDA platforms always assume that an Order's trigger condition is set to the default value when indicating the distance from an Order's trigger price, and will always provide the default trigger condition when creating or modifying an Order.\nA special restriction applies when creating a guaranteed Stop Loss Order. In this case the TriggerCondition value must either be \"DEFAULT\", or the \"natural\" trigger side \"DEFAULT\" results in. So for a Stop Loss Order for a long trade valid values are \"DEFAULT\" and \"BID\", and for short trades \"DEFAULT\" and \"ASK\" are valid.",
        'primitive',
        'order.OrderTriggerCondition'
    ),
    new Property(
        'initialMarketPrice',
        "Initial Market Price",
        "The Market price at the time when the MarketIfTouched Order was created.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'takeProfitOnFill',
        "Take Profit On Fill",
        "TakeProfitDetails specifies the details of a Take Profit Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Take Profit, or when a Trade's dependent Take Profit Order is modified directly through the Trade.",
        'object',
        'transaction.TakeProfitDetails'
    ),
    new Property(
        'stopLossOnFill',
        "Stop Loss On Fill",
        "StopLossDetails specifies the details of a Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Stop Loss, or when a Trade's dependent Stop Loss Order is modified directly through the Trade.",
        'object',
        'transaction.StopLossDetails'
    ),
    new Property(
        'trailingStopLossOnFill',
        "Trailing Stop Loss On Fill",
        "TrailingStopLossDetails specifies the details of a Trailing Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Trailing Stop Loss, or when a Trade's dependent Trailing Stop Loss Order is modified directly through the Trade.",
        'object',
        'transaction.TrailingStopLossDetails'
    ),
    new Property(
        'tradeClientExtensions',
        "Trade Client Extensions",
        "Client Extensions to add to the Trade created when the Order is filled (if such a Trade is created). Do not set, modify, or delete tradeClientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'fillingTransactionID',
        "Filling Transaction ID",
        "ID of the Transaction that filled this Order (only provided when the Order's state is FILLED)",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'filledTime',
        "Filled Time",
        "Date/time when the Order was filled (only provided when the Order's state is FILLED)",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'tradeOpenedID',
        "Trade Opened ID",
        "Trade ID of Trade opened when the Order was filled (only provided when the Order's state is FILLED and a Trade was opened as a result of the fill)",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'tradeReducedID',
        "Trade Reduced ID",
        "Trade ID of Trade reduced when the Order was filled (only provided when the Order's state is FILLED and a Trade was reduced as a result of the fill)",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'tradeClosedIDs',
        "Trade Closed IDs",
        "Trade IDs of Trades closed when the Order was filled (only provided when the Order's state is FILLED and one or more Trades were closed as a result of the fill)",
        'array_primitive',
        'TradeID'
    ),
    new Property(
        'cancellingTransactionID',
        "Cancelling Transction ID",
        "ID of the Transaction that cancelled the Order (only provided when the Order's state is CANCELLED)",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'cancelledTime',
        "Cancelled Time",
        "Date/time when the Order was cancelled (only provided when the state of the Order is CANCELLED)",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'replacesOrderID',
        "Replaces Order ID",
        "The ID of the Order that was replaced by this Order (only provided if this Order was created as part of a cancel/replace).",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'replacedByOrderID',
        "Replaced by Order ID",
        "The ID of the Order that replaced this Order (only provided if this Order was cancelled as part of a cancel/replace).",
        'primitive',
        'order.OrderID'
    ),
];

class MarketIfTouchedOrder extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "{units} units of {instrument} @ {price}";

        this._nameFormat = "MIT Order {id}";

        this._properties = MarketIfTouchedOrder_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['createTime'] !== undefined) {
            this.createTime = data['createTime'];
        }

        if (data['state'] !== undefined) {
            this.state = data['state'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new transaction.ClientExtensions(data['clientExtensions']);
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "MARKET_IF_TOUCHED";
        }

        if (data['instrument'] !== undefined) {
            this.instrument = data['instrument'];
        }

        if (data['units'] !== undefined) {
            this.units = data['units'];
        }

        if (data['price'] !== undefined) {
            this.price = data['price'];
        }

        if (data['priceBound'] !== undefined) {
            this.priceBound = data['priceBound'];
        }

        if (data['timeInForce'] !== undefined) {
            this.timeInForce = data['timeInForce'];
        }
        else {
            this.timeInForce = "GTC";
        }

        if (data['gtdTime'] !== undefined) {
            this.gtdTime = data['gtdTime'];
        }

        if (data['positionFill'] !== undefined) {
            this.positionFill = data['positionFill'];
        }
        else {
            this.positionFill = "DEFAULT";
        }

        if (data['triggerCondition'] !== undefined) {
            this.triggerCondition = data['triggerCondition'];
        }
        else {
            this.triggerCondition = "DEFAULT";
        }

        if (data['initialMarketPrice'] !== undefined) {
            this.initialMarketPrice = data['initialMarketPrice'];
        }

        if (data['takeProfitOnFill'] !== undefined) {
            this.takeProfitOnFill = new transaction.TakeProfitDetails(data['takeProfitOnFill']);
        }

        if (data['stopLossOnFill'] !== undefined) {
            this.stopLossOnFill = new transaction.StopLossDetails(data['stopLossOnFill']);
        }

        if (data['trailingStopLossOnFill'] !== undefined) {
            this.trailingStopLossOnFill = new transaction.TrailingStopLossDetails(data['trailingStopLossOnFill']);
        }

        if (data['tradeClientExtensions'] !== undefined) {
            this.tradeClientExtensions = new transaction.ClientExtensions(data['tradeClientExtensions']);
        }

        if (data['fillingTransactionID'] !== undefined) {
            this.fillingTransactionID = data['fillingTransactionID'];
        }

        if (data['filledTime'] !== undefined) {
            this.filledTime = data['filledTime'];
        }

        if (data['tradeOpenedID'] !== undefined) {
            this.tradeOpenedID = data['tradeOpenedID'];
        }

        if (data['tradeReducedID'] !== undefined) {
            this.tradeReducedID = data['tradeReducedID'];
        }

        if (data['tradeClosedIDs'] !== undefined) {
            this.tradeClosedIDs = data['tradeClosedIDs'];
        }

        if (data['cancellingTransactionID'] !== undefined) {
            this.cancellingTransactionID = data['cancellingTransactionID'];
        }

        if (data['cancelledTime'] !== undefined) {
            this.cancelledTime = data['cancelledTime'];
        }

        if (data['replacesOrderID'] !== undefined) {
            this.replacesOrderID = data['replacesOrderID'];
        }

        if (data['replacedByOrderID'] !== undefined) {
            this.replacedByOrderID = data['replacedByOrderID'];
        }

    }
}

const TakeProfitOrder_Properties = [
    new Property(
        'id',
        "Order ID",
        "The Order's identifier, unique within the Order's Account.",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'createTime',
        "Create Time",
        "The time when the Order was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'state',
        "State",
        "The current state of the Order.",
        'primitive',
        'order.OrderState'
    ),
    new Property(
        'clientExtensions',
        "Client Extensions",
        "The client extensions of the Order. Do not set, modify, or delete clientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'type',
        "Type",
        "The type of the Order. Always set to \"TAKE_PROFIT\" for Take Profit Orders.",
        'primitive',
        'order.OrderType'
    ),
    new Property(
        'tradeID',
        "Trade ID",
        "The ID of the Trade to close when the price threshold is breached.",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'clientTradeID',
        "Client Trade ID",
        "The client ID of the Trade to be closed when the price threshold is breached.",
        'primitive',
        'transaction.ClientID'
    ),
    new Property(
        'price',
        "Price",
        "The price threshold specified for the TakeProfit Order. The associated Trade will be closed by a market price that is equal to or better than this threshold.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'timeInForce',
        "Time In Force",
        "The time-in-force requested for the TakeProfit Order. Restricted to \"GTC\", \"GFD\" and \"GTD\" for TakeProfit Orders.",
        'primitive',
        'order.TimeInForce'
    ),
    new Property(
        'gtdTime',
        "GTD Time",
        "The date/time when the TakeProfit Order will be cancelled if its timeInForce is \"GTD\".",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'triggerCondition',
        "Trigger Condition",
        "Specification of which price component should be used when determining if an Order should be triggered and filled. This allows Orders to be triggered based on the bid, ask, mid, default (ask for buy, bid for sell) or inverse (ask for sell, bid for buy) price depending on the desired behaviour. Orders are always filled using their default price component.\nThis feature is only provided through the REST API. Clients who choose to specify a non-default trigger condition will not see it reflected in any of OANDA's proprietary or partner trading platforms, their transaction history or their account statements. OANDA platforms always assume that an Order's trigger condition is set to the default value when indicating the distance from an Order's trigger price, and will always provide the default trigger condition when creating or modifying an Order.\nA special restriction applies when creating a guaranteed Stop Loss Order. In this case the TriggerCondition value must either be \"DEFAULT\", or the \"natural\" trigger side \"DEFAULT\" results in. So for a Stop Loss Order for a long trade valid values are \"DEFAULT\" and \"BID\", and for short trades \"DEFAULT\" and \"ASK\" are valid.",
        'primitive',
        'order.OrderTriggerCondition'
    ),
    new Property(
        'fillingTransactionID',
        "Filling Transaction ID",
        "ID of the Transaction that filled this Order (only provided when the Order's state is FILLED)",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'filledTime',
        "Filled Time",
        "Date/time when the Order was filled (only provided when the Order's state is FILLED)",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'tradeOpenedID',
        "Trade Opened ID",
        "Trade ID of Trade opened when the Order was filled (only provided when the Order's state is FILLED and a Trade was opened as a result of the fill)",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'tradeReducedID',
        "Trade Reduced ID",
        "Trade ID of Trade reduced when the Order was filled (only provided when the Order's state is FILLED and a Trade was reduced as a result of the fill)",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'tradeClosedIDs',
        "Trade Closed IDs",
        "Trade IDs of Trades closed when the Order was filled (only provided when the Order's state is FILLED and one or more Trades were closed as a result of the fill)",
        'array_primitive',
        'TradeID'
    ),
    new Property(
        'cancellingTransactionID',
        "Cancelling Transction ID",
        "ID of the Transaction that cancelled the Order (only provided when the Order's state is CANCELLED)",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'cancelledTime',
        "Cancelled Time",
        "Date/time when the Order was cancelled (only provided when the state of the Order is CANCELLED)",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'replacesOrderID',
        "Replaces Order ID",
        "The ID of the Order that was replaced by this Order (only provided if this Order was created as part of a cancel/replace).",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'replacedByOrderID',
        "Replaced by Order ID",
        "The ID of the Order that replaced this Order (only provided if this Order was cancelled as part of a cancel/replace).",
        'primitive',
        'order.OrderID'
    ),
];

class TakeProfitOrder extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Take Profit for Trade {tradeID} @ {price}";

        this._nameFormat = "TP Order {id}";

        this._properties = TakeProfitOrder_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['createTime'] !== undefined) {
            this.createTime = data['createTime'];
        }

        if (data['state'] !== undefined) {
            this.state = data['state'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new transaction.ClientExtensions(data['clientExtensions']);
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "TAKE_PROFIT";
        }

        if (data['tradeID'] !== undefined) {
            this.tradeID = data['tradeID'];
        }

        if (data['clientTradeID'] !== undefined) {
            this.clientTradeID = data['clientTradeID'];
        }

        if (data['price'] !== undefined) {
            this.price = data['price'];
        }

        if (data['timeInForce'] !== undefined) {
            this.timeInForce = data['timeInForce'];
        }
        else {
            this.timeInForce = "GTC";
        }

        if (data['gtdTime'] !== undefined) {
            this.gtdTime = data['gtdTime'];
        }

        if (data['triggerCondition'] !== undefined) {
            this.triggerCondition = data['triggerCondition'];
        }
        else {
            this.triggerCondition = "DEFAULT";
        }

        if (data['fillingTransactionID'] !== undefined) {
            this.fillingTransactionID = data['fillingTransactionID'];
        }

        if (data['filledTime'] !== undefined) {
            this.filledTime = data['filledTime'];
        }

        if (data['tradeOpenedID'] !== undefined) {
            this.tradeOpenedID = data['tradeOpenedID'];
        }

        if (data['tradeReducedID'] !== undefined) {
            this.tradeReducedID = data['tradeReducedID'];
        }

        if (data['tradeClosedIDs'] !== undefined) {
            this.tradeClosedIDs = data['tradeClosedIDs'];
        }

        if (data['cancellingTransactionID'] !== undefined) {
            this.cancellingTransactionID = data['cancellingTransactionID'];
        }

        if (data['cancelledTime'] !== undefined) {
            this.cancelledTime = data['cancelledTime'];
        }

        if (data['replacesOrderID'] !== undefined) {
            this.replacesOrderID = data['replacesOrderID'];
        }

        if (data['replacedByOrderID'] !== undefined) {
            this.replacedByOrderID = data['replacedByOrderID'];
        }

    }
}

const StopLossOrder_Properties = [
    new Property(
        'id',
        "Order ID",
        "The Order's identifier, unique within the Order's Account.",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'createTime',
        "Create Time",
        "The time when the Order was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'state',
        "State",
        "The current state of the Order.",
        'primitive',
        'order.OrderState'
    ),
    new Property(
        'clientExtensions',
        "Client Extensions",
        "The client extensions of the Order. Do not set, modify, or delete clientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'type',
        "Type",
        "The type of the Order. Always set to \"STOP_LOSS\" for Stop Loss Orders.",
        'primitive',
        'order.OrderType'
    ),
    new Property(
        'guaranteedExecutionPremium',
        "Guaranteed Execution Fee",
        "The premium that will be charged if the Stop Loss Order is guaranteed and the Order is filled at the guaranteed price. It is in price units and is charged for each unit of the Trade.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'tradeID',
        "Trade ID",
        "The ID of the Trade to close when the price threshold is breached.",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'clientTradeID',
        "Client Trade ID",
        "The client ID of the Trade to be closed when the price threshold is breached.",
        'primitive',
        'transaction.ClientID'
    ),
    new Property(
        'price',
        "Price",
        "The price threshold specified for the Stop Loss Order. If the guaranteed flag is false, the associated Trade will be closed by a market price that is equal to or worse than this threshold. If the flag is true the associated Trade will be closed at this price.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'distance',
        "Price Distance",
        "Specifies the distance (in price units) from the Account's current price to use as the Stop Loss Order price. If the Trade is short the Instrument's bid price is used, and for long Trades the ask is used.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'timeInForce',
        "Time In Force",
        "The time-in-force requested for the StopLoss Order. Restricted to \"GTC\", \"GFD\" and \"GTD\" for StopLoss Orders.",
        'primitive',
        'order.TimeInForce'
    ),
    new Property(
        'gtdTime',
        "GTD Time",
        "The date/time when the StopLoss Order will be cancelled if its timeInForce is \"GTD\".",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'triggerCondition',
        "Trigger Condition",
        "Specification of which price component should be used when determining if an Order should be triggered and filled. This allows Orders to be triggered based on the bid, ask, mid, default (ask for buy, bid for sell) or inverse (ask for sell, bid for buy) price depending on the desired behaviour. Orders are always filled using their default price component.\nThis feature is only provided through the REST API. Clients who choose to specify a non-default trigger condition will not see it reflected in any of OANDA's proprietary or partner trading platforms, their transaction history or their account statements. OANDA platforms always assume that an Order's trigger condition is set to the default value when indicating the distance from an Order's trigger price, and will always provide the default trigger condition when creating or modifying an Order.\nA special restriction applies when creating a guaranteed Stop Loss Order. In this case the TriggerCondition value must either be \"DEFAULT\", or the \"natural\" trigger side \"DEFAULT\" results in. So for a Stop Loss Order for a long trade valid values are \"DEFAULT\" and \"BID\", and for short trades \"DEFAULT\" and \"ASK\" are valid.",
        'primitive',
        'order.OrderTriggerCondition'
    ),
    new Property(
        'guaranteed',
        "Guaranteed",
        "Flag indicating that the Stop Loss Order is guaranteed. The default value depends on the GuaranteedStopLossOrderMode of the account, if it is REQUIRED, the default will be true, for DISABLED or ENABLED the default is false.",
        'primitive',
        'boolean'
    ),
    new Property(
        'fillingTransactionID',
        "Filling Transaction ID",
        "ID of the Transaction that filled this Order (only provided when the Order's state is FILLED)",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'filledTime',
        "Filled Time",
        "Date/time when the Order was filled (only provided when the Order's state is FILLED)",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'tradeOpenedID',
        "Trade Opened ID",
        "Trade ID of Trade opened when the Order was filled (only provided when the Order's state is FILLED and a Trade was opened as a result of the fill)",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'tradeReducedID',
        "Trade Reduced ID",
        "Trade ID of Trade reduced when the Order was filled (only provided when the Order's state is FILLED and a Trade was reduced as a result of the fill)",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'tradeClosedIDs',
        "Trade Closed IDs",
        "Trade IDs of Trades closed when the Order was filled (only provided when the Order's state is FILLED and one or more Trades were closed as a result of the fill)",
        'array_primitive',
        'TradeID'
    ),
    new Property(
        'cancellingTransactionID',
        "Cancelling Transction ID",
        "ID of the Transaction that cancelled the Order (only provided when the Order's state is CANCELLED)",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'cancelledTime',
        "Cancelled Time",
        "Date/time when the Order was cancelled (only provided when the state of the Order is CANCELLED)",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'replacesOrderID',
        "Replaces Order ID",
        "The ID of the Order that was replaced by this Order (only provided if this Order was created as part of a cancel/replace).",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'replacedByOrderID',
        "Replaced by Order ID",
        "The ID of the Order that replaced this Order (only provided if this Order was cancelled as part of a cancel/replace).",
        'primitive',
        'order.OrderID'
    ),
];

class StopLossOrder extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Stop Loss for Trade {tradeID} @ {price}";

        this._nameFormat = "SL Order {id}";

        this._properties = StopLossOrder_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['createTime'] !== undefined) {
            this.createTime = data['createTime'];
        }

        if (data['state'] !== undefined) {
            this.state = data['state'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new transaction.ClientExtensions(data['clientExtensions']);
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "STOP_LOSS";
        }

        if (data['guaranteedExecutionPremium'] !== undefined) {
            this.guaranteedExecutionPremium = data['guaranteedExecutionPremium'];
        }

        if (data['tradeID'] !== undefined) {
            this.tradeID = data['tradeID'];
        }

        if (data['clientTradeID'] !== undefined) {
            this.clientTradeID = data['clientTradeID'];
        }

        if (data['price'] !== undefined) {
            this.price = data['price'];
        }

        if (data['distance'] !== undefined) {
            this.distance = data['distance'];
        }

        if (data['timeInForce'] !== undefined) {
            this.timeInForce = data['timeInForce'];
        }
        else {
            this.timeInForce = "GTC";
        }

        if (data['gtdTime'] !== undefined) {
            this.gtdTime = data['gtdTime'];
        }

        if (data['triggerCondition'] !== undefined) {
            this.triggerCondition = data['triggerCondition'];
        }
        else {
            this.triggerCondition = "DEFAULT";
        }

        if (data['guaranteed'] !== undefined) {
            this.guaranteed = data['guaranteed'];
        }

        if (data['fillingTransactionID'] !== undefined) {
            this.fillingTransactionID = data['fillingTransactionID'];
        }

        if (data['filledTime'] !== undefined) {
            this.filledTime = data['filledTime'];
        }

        if (data['tradeOpenedID'] !== undefined) {
            this.tradeOpenedID = data['tradeOpenedID'];
        }

        if (data['tradeReducedID'] !== undefined) {
            this.tradeReducedID = data['tradeReducedID'];
        }

        if (data['tradeClosedIDs'] !== undefined) {
            this.tradeClosedIDs = data['tradeClosedIDs'];
        }

        if (data['cancellingTransactionID'] !== undefined) {
            this.cancellingTransactionID = data['cancellingTransactionID'];
        }

        if (data['cancelledTime'] !== undefined) {
            this.cancelledTime = data['cancelledTime'];
        }

        if (data['replacesOrderID'] !== undefined) {
            this.replacesOrderID = data['replacesOrderID'];
        }

        if (data['replacedByOrderID'] !== undefined) {
            this.replacedByOrderID = data['replacedByOrderID'];
        }

    }
}

const TrailingStopLossOrder_Properties = [
    new Property(
        'id',
        "Order ID",
        "The Order's identifier, unique within the Order's Account.",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'createTime',
        "Create Time",
        "The time when the Order was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'state',
        "State",
        "The current state of the Order.",
        'primitive',
        'order.OrderState'
    ),
    new Property(
        'clientExtensions',
        "Client Extensions",
        "The client extensions of the Order. Do not set, modify, or delete clientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'type',
        "Type",
        "The type of the Order. Always set to \"TRAILING_STOP_LOSS\" for Trailing Stop Loss Orders.",
        'primitive',
        'order.OrderType'
    ),
    new Property(
        'tradeID',
        "Trade ID",
        "The ID of the Trade to close when the price threshold is breached.",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'clientTradeID',
        "Client Trade ID",
        "The client ID of the Trade to be closed when the price threshold is breached.",
        'primitive',
        'transaction.ClientID'
    ),
    new Property(
        'distance',
        "Price Distance",
        "The price distance (in price units) specified for the TrailingStopLoss Order.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'timeInForce',
        "Time In Force",
        "The time-in-force requested for the TrailingStopLoss Order. Restricted to \"GTC\", \"GFD\" and \"GTD\" for TrailingStopLoss Orders.",
        'primitive',
        'order.TimeInForce'
    ),
    new Property(
        'gtdTime',
        "GTD Time",
        "The date/time when the StopLoss Order will be cancelled if its timeInForce is \"GTD\".",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'triggerCondition',
        "Trigger Condition",
        "Specification of which price component should be used when determining if an Order should be triggered and filled. This allows Orders to be triggered based on the bid, ask, mid, default (ask for buy, bid for sell) or inverse (ask for sell, bid for buy) price depending on the desired behaviour. Orders are always filled using their default price component.\nThis feature is only provided through the REST API. Clients who choose to specify a non-default trigger condition will not see it reflected in any of OANDA's proprietary or partner trading platforms, their transaction history or their account statements. OANDA platforms always assume that an Order's trigger condition is set to the default value when indicating the distance from an Order's trigger price, and will always provide the default trigger condition when creating or modifying an Order.\nA special restriction applies when creating a guaranteed Stop Loss Order. In this case the TriggerCondition value must either be \"DEFAULT\", or the \"natural\" trigger side \"DEFAULT\" results in. So for a Stop Loss Order for a long trade valid values are \"DEFAULT\" and \"BID\", and for short trades \"DEFAULT\" and \"ASK\" are valid.",
        'primitive',
        'order.OrderTriggerCondition'
    ),
    new Property(
        'trailingStopValue',
        "Trailing Stop Loss Value",
        "The trigger price for the Trailing Stop Loss Order. The trailing stop value will trail (follow) the market price by the TSL order's configured \"distance\" as the market price moves in the winning direction. If the market price moves to a level that is equal to or worse than the trailing stop value, the order will be filled and the Trade will be closed.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'fillingTransactionID',
        "Filling Transaction ID",
        "ID of the Transaction that filled this Order (only provided when the Order's state is FILLED)",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'filledTime',
        "Filled Time",
        "Date/time when the Order was filled (only provided when the Order's state is FILLED)",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'tradeOpenedID',
        "Trade Opened ID",
        "Trade ID of Trade opened when the Order was filled (only provided when the Order's state is FILLED and a Trade was opened as a result of the fill)",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'tradeReducedID',
        "Trade Reduced ID",
        "Trade ID of Trade reduced when the Order was filled (only provided when the Order's state is FILLED and a Trade was reduced as a result of the fill)",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'tradeClosedIDs',
        "Trade Closed IDs",
        "Trade IDs of Trades closed when the Order was filled (only provided when the Order's state is FILLED and one or more Trades were closed as a result of the fill)",
        'array_primitive',
        'TradeID'
    ),
    new Property(
        'cancellingTransactionID',
        "Cancelling Transction ID",
        "ID of the Transaction that cancelled the Order (only provided when the Order's state is CANCELLED)",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'cancelledTime',
        "Cancelled Time",
        "Date/time when the Order was cancelled (only provided when the state of the Order is CANCELLED)",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'replacesOrderID',
        "Replaces Order ID",
        "The ID of the Order that was replaced by this Order (only provided if this Order was created as part of a cancel/replace).",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'replacedByOrderID',
        "Replaced by Order ID",
        "The ID of the Order that replaced this Order (only provided if this Order was cancelled as part of a cancel/replace).",
        'primitive',
        'order.OrderID'
    ),
];

class TrailingStopLossOrder extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Trailing Stop Loss for Trade {tradeID} @ {trailingStopValue}";

        this._nameFormat = "TSL Order {id}";

        this._properties = TrailingStopLossOrder_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['createTime'] !== undefined) {
            this.createTime = data['createTime'];
        }

        if (data['state'] !== undefined) {
            this.state = data['state'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new transaction.ClientExtensions(data['clientExtensions']);
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "TRAILING_STOP_LOSS";
        }

        if (data['tradeID'] !== undefined) {
            this.tradeID = data['tradeID'];
        }

        if (data['clientTradeID'] !== undefined) {
            this.clientTradeID = data['clientTradeID'];
        }

        if (data['distance'] !== undefined) {
            this.distance = data['distance'];
        }

        if (data['timeInForce'] !== undefined) {
            this.timeInForce = data['timeInForce'];
        }
        else {
            this.timeInForce = "GTC";
        }

        if (data['gtdTime'] !== undefined) {
            this.gtdTime = data['gtdTime'];
        }

        if (data['triggerCondition'] !== undefined) {
            this.triggerCondition = data['triggerCondition'];
        }
        else {
            this.triggerCondition = "DEFAULT";
        }

        if (data['trailingStopValue'] !== undefined) {
            this.trailingStopValue = data['trailingStopValue'];
        }

        if (data['fillingTransactionID'] !== undefined) {
            this.fillingTransactionID = data['fillingTransactionID'];
        }

        if (data['filledTime'] !== undefined) {
            this.filledTime = data['filledTime'];
        }

        if (data['tradeOpenedID'] !== undefined) {
            this.tradeOpenedID = data['tradeOpenedID'];
        }

        if (data['tradeReducedID'] !== undefined) {
            this.tradeReducedID = data['tradeReducedID'];
        }

        if (data['tradeClosedIDs'] !== undefined) {
            this.tradeClosedIDs = data['tradeClosedIDs'];
        }

        if (data['cancellingTransactionID'] !== undefined) {
            this.cancellingTransactionID = data['cancellingTransactionID'];
        }

        if (data['cancelledTime'] !== undefined) {
            this.cancelledTime = data['cancelledTime'];
        }

        if (data['replacesOrderID'] !== undefined) {
            this.replacesOrderID = data['replacesOrderID'];
        }

        if (data['replacedByOrderID'] !== undefined) {
            this.replacedByOrderID = data['replacedByOrderID'];
        }

    }
}

const OrderRequest_Properties = [
];

class OrderRequest extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "OrderRequest";

        this._properties = OrderRequest_Properties;

        data = data || {};

    }
}

const MarketOrderRequest_Properties = [
    new Property(
        'type',
        "Type",
        "The type of the Order to Create. Must be set to \"MARKET\" when creating a Market Order.",
        'primitive',
        'order.OrderType'
    ),
    new Property(
        'instrument',
        "Instrument",
        "The Market Order's Instrument.",
        'primitive',
        'primitives.InstrumentName'
    ),
    new Property(
        'units',
        "Amount",
        "The quantity requested to be filled by the Market Order. A posititive number of units results in a long Order, and a negative number of units results in a short Order.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'timeInForce',
        "Time In Force",
        "The time-in-force requested for the Market Order. Restricted to FOK or IOC for a MarketOrder.",
        'primitive',
        'order.TimeInForce'
    ),
    new Property(
        'priceBound',
        "Price Bound",
        "The worst price that the client is willing to have the Market Order filled at.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'positionFill',
        "Position Fill",
        "Specification of how Positions in the Account are modified when the Order is filled.",
        'primitive',
        'order.OrderPositionFill'
    ),
    new Property(
        'clientExtensions',
        "Client Extensions",
        "The client extensions to add to the Order. Do not set, modify, or delete clientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'takeProfitOnFill',
        "Take Profit On Fill",
        "TakeProfitDetails specifies the details of a Take Profit Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Take Profit, or when a Trade's dependent Take Profit Order is modified directly through the Trade.",
        'object',
        'transaction.TakeProfitDetails'
    ),
    new Property(
        'stopLossOnFill',
        "Stop Loss On Fill",
        "StopLossDetails specifies the details of a Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Stop Loss, or when a Trade's dependent Stop Loss Order is modified directly through the Trade.",
        'object',
        'transaction.StopLossDetails'
    ),
    new Property(
        'trailingStopLossOnFill',
        "Trailing Stop Loss On Fill",
        "TrailingStopLossDetails specifies the details of a Trailing Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Trailing Stop Loss, or when a Trade's dependent Trailing Stop Loss Order is modified directly through the Trade.",
        'object',
        'transaction.TrailingStopLossDetails'
    ),
    new Property(
        'tradeClientExtensions',
        "Trade Client Extensions",
        "Client Extensions to add to the Trade created when the Order is filled (if such a Trade is created). Do not set, modify, or delete tradeClientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
];

class MarketOrderRequest extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "{units} units of {instrument}";

        this._nameFormat = "Market Order Request";

        this._properties = MarketOrderRequest_Properties;

        data = data || {};

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "MARKET";
        }

        if (data['instrument'] !== undefined) {
            this.instrument = data['instrument'];
        }

        if (data['units'] !== undefined) {
            this.units = data['units'];
        }

        if (data['timeInForce'] !== undefined) {
            this.timeInForce = data['timeInForce'];
        }
        else {
            this.timeInForce = "FOK";
        }

        if (data['priceBound'] !== undefined) {
            this.priceBound = data['priceBound'];
        }

        if (data['positionFill'] !== undefined) {
            this.positionFill = data['positionFill'];
        }
        else {
            this.positionFill = "DEFAULT";
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new transaction.ClientExtensions(data['clientExtensions']);
        }

        if (data['takeProfitOnFill'] !== undefined) {
            this.takeProfitOnFill = new transaction.TakeProfitDetails(data['takeProfitOnFill']);
        }

        if (data['stopLossOnFill'] !== undefined) {
            this.stopLossOnFill = new transaction.StopLossDetails(data['stopLossOnFill']);
        }

        if (data['trailingStopLossOnFill'] !== undefined) {
            this.trailingStopLossOnFill = new transaction.TrailingStopLossDetails(data['trailingStopLossOnFill']);
        }

        if (data['tradeClientExtensions'] !== undefined) {
            this.tradeClientExtensions = new transaction.ClientExtensions(data['tradeClientExtensions']);
        }

    }
}

const LimitOrderRequest_Properties = [
    new Property(
        'type',
        "Type",
        "The type of the Order to Create. Must be set to \"LIMIT\" when creating a Market Order.",
        'primitive',
        'order.OrderType'
    ),
    new Property(
        'instrument',
        "Instrument",
        "The Limit Order's Instrument.",
        'primitive',
        'primitives.InstrumentName'
    ),
    new Property(
        'units',
        "Amount",
        "The quantity requested to be filled by the Limit Order. A posititive number of units results in a long Order, and a negative number of units results in a short Order.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'price',
        "Price",
        "The price threshold specified for the Limit Order. The Limit Order will only be filled by a market price that is equal to or better than this price.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'timeInForce',
        "Time In Force",
        "The time-in-force requested for the Limit Order.",
        'primitive',
        'order.TimeInForce'
    ),
    new Property(
        'gtdTime',
        "GTD Time",
        "The date/time when the Limit Order will be cancelled if its timeInForce is \"GTD\".",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'positionFill',
        "Position Fill",
        "Specification of how Positions in the Account are modified when the Order is filled.",
        'primitive',
        'order.OrderPositionFill'
    ),
    new Property(
        'triggerCondition',
        "Trigger Condition",
        "Specification of which price component should be used when determining if an Order should be triggered and filled. This allows Orders to be triggered based on the bid, ask, mid, default (ask for buy, bid for sell) or inverse (ask for sell, bid for buy) price depending on the desired behaviour. Orders are always filled using their default price component.\nThis feature is only provided through the REST API. Clients who choose to specify a non-default trigger condition will not see it reflected in any of OANDA's proprietary or partner trading platforms, their transaction history or their account statements. OANDA platforms always assume that an Order's trigger condition is set to the default value when indicating the distance from an Order's trigger price, and will always provide the default trigger condition when creating or modifying an Order.\nA special restriction applies when creating a guaranteed Stop Loss Order. In this case the TriggerCondition value must either be \"DEFAULT\", or the \"natural\" trigger side \"DEFAULT\" results in. So for a Stop Loss Order for a long trade valid values are \"DEFAULT\" and \"BID\", and for short trades \"DEFAULT\" and \"ASK\" are valid.",
        'primitive',
        'order.OrderTriggerCondition'
    ),
    new Property(
        'clientExtensions',
        "Client Extensions",
        "The client extensions to add to the Order. Do not set, modify, or delete clientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'takeProfitOnFill',
        "Take Profit On Fill",
        "TakeProfitDetails specifies the details of a Take Profit Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Take Profit, or when a Trade's dependent Take Profit Order is modified directly through the Trade.",
        'object',
        'transaction.TakeProfitDetails'
    ),
    new Property(
        'stopLossOnFill',
        "Stop Loss On Fill",
        "StopLossDetails specifies the details of a Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Stop Loss, or when a Trade's dependent Stop Loss Order is modified directly through the Trade.",
        'object',
        'transaction.StopLossDetails'
    ),
    new Property(
        'trailingStopLossOnFill',
        "Trailing Stop Loss On Fill",
        "TrailingStopLossDetails specifies the details of a Trailing Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Trailing Stop Loss, or when a Trade's dependent Trailing Stop Loss Order is modified directly through the Trade.",
        'object',
        'transaction.TrailingStopLossDetails'
    ),
    new Property(
        'tradeClientExtensions',
        "Trade Client Extensions",
        "Client Extensions to add to the Trade created when the Order is filled (if such a Trade is created). Do not set, modify, or delete tradeClientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
];

class LimitOrderRequest extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "{units} units of {instrument} @ {price}";

        this._nameFormat = "Limit Order Request";

        this._properties = LimitOrderRequest_Properties;

        data = data || {};

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "LIMIT";
        }

        if (data['instrument'] !== undefined) {
            this.instrument = data['instrument'];
        }

        if (data['units'] !== undefined) {
            this.units = data['units'];
        }

        if (data['price'] !== undefined) {
            this.price = data['price'];
        }

        if (data['timeInForce'] !== undefined) {
            this.timeInForce = data['timeInForce'];
        }
        else {
            this.timeInForce = "GTC";
        }

        if (data['gtdTime'] !== undefined) {
            this.gtdTime = data['gtdTime'];
        }

        if (data['positionFill'] !== undefined) {
            this.positionFill = data['positionFill'];
        }
        else {
            this.positionFill = "DEFAULT";
        }

        if (data['triggerCondition'] !== undefined) {
            this.triggerCondition = data['triggerCondition'];
        }
        else {
            this.triggerCondition = "DEFAULT";
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new transaction.ClientExtensions(data['clientExtensions']);
        }

        if (data['takeProfitOnFill'] !== undefined) {
            this.takeProfitOnFill = new transaction.TakeProfitDetails(data['takeProfitOnFill']);
        }

        if (data['stopLossOnFill'] !== undefined) {
            this.stopLossOnFill = new transaction.StopLossDetails(data['stopLossOnFill']);
        }

        if (data['trailingStopLossOnFill'] !== undefined) {
            this.trailingStopLossOnFill = new transaction.TrailingStopLossDetails(data['trailingStopLossOnFill']);
        }

        if (data['tradeClientExtensions'] !== undefined) {
            this.tradeClientExtensions = new transaction.ClientExtensions(data['tradeClientExtensions']);
        }

    }
}

const StopOrderRequest_Properties = [
    new Property(
        'type',
        "Type",
        "The type of the Order to Create. Must be set to \"STOP\" when creating a Stop Order.",
        'primitive',
        'order.OrderType'
    ),
    new Property(
        'instrument',
        "Instrument",
        "The Stop Order's Instrument.",
        'primitive',
        'primitives.InstrumentName'
    ),
    new Property(
        'units',
        "Amount",
        "The quantity requested to be filled by the Stop Order. A posititive number of units results in a long Order, and a negative number of units results in a short Order.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'price',
        "Price",
        "The price threshold specified for the Stop Order. The Stop Order will only be filled by a market price that is equal to or worse than this price.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'priceBound',
        "Price Bound",
        "The worst market price that may be used to fill this Stop Order. If the market gaps and crosses through both the price and the priceBound, the Stop Order will be cancelled instead of being filled.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'timeInForce',
        "Time In Force",
        "The time-in-force requested for the Stop Order.",
        'primitive',
        'order.TimeInForce'
    ),
    new Property(
        'gtdTime',
        "GTD Time",
        "The date/time when the Stop Order will be cancelled if its timeInForce is \"GTD\".",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'positionFill',
        "Position Fill",
        "Specification of how Positions in the Account are modified when the Order is filled.",
        'primitive',
        'order.OrderPositionFill'
    ),
    new Property(
        'triggerCondition',
        "Trigger Condition",
        "Specification of which price component should be used when determining if an Order should be triggered and filled. This allows Orders to be triggered based on the bid, ask, mid, default (ask for buy, bid for sell) or inverse (ask for sell, bid for buy) price depending on the desired behaviour. Orders are always filled using their default price component.\nThis feature is only provided through the REST API. Clients who choose to specify a non-default trigger condition will not see it reflected in any of OANDA's proprietary or partner trading platforms, their transaction history or their account statements. OANDA platforms always assume that an Order's trigger condition is set to the default value when indicating the distance from an Order's trigger price, and will always provide the default trigger condition when creating or modifying an Order.\nA special restriction applies when creating a guaranteed Stop Loss Order. In this case the TriggerCondition value must either be \"DEFAULT\", or the \"natural\" trigger side \"DEFAULT\" results in. So for a Stop Loss Order for a long trade valid values are \"DEFAULT\" and \"BID\", and for short trades \"DEFAULT\" and \"ASK\" are valid.",
        'primitive',
        'order.OrderTriggerCondition'
    ),
    new Property(
        'clientExtensions',
        "Client Extensions",
        "The client extensions to add to the Order. Do not set, modify, or delete clientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'takeProfitOnFill',
        "Take Profit On Fill",
        "TakeProfitDetails specifies the details of a Take Profit Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Take Profit, or when a Trade's dependent Take Profit Order is modified directly through the Trade.",
        'object',
        'transaction.TakeProfitDetails'
    ),
    new Property(
        'stopLossOnFill',
        "Stop Loss On Fill",
        "StopLossDetails specifies the details of a Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Stop Loss, or when a Trade's dependent Stop Loss Order is modified directly through the Trade.",
        'object',
        'transaction.StopLossDetails'
    ),
    new Property(
        'trailingStopLossOnFill',
        "Trailing Stop Loss On Fill",
        "TrailingStopLossDetails specifies the details of a Trailing Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Trailing Stop Loss, or when a Trade's dependent Trailing Stop Loss Order is modified directly through the Trade.",
        'object',
        'transaction.TrailingStopLossDetails'
    ),
    new Property(
        'tradeClientExtensions',
        "Trade Client Extensions",
        "Client Extensions to add to the Trade created when the Order is filled (if such a Trade is created). Do not set, modify, or delete tradeClientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
];

class StopOrderRequest extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "{units} units of {instrument} @ {price}";

        this._nameFormat = "Stop Order Request";

        this._properties = StopOrderRequest_Properties;

        data = data || {};

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "STOP";
        }

        if (data['instrument'] !== undefined) {
            this.instrument = data['instrument'];
        }

        if (data['units'] !== undefined) {
            this.units = data['units'];
        }

        if (data['price'] !== undefined) {
            this.price = data['price'];
        }

        if (data['priceBound'] !== undefined) {
            this.priceBound = data['priceBound'];
        }

        if (data['timeInForce'] !== undefined) {
            this.timeInForce = data['timeInForce'];
        }
        else {
            this.timeInForce = "GTC";
        }

        if (data['gtdTime'] !== undefined) {
            this.gtdTime = data['gtdTime'];
        }

        if (data['positionFill'] !== undefined) {
            this.positionFill = data['positionFill'];
        }
        else {
            this.positionFill = "DEFAULT";
        }

        if (data['triggerCondition'] !== undefined) {
            this.triggerCondition = data['triggerCondition'];
        }
        else {
            this.triggerCondition = "DEFAULT";
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new transaction.ClientExtensions(data['clientExtensions']);
        }

        if (data['takeProfitOnFill'] !== undefined) {
            this.takeProfitOnFill = new transaction.TakeProfitDetails(data['takeProfitOnFill']);
        }

        if (data['stopLossOnFill'] !== undefined) {
            this.stopLossOnFill = new transaction.StopLossDetails(data['stopLossOnFill']);
        }

        if (data['trailingStopLossOnFill'] !== undefined) {
            this.trailingStopLossOnFill = new transaction.TrailingStopLossDetails(data['trailingStopLossOnFill']);
        }

        if (data['tradeClientExtensions'] !== undefined) {
            this.tradeClientExtensions = new transaction.ClientExtensions(data['tradeClientExtensions']);
        }

    }
}

const MarketIfTouchedOrderRequest_Properties = [
    new Property(
        'type',
        "Type",
        "The type of the Order to Create. Must be set to \"MARKET_IF_TOUCHED\" when creating a Market If Touched Order.",
        'primitive',
        'order.OrderType'
    ),
    new Property(
        'instrument',
        "Instrument",
        "The MarketIfTouched Order's Instrument.",
        'primitive',
        'primitives.InstrumentName'
    ),
    new Property(
        'units',
        "Amount",
        "The quantity requested to be filled by the MarketIfTouched Order. A posititive number of units results in a long Order, and a negative number of units results in a short Order.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'price',
        "Price",
        "The price threshold specified for the MarketIfTouched Order. The MarketIfTouched Order will only be filled by a market price that crosses this price from the direction of the market price at the time when the Order was created (the initialMarketPrice). Depending on the value of the Order's price and initialMarketPrice, the MarketIfTouchedOrder will behave like a Limit or a Stop Order.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'priceBound',
        "Price Value",
        "The worst market price that may be used to fill this MarketIfTouched Order.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'timeInForce',
        "Time In Force",
        "The time-in-force requested for the MarketIfTouched Order. Restricted to \"GTC\", \"GFD\" and \"GTD\" for MarketIfTouched Orders.",
        'primitive',
        'order.TimeInForce'
    ),
    new Property(
        'gtdTime',
        "GTD Time",
        "The date/time when the MarketIfTouched Order will be cancelled if its timeInForce is \"GTD\".",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'positionFill',
        "Position Fill",
        "Specification of how Positions in the Account are modified when the Order is filled.",
        'primitive',
        'order.OrderPositionFill'
    ),
    new Property(
        'triggerCondition',
        "Trigger Condition",
        "Specification of which price component should be used when determining if an Order should be triggered and filled. This allows Orders to be triggered based on the bid, ask, mid, default (ask for buy, bid for sell) or inverse (ask for sell, bid for buy) price depending on the desired behaviour. Orders are always filled using their default price component.\nThis feature is only provided through the REST API. Clients who choose to specify a non-default trigger condition will not see it reflected in any of OANDA's proprietary or partner trading platforms, their transaction history or their account statements. OANDA platforms always assume that an Order's trigger condition is set to the default value when indicating the distance from an Order's trigger price, and will always provide the default trigger condition when creating or modifying an Order.\nA special restriction applies when creating a guaranteed Stop Loss Order. In this case the TriggerCondition value must either be \"DEFAULT\", or the \"natural\" trigger side \"DEFAULT\" results in. So for a Stop Loss Order for a long trade valid values are \"DEFAULT\" and \"BID\", and for short trades \"DEFAULT\" and \"ASK\" are valid.",
        'primitive',
        'order.OrderTriggerCondition'
    ),
    new Property(
        'clientExtensions',
        "Client Extensions",
        "The client extensions to add to the Order. Do not set, modify, or delete clientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'takeProfitOnFill',
        "Take Profit On Fill",
        "TakeProfitDetails specifies the details of a Take Profit Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Take Profit, or when a Trade's dependent Take Profit Order is modified directly through the Trade.",
        'object',
        'transaction.TakeProfitDetails'
    ),
    new Property(
        'stopLossOnFill',
        "Stop Loss On Fill",
        "StopLossDetails specifies the details of a Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Stop Loss, or when a Trade's dependent Stop Loss Order is modified directly through the Trade.",
        'object',
        'transaction.StopLossDetails'
    ),
    new Property(
        'trailingStopLossOnFill',
        "Trailing Stop Loss On Fill",
        "TrailingStopLossDetails specifies the details of a Trailing Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Trailing Stop Loss, or when a Trade's dependent Trailing Stop Loss Order is modified directly through the Trade.",
        'object',
        'transaction.TrailingStopLossDetails'
    ),
    new Property(
        'tradeClientExtensions',
        "Trade Client Extensions",
        "Client Extensions to add to the Trade created when the Order is filled (if such a Trade is created). Do not set, modify, or delete tradeClientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
];

class MarketIfTouchedOrderRequest extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "{units} units of {instrument} @ {price}";

        this._nameFormat = "MIT Order Request";

        this._properties = MarketIfTouchedOrderRequest_Properties;

        data = data || {};

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "MARKET_IF_TOUCHED";
        }

        if (data['instrument'] !== undefined) {
            this.instrument = data['instrument'];
        }

        if (data['units'] !== undefined) {
            this.units = data['units'];
        }

        if (data['price'] !== undefined) {
            this.price = data['price'];
        }

        if (data['priceBound'] !== undefined) {
            this.priceBound = data['priceBound'];
        }

        if (data['timeInForce'] !== undefined) {
            this.timeInForce = data['timeInForce'];
        }
        else {
            this.timeInForce = "GTC";
        }

        if (data['gtdTime'] !== undefined) {
            this.gtdTime = data['gtdTime'];
        }

        if (data['positionFill'] !== undefined) {
            this.positionFill = data['positionFill'];
        }
        else {
            this.positionFill = "DEFAULT";
        }

        if (data['triggerCondition'] !== undefined) {
            this.triggerCondition = data['triggerCondition'];
        }
        else {
            this.triggerCondition = "DEFAULT";
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new transaction.ClientExtensions(data['clientExtensions']);
        }

        if (data['takeProfitOnFill'] !== undefined) {
            this.takeProfitOnFill = new transaction.TakeProfitDetails(data['takeProfitOnFill']);
        }

        if (data['stopLossOnFill'] !== undefined) {
            this.stopLossOnFill = new transaction.StopLossDetails(data['stopLossOnFill']);
        }

        if (data['trailingStopLossOnFill'] !== undefined) {
            this.trailingStopLossOnFill = new transaction.TrailingStopLossDetails(data['trailingStopLossOnFill']);
        }

        if (data['tradeClientExtensions'] !== undefined) {
            this.tradeClientExtensions = new transaction.ClientExtensions(data['tradeClientExtensions']);
        }

    }
}

const TakeProfitOrderRequest_Properties = [
    new Property(
        'type',
        "Type",
        "The type of the Order to Create. Must be set to \"TAKE_PROFIT\" when creating a Take Profit Order.",
        'primitive',
        'order.OrderType'
    ),
    new Property(
        'tradeID',
        "Trade ID",
        "The ID of the Trade to close when the price threshold is breached.",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'clientTradeID',
        "Client Trade ID",
        "The client ID of the Trade to be closed when the price threshold is breached.",
        'primitive',
        'transaction.ClientID'
    ),
    new Property(
        'price',
        "Price",
        "The price threshold specified for the TakeProfit Order. The associated Trade will be closed by a market price that is equal to or better than this threshold.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'timeInForce',
        "Time In Force",
        "The time-in-force requested for the TakeProfit Order. Restricted to \"GTC\", \"GFD\" and \"GTD\" for TakeProfit Orders.",
        'primitive',
        'order.TimeInForce'
    ),
    new Property(
        'gtdTime',
        "GTD Time",
        "The date/time when the TakeProfit Order will be cancelled if its timeInForce is \"GTD\".",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'triggerCondition',
        "Trigger Condition",
        "Specification of which price component should be used when determining if an Order should be triggered and filled. This allows Orders to be triggered based on the bid, ask, mid, default (ask for buy, bid for sell) or inverse (ask for sell, bid for buy) price depending on the desired behaviour. Orders are always filled using their default price component.\nThis feature is only provided through the REST API. Clients who choose to specify a non-default trigger condition will not see it reflected in any of OANDA's proprietary or partner trading platforms, their transaction history or their account statements. OANDA platforms always assume that an Order's trigger condition is set to the default value when indicating the distance from an Order's trigger price, and will always provide the default trigger condition when creating or modifying an Order.\nA special restriction applies when creating a guaranteed Stop Loss Order. In this case the TriggerCondition value must either be \"DEFAULT\", or the \"natural\" trigger side \"DEFAULT\" results in. So for a Stop Loss Order for a long trade valid values are \"DEFAULT\" and \"BID\", and for short trades \"DEFAULT\" and \"ASK\" are valid.",
        'primitive',
        'order.OrderTriggerCondition'
    ),
    new Property(
        'clientExtensions',
        "Client Extensions",
        "The client extensions to add to the Order. Do not set, modify, or delete clientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
];

class TakeProfitOrderRequest extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Take Profit for Trade {tradeID} @ {price}";

        this._nameFormat = "TP Order Request";

        this._properties = TakeProfitOrderRequest_Properties;

        data = data || {};

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "TAKE_PROFIT";
        }

        if (data['tradeID'] !== undefined) {
            this.tradeID = data['tradeID'];
        }

        if (data['clientTradeID'] !== undefined) {
            this.clientTradeID = data['clientTradeID'];
        }

        if (data['price'] !== undefined) {
            this.price = data['price'];
        }

        if (data['timeInForce'] !== undefined) {
            this.timeInForce = data['timeInForce'];
        }
        else {
            this.timeInForce = "GTC";
        }

        if (data['gtdTime'] !== undefined) {
            this.gtdTime = data['gtdTime'];
        }

        if (data['triggerCondition'] !== undefined) {
            this.triggerCondition = data['triggerCondition'];
        }
        else {
            this.triggerCondition = "DEFAULT";
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new transaction.ClientExtensions(data['clientExtensions']);
        }

    }
}

const StopLossOrderRequest_Properties = [
    new Property(
        'type',
        "Type",
        "The type of the Order to Create. Must be set to \"STOP_LOSS\" when creating a Stop Loss Order.",
        'primitive',
        'order.OrderType'
    ),
    new Property(
        'tradeID',
        "Trade ID",
        "The ID of the Trade to close when the price threshold is breached.",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'clientTradeID',
        "Client Trade ID",
        "The client ID of the Trade to be closed when the price threshold is breached.",
        'primitive',
        'transaction.ClientID'
    ),
    new Property(
        'price',
        "Price",
        "The price threshold specified for the Stop Loss Order. If the guaranteed flag is false, the associated Trade will be closed by a market price that is equal to or worse than this threshold. If the flag is true the associated Trade will be closed at this price.",
        'primitive',
        'pricing_common.PriceValue'
    ),
    new Property(
        'distance',
        "Price Distance",
        "Specifies the distance (in price units) from the Account's current price to use as the Stop Loss Order price. If the Trade is short the Instrument's bid price is used, and for long Trades the ask is used.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'timeInForce',
        "Time In Force",
        "The time-in-force requested for the StopLoss Order. Restricted to \"GTC\", \"GFD\" and \"GTD\" for StopLoss Orders.",
        'primitive',
        'order.TimeInForce'
    ),
    new Property(
        'gtdTime',
        "GTD Time",
        "The date/time when the StopLoss Order will be cancelled if its timeInForce is \"GTD\".",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'triggerCondition',
        "Trigger Condition",
        "Specification of which price component should be used when determining if an Order should be triggered and filled. This allows Orders to be triggered based on the bid, ask, mid, default (ask for buy, bid for sell) or inverse (ask for sell, bid for buy) price depending on the desired behaviour. Orders are always filled using their default price component.\nThis feature is only provided through the REST API. Clients who choose to specify a non-default trigger condition will not see it reflected in any of OANDA's proprietary or partner trading platforms, their transaction history or their account statements. OANDA platforms always assume that an Order's trigger condition is set to the default value when indicating the distance from an Order's trigger price, and will always provide the default trigger condition when creating or modifying an Order.\nA special restriction applies when creating a guaranteed Stop Loss Order. In this case the TriggerCondition value must either be \"DEFAULT\", or the \"natural\" trigger side \"DEFAULT\" results in. So for a Stop Loss Order for a long trade valid values are \"DEFAULT\" and \"BID\", and for short trades \"DEFAULT\" and \"ASK\" are valid.",
        'primitive',
        'order.OrderTriggerCondition'
    ),
    new Property(
        'guaranteed',
        "Guaranteed",
        "Flag indicating that the Stop Loss Order is guaranteed. The default value depends on the GuaranteedStopLossOrderMode of the account, if it is REQUIRED, the default will be true, for DISABLED or ENABLED the default is false.",
        'primitive',
        'boolean'
    ),
    new Property(
        'clientExtensions',
        "Client Extensions",
        "The client extensions to add to the Order. Do not set, modify, or delete clientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
];

class StopLossOrderRequest extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Stop Loss for Trade {tradeID} @ {price}";

        this._nameFormat = "SL Order Request";

        this._properties = StopLossOrderRequest_Properties;

        data = data || {};

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "STOP_LOSS";
        }

        if (data['tradeID'] !== undefined) {
            this.tradeID = data['tradeID'];
        }

        if (data['clientTradeID'] !== undefined) {
            this.clientTradeID = data['clientTradeID'];
        }

        if (data['price'] !== undefined) {
            this.price = data['price'];
        }

        if (data['distance'] !== undefined) {
            this.distance = data['distance'];
        }

        if (data['timeInForce'] !== undefined) {
            this.timeInForce = data['timeInForce'];
        }
        else {
            this.timeInForce = "GTC";
        }

        if (data['gtdTime'] !== undefined) {
            this.gtdTime = data['gtdTime'];
        }

        if (data['triggerCondition'] !== undefined) {
            this.triggerCondition = data['triggerCondition'];
        }
        else {
            this.triggerCondition = "DEFAULT";
        }

        if (data['guaranteed'] !== undefined) {
            this.guaranteed = data['guaranteed'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new transaction.ClientExtensions(data['clientExtensions']);
        }

    }
}

const TrailingStopLossOrderRequest_Properties = [
    new Property(
        'type',
        "Type",
        "The type of the Order to Create. Must be set to \"TRAILING_STOP_LOSS\" when creating a Trailng Stop Loss Order.",
        'primitive',
        'order.OrderType'
    ),
    new Property(
        'tradeID',
        "Trade ID",
        "The ID of the Trade to close when the price threshold is breached.",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'clientTradeID',
        "Client Trade ID",
        "The client ID of the Trade to be closed when the price threshold is breached.",
        'primitive',
        'transaction.ClientID'
    ),
    new Property(
        'distance',
        "Price Distance",
        "The price distance (in price units) specified for the TrailingStopLoss Order.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'timeInForce',
        "Time In Force",
        "The time-in-force requested for the TrailingStopLoss Order. Restricted to \"GTC\", \"GFD\" and \"GTD\" for TrailingStopLoss Orders.",
        'primitive',
        'order.TimeInForce'
    ),
    new Property(
        'gtdTime',
        "GTD Time",
        "The date/time when the StopLoss Order will be cancelled if its timeInForce is \"GTD\".",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'triggerCondition',
        "Trigger Condition",
        "Specification of which price component should be used when determining if an Order should be triggered and filled. This allows Orders to be triggered based on the bid, ask, mid, default (ask for buy, bid for sell) or inverse (ask for sell, bid for buy) price depending on the desired behaviour. Orders are always filled using their default price component.\nThis feature is only provided through the REST API. Clients who choose to specify a non-default trigger condition will not see it reflected in any of OANDA's proprietary or partner trading platforms, their transaction history or their account statements. OANDA platforms always assume that an Order's trigger condition is set to the default value when indicating the distance from an Order's trigger price, and will always provide the default trigger condition when creating or modifying an Order.\nA special restriction applies when creating a guaranteed Stop Loss Order. In this case the TriggerCondition value must either be \"DEFAULT\", or the \"natural\" trigger side \"DEFAULT\" results in. So for a Stop Loss Order for a long trade valid values are \"DEFAULT\" and \"BID\", and for short trades \"DEFAULT\" and \"ASK\" are valid.",
        'primitive',
        'order.OrderTriggerCondition'
    ),
    new Property(
        'clientExtensions',
        "Client Extensions",
        "The client extensions to add to the Order. Do not set, modify, or delete clientExtensions if your account is associated with MT4.",
        'object',
        'transaction.ClientExtensions'
    ),
];

class TrailingStopLossOrderRequest extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Trailing Stop Loss for Trade {tradeID} @ {trailingStopValue}";

        this._nameFormat = "TSL Order Request";

        this._properties = TrailingStopLossOrderRequest_Properties;

        data = data || {};

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "TRAILING_STOP_LOSS";
        }

        if (data['tradeID'] !== undefined) {
            this.tradeID = data['tradeID'];
        }

        if (data['clientTradeID'] !== undefined) {
            this.clientTradeID = data['clientTradeID'];
        }

        if (data['distance'] !== undefined) {
            this.distance = data['distance'];
        }

        if (data['timeInForce'] !== undefined) {
            this.timeInForce = data['timeInForce'];
        }
        else {
            this.timeInForce = "GTC";
        }

        if (data['gtdTime'] !== undefined) {
            this.gtdTime = data['gtdTime'];
        }

        if (data['triggerCondition'] !== undefined) {
            this.triggerCondition = data['triggerCondition'];
        }
        else {
            this.triggerCondition = "DEFAULT";
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new transaction.ClientExtensions(data['clientExtensions']);
        }

    }
}

const UnitsAvailableDetails_Properties = [
    new Property(
        'long',
        "Long",
        "The units available for long Orders.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'short',
        "Short",
        "The units available for short Orders.",
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

        if (data['long'] !== undefined) {
            this.long = data['long'];
        }

        if (data['short'] !== undefined) {
            this.short = data['short'];
        }

    }
}

const UnitsAvailable_Properties = [
    new Property(
        'default',
        "Default",
        "The number of units that are available to be traded using an Order with a positionFill option of \"DEFAULT\". For an Account with hedging enabled, this value will be the same as the \"OPEN_ONLY\" value. For an Account without hedging enabled, this value will be the same as the \"REDUCE_FIRST\" value.",
        'object',
        'order.UnitsAvailableDetails'
    ),
    new Property(
        'reduceFirst',
        "Reduce First",
        "The number of units that may are available to be traded with an Order with a positionFill option of \"REDUCE_FIRST\".",
        'object',
        'order.UnitsAvailableDetails'
    ),
    new Property(
        'reduceOnly',
        "Reduce Only",
        "The number of units that may are available to be traded with an Order with a positionFill option of \"REDUCE_ONLY\".",
        'object',
        'order.UnitsAvailableDetails'
    ),
    new Property(
        'openOnly',
        "Open Only",
        "The number of units that may are available to be traded with an Order with a positionFill option of \"OPEN_ONLY\".",
        'object',
        'order.UnitsAvailableDetails'
    ),
];

class UnitsAvailable extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = UnitsAvailable_Properties;

        data = data || {};

        if (data['default'] !== undefined) {
            this.default = new UnitsAvailableDetails(data['default']);
        }

        if (data['reduceFirst'] !== undefined) {
            this.reduceFirst = new UnitsAvailableDetails(data['reduceFirst']);
        }

        if (data['reduceOnly'] !== undefined) {
            this.reduceOnly = new UnitsAvailableDetails(data['reduceOnly']);
        }

        if (data['openOnly'] !== undefined) {
            this.openOnly = new UnitsAvailableDetails(data['openOnly']);
        }

    }
}

const GuaranteedStopLossOrderEntryData_Properties = [
    new Property(
        'minimumDistance',
        'minimumDistance',
        "The minimum distance allowed between the Trade's fill price and the configured price for guaranteed Stop Loss Orders created for this instrument. Specified in price units.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'premium',
        'premium',
        "The amount that is charged to the account if a guaranteed Stop Loss Order is triggered and filled. The value is in price units and is charged for each unit of the Trade.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'levelRestriction',
        'levelRestriction',
        "The guaranteed Stop Loss Order level restriction for this instrument.",
        'object',
        'primitives.GuaranteedStopLossOrderLevelRestriction'
    ),
];

class GuaranteedStopLossOrderEntryData extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = GuaranteedStopLossOrderEntryData_Properties;

        data = data || {};

        if (data['minimumDistance'] !== undefined) {
            this.minimumDistance = data['minimumDistance'];
        }

        if (data['premium'] !== undefined) {
            this.premium = data['premium'];
        }

        if (data['levelRestriction'] !== undefined) {
            this.levelRestriction = new primitives.GuaranteedStopLossOrderLevelRestriction(data['levelRestriction']);
        }

    }
}

class EntitySpec {
    constructor(context) {
        this.context = context;
        this.OrderIdentifier = OrderIdentifier;
        this.DynamicOrderState = DynamicOrderState;
        this.Order = Order;
        this.MarketOrder = MarketOrder;
        this.FixedPriceOrder = FixedPriceOrder;
        this.LimitOrder = LimitOrder;
        this.StopOrder = StopOrder;
        this.MarketIfTouchedOrder = MarketIfTouchedOrder;
        this.TakeProfitOrder = TakeProfitOrder;
        this.StopLossOrder = StopLossOrder;
        this.TrailingStopLossOrder = TrailingStopLossOrder;
        this.OrderRequest = OrderRequest;
        this.MarketOrderRequest = MarketOrderRequest;
        this.LimitOrderRequest = LimitOrderRequest;
        this.StopOrderRequest = StopOrderRequest;
        this.MarketIfTouchedOrderRequest = MarketIfTouchedOrderRequest;
        this.TakeProfitOrderRequest = TakeProfitOrderRequest;
        this.StopLossOrderRequest = StopLossOrderRequest;
        this.TrailingStopLossOrderRequest = TrailingStopLossOrderRequest;
        this.UnitsAvailableDetails = UnitsAvailableDetails;
        this.UnitsAvailable = UnitsAvailable;
        this.GuaranteedStopLossOrderEntryData = GuaranteedStopLossOrderEntryData;
    }

    create(
        accountID,
        bodyParams,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/accounts/{accountID}/orders';

        bodyParams = bodyParams || {};

        path = path.replace('{' + 'accountID' + '}', accountID);


        let body = {};

        if (typeof bodyParams['order'] !== 'undefined')
        {
            body['order'] = bodyParams['order'];
        }

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 201)
                {
                    if (msg['orderCreateTransaction'] !== undefined) {
                        response.body.orderCreateTransaction = transaction.Transaction.create(msg['orderCreateTransaction']);
                    }

                    if (msg['orderFillTransaction'] !== undefined) {
                        response.body.orderFillTransaction = new transaction.OrderFillTransaction(msg['orderFillTransaction']);
                    }

                    if (msg['orderCancelTransaction'] !== undefined) {
                        response.body.orderCancelTransaction = new transaction.OrderCancelTransaction(msg['orderCancelTransaction']);
                    }

                    if (msg['orderReissueTransaction'] !== undefined) {
                        response.body.orderReissueTransaction = transaction.Transaction.create(msg['orderReissueTransaction']);
                    }

                    if (msg['orderReissueRejectTransaction'] !== undefined) {
                        response.body.orderReissueRejectTransaction = transaction.Transaction.create(msg['orderReissueRejectTransaction']);
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
                    if (msg['orderRejectTransaction'] !== undefined) {
                        response.body.orderRejectTransaction = transaction.Transaction.create(msg['orderRejectTransaction']);
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
                else if (response.statusCode == 403)
                {
                }
                else if (response.statusCode == 404)
                {
                    if (msg['orderRejectTransaction'] !== undefined) {
                        response.body.orderRejectTransaction = transaction.Transaction.create(msg['orderRejectTransaction']);
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
            'POST',
            path,
            body,
            undefined,
            handleResponse
        );
    }

    list(
        accountID,
        queryParams,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/accounts/{accountID}/orders';

        queryParams = queryParams || {};

        path = path.replace('{' + 'accountID' + '}', accountID);

        path = path + "?";
        if (typeof queryParams['ids'] !== 'undefined') {
            path = path + "ids=" + queryParams['ids'] + "&";
        }
        if (typeof queryParams['state'] !== 'undefined') {
            path = path + "state=" + queryParams['state'] + "&";
        }
        if (typeof queryParams['instrument'] !== 'undefined') {
            path = path + "instrument=" + queryParams['instrument'] + "&";
        }
        if (typeof queryParams['count'] !== 'undefined') {
            path = path + "count=" + queryParams['count'] + "&";
        }
        if (typeof queryParams['beforeID'] !== 'undefined') {
            path = path + "beforeID=" + queryParams['beforeID'] + "&";
        }

        let body = {};

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['orders'] !== undefined) {
                        response.body.orders = msg['orders'].map(x => Order.create(x));
                    }

                    if (msg['lastTransactionID'] !== undefined) {
                        response.body.lastTransactionID = msg['lastTransactionID'];
                    }

                }
                else if (response.statusCode == 400)
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

    listPending(
        accountID,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/accounts/{accountID}/pendingOrders';


        path = path.replace('{' + 'accountID' + '}', accountID);


        let body = {};

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['orders'] !== undefined) {
                        response.body.orders = msg['orders'].map(x => Order.create(x));
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
        orderSpecifier,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/accounts/{accountID}/orders/{orderSpecifier}';


        path = path.replace('{' + 'accountID' + '}', accountID);
        path = path.replace('{' + 'orderSpecifier' + '}', orderSpecifier);


        let body = {};

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['order'] !== undefined) {
                        response.body.order = Order.create(msg['order']);
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

    replace(
        accountID,
        orderSpecifier,
        bodyParams,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/accounts/{accountID}/orders/{orderSpecifier}';

        bodyParams = bodyParams || {};

        path = path.replace('{' + 'accountID' + '}', accountID);
        path = path.replace('{' + 'orderSpecifier' + '}', orderSpecifier);


        let body = {};

        if (typeof bodyParams['order'] !== 'undefined')
        {
            body['order'] = bodyParams['order'];
        }

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 201)
                {
                    if (msg['orderCancelTransaction'] !== undefined) {
                        response.body.orderCancelTransaction = new transaction.OrderCancelTransaction(msg['orderCancelTransaction']);
                    }

                    if (msg['orderCreateTransaction'] !== undefined) {
                        response.body.orderCreateTransaction = transaction.Transaction.create(msg['orderCreateTransaction']);
                    }

                    if (msg['orderFillTransaction'] !== undefined) {
                        response.body.orderFillTransaction = new transaction.OrderFillTransaction(msg['orderFillTransaction']);
                    }

                    if (msg['orderReissueTransaction'] !== undefined) {
                        response.body.orderReissueTransaction = transaction.Transaction.create(msg['orderReissueTransaction']);
                    }

                    if (msg['orderReissueRejectTransaction'] !== undefined) {
                        response.body.orderReissueRejectTransaction = transaction.Transaction.create(msg['orderReissueRejectTransaction']);
                    }

                    if (msg['replacingOrderCancelTransaction'] !== undefined) {
                        response.body.replacingOrderCancelTransaction = new transaction.OrderCancelTransaction(msg['replacingOrderCancelTransaction']);
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
                    if (msg['orderRejectTransaction'] !== undefined) {
                        response.body.orderRejectTransaction = transaction.Transaction.create(msg['orderRejectTransaction']);
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
                    if (msg['orderCancelRejectTransaction'] !== undefined) {
                        response.body.orderCancelRejectTransaction = transaction.Transaction.create(msg['orderCancelRejectTransaction']);
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

    cancel(
        accountID,
        orderSpecifier,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/accounts/{accountID}/orders/{orderSpecifier}/cancel';


        path = path.replace('{' + 'accountID' + '}', accountID);
        path = path.replace('{' + 'orderSpecifier' + '}', orderSpecifier);


        let body = {};

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['orderCancelTransaction'] !== undefined) {
                        response.body.orderCancelTransaction = new transaction.OrderCancelTransaction(msg['orderCancelTransaction']);
                    }

                    if (msg['relatedTransactionIDs'] !== undefined) {
                        response.body.relatedTransactionIDs = msg['relatedTransactionIDs'];
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
                    if (msg['orderCancelRejectTransaction'] !== undefined) {
                        response.body.orderCancelRejectTransaction = new transaction.OrderCancelRejectTransaction(msg['orderCancelRejectTransaction']);
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

    setClientExtensions(
        accountID,
        orderSpecifier,
        bodyParams,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/accounts/{accountID}/orders/{orderSpecifier}/clientExtensions';

        bodyParams = bodyParams || {};

        path = path.replace('{' + 'accountID' + '}', accountID);
        path = path.replace('{' + 'orderSpecifier' + '}', orderSpecifier);


        let body = {};

        if (typeof bodyParams['clientExtensions'] !== 'undefined')
        {
            body['clientExtensions'] = bodyParams['clientExtensions'];
        }

        if (typeof bodyParams['tradeClientExtensions'] !== 'undefined')
        {
            body['tradeClientExtensions'] = bodyParams['tradeClientExtensions'];
        }

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['orderClientExtensionsModifyTransaction'] !== undefined) {
                        response.body.orderClientExtensionsModifyTransaction = new transaction.OrderClientExtensionsModifyTransaction(msg['orderClientExtensionsModifyTransaction']);
                    }

                    if (msg['lastTransactionID'] !== undefined) {
                        response.body.lastTransactionID = msg['lastTransactionID'];
                    }

                    if (msg['relatedTransactionIDs'] !== undefined) {
                        response.body.relatedTransactionIDs = msg['relatedTransactionIDs'];
                    }

                }
                else if (response.statusCode == 400)
                {
                    if (msg['orderClientExtensionsModifyRejectTransaction'] !== undefined) {
                        response.body.orderClientExtensionsModifyRejectTransaction = new transaction.OrderClientExtensionsModifyRejectTransaction(msg['orderClientExtensionsModifyRejectTransaction']);
                    }

                    if (msg['lastTransactionID'] !== undefined) {
                        response.body.lastTransactionID = msg['lastTransactionID'];
                    }

                    if (msg['relatedTransactionIDs'] !== undefined) {
                        response.body.relatedTransactionIDs = msg['relatedTransactionIDs'];
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
                    if (msg['orderClientExtensionsModifyRejectTransaction'] !== undefined) {
                        response.body.orderClientExtensionsModifyRejectTransaction = new transaction.OrderClientExtensionsModifyRejectTransaction(msg['orderClientExtensionsModifyRejectTransaction']);
                    }

                    if (msg['lastTransactionID'] !== undefined) {
                        response.body.lastTransactionID = msg['lastTransactionID'];
                    }

                    if (msg['relatedTransactionIDs'] !== undefined) {
                        response.body.relatedTransactionIDs = msg['relatedTransactionIDs'];
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


    market(accountID, orderSpec, responseCallback)
    {
        this.create(
            accountID,
            { order: new this.MarketOrder(orderSpec) },
            responseCallback
        );
    }

    limit(accountID, orderSpec, responseCallback)
    {
        this.create(
            accountID,
            { order: new this.LimitOrder(orderSpec) },
            responseCallback
        );
    }

    limitReplace(accountID, orderID, orderSpec, responseCallback)
    {
        this.replace(
            accountID,
            orderID,
            { order: new this.LimitOrder(orderSpec) },
            responseCallback
        );
    }

    stop(accountID, orderSpec, responseCallback)
    {
        this.create(
            accountID,
            { order: new this.StopOrder(orderSpec) },
            responseCallback
        );
    }

    stopReplace(accountID, orderID, orderSpec, responseCallback)
    {
        this.replace(
            accountID,
            orderID,
            { order: new this.StopOrder(orderSpec) },
            responseCallback
        );
    }

    marketIfTouched(accountID, orderSpec, responseCallback)
    {
        this.create(
            accountID,
            { order: new this.MarketIfTouchedOrder(orderSpec) },
            responseCallback
        );
    }

    marketIfTouchedReplace(accountID, orderID, orderSpec, responseCallback)
    {
        this.replace(
            accountID,
            orderID,
            { order: new this.MarketIfTouchedOrder(orderSpec) },
            responseCallback
        );
    }

    takeProfit(accountID, orderSpec, responseCallback)
    {
        this.create(
            accountID,
            { order: new this.TakeProfitOrder(orderSpec) },
            responseCallback
        );
    }

    takeProfitReplace(accountID, orderID, orderSpec, responseCallback)
    {
        this.replace(
            accountID,
            orderID,
            { order: new this.TakeProfitOrder(orderSpec) },
            responseCallback
        );
    }

    stopLoss(accountID, orderSpec, responseCallback)
    {
        this.create(
            accountID,
            { order: new this.StopLossOrder(orderSpec) },
            responseCallback
        );
    }

    stopLossReplace(accountID, orderID, orderSpec, responseCallback)
    {
        this.replace(
            accountID,
            orderID,
            { order: new this.StopLossOrder(orderSpec) },
            responseCallback
        );
    }

    trailingStopLoss(accountID, orderSpec, responseCallback)
    {
        this.create(
            accountID,
            { order: new this.StopLossOrder(orderSpec) },
            responseCallback
        );
    }

    trailingStopLossReplace(accountID, orderID, orderSpec, responseCallback)
    {
        this.replace(
            accountID,
            orderID,
            { order: new this.StopLossOrder(orderSpec) },
            responseCallback
        );
    }

}

exports.OrderIdentifier = OrderIdentifier;
exports.DynamicOrderState = DynamicOrderState;
exports.Order = Order;
exports.MarketOrder = MarketOrder;
exports.FixedPriceOrder = FixedPriceOrder;
exports.LimitOrder = LimitOrder;
exports.StopOrder = StopOrder;
exports.MarketIfTouchedOrder = MarketIfTouchedOrder;
exports.TakeProfitOrder = TakeProfitOrder;
exports.StopLossOrder = StopLossOrder;
exports.TrailingStopLossOrder = TrailingStopLossOrder;
exports.OrderRequest = OrderRequest;
exports.MarketOrderRequest = MarketOrderRequest;
exports.LimitOrderRequest = LimitOrderRequest;
exports.StopOrderRequest = StopOrderRequest;
exports.MarketIfTouchedOrderRequest = MarketIfTouchedOrderRequest;
exports.TakeProfitOrderRequest = TakeProfitOrderRequest;
exports.StopLossOrderRequest = StopLossOrderRequest;
exports.TrailingStopLossOrderRequest = TrailingStopLossOrderRequest;
exports.UnitsAvailableDetails = UnitsAvailableDetails;
exports.UnitsAvailable = UnitsAvailable;
exports.GuaranteedStopLossOrderEntryData = GuaranteedStopLossOrderEntryData;

exports.EntitySpec = EntitySpec;
