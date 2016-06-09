/* jshint esversion: 6 */

"use strict";

var Definition = require('./base').Definition;
var Property = require('./base').Property;
var Field = require('./base').Field;

var transaction = require('./transaction');



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
        'pricing.PriceValue'
    ),
    new Property(
        'triggerDistance',
        "Trigger Distance",
        "The distance between the Trailing Stop Loss Order's trailingStopValue and the current Market Price. This represents the distance (in price units) of the Order from a triggering price. If the distance could not be determined, this value will not be set.",
        'primitive',
        'pricing.PriceValue'
    ),
    new Property(
        'isTriggerDistanceExact',
        "Trigger Distance Is Exact",
        "True if an exact trigger distance could be calculated. If false, it means the provided trigger distance is a best estimate. If the distance could not be determined, this value will not be set.",
        'primitive',
        'bool'
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
        "The client extensions of the Order.",
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
        else if (order["type"] == "MARKET")
        {
            return new MarketOrder(order);
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
        "The client extensions of the Order.",
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
        'pricing.PriceValue'
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
        "Client Extensions to add to the Trade created when the Order is filled (if such a Trade is created).",
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
        "The client extensions of the Order.",
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
        'pricing.PriceValue'
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
        "Client Extensions to add to the Trade created when the Order is filled (if such a Trade is created).",
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
        "The client extensions of the Order.",
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
        'pricing.PriceValue'
    ),
    new Property(
        'priceBound',
        "Price Bound",
        "The worst market price that may be used to fill this Stop Order. If the market gaps and crosses through both the price and the priceBound, the Stop Order will be cancelled instead of being filled.",
        'primitive',
        'pricing.PriceValue'
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
        "Client Extensions to add to the Trade created when the Order is filled (if such a Trade is created).",
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
        "The client extensions of the Order.",
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
        'pricing.PriceValue'
    ),
    new Property(
        'initialMarketPrice',
        "Initial Market Price",
        "The Market price at the time when the MarketIfTouched Order was created.",
        'primitive',
        'pricing.PriceValue'
    ),
    new Property(
        'priceBound',
        "Price Value",
        "The worst market price that may be used to fill this MarketIfTouched Order.",
        'primitive',
        'pricing.PriceValue'
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
        "Client Extensions to add to the Trade created when the Order is filled (if such a Trade is created).",
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

        if (data['initialMarketPrice'] !== undefined) {
            this.initialMarketPrice = data['initialMarketPrice'];
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
        "The client extensions of the Order.",
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
        'pricing.PriceValue'
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
        "The client extensions of the Order.",
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
        "The price threshold specified for the StopLoss Order. The associated Trade will be closed by a market price that is equal to or worse than this threshold.",
        'primitive',
        'pricing.PriceValue'
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
        "The client extensions of the Order.",
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
        "The price distance specified for the TrailingStopLoss Order.",
        'primitive',
        'pricing.PriceValue'
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
        'trailingStopValue',
        "Trailing Stop Loss Value",
        "The current trailing stop value for the Trailing Stop Loss Order. The trailingStopValue at the time of the Order's creation is created by combining the Order's distance with its initialTriggerComparePrice.",
        'primitive',
        'pricing.PriceValue'
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
        'pricing.PriceValue'
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
        "The client extensions to add to the Order.",
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
        "Client Extensions to add to the Trade created when the Order is filled (if such a Trade is created).",
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
        'pricing.PriceValue'
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
        'clientExtensions',
        "Client Extensions",
        "The client extensions to add to the Order.",
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
        "Client Extensions to add to the Trade created when the Order is filled (if such a Trade is created).",
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
        'pricing.PriceValue'
    ),
    new Property(
        'priceBound',
        "Price Bound",
        "The worst market price that may be used to fill this Stop Order. If the market gaps and crosses through both the price and the priceBound, the Stop Order will be cancelled instead of being filled.",
        'primitive',
        'pricing.PriceValue'
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
        'clientExtensions',
        "Client Extensions",
        "The client extensions to add to the Order.",
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
        "Client Extensions to add to the Trade created when the Order is filled (if such a Trade is created).",
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
        'pricing.PriceValue'
    ),
    new Property(
        'initialMarketPrice',
        "Initial Market Price",
        "The Market price at the time when the MarketIfTouched Order was created.",
        'primitive',
        'pricing.PriceValue'
    ),
    new Property(
        'priceBound',
        "Price Value",
        "The worst market price that may be used to fill this MarketIfTouched Order.",
        'primitive',
        'pricing.PriceValue'
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
        'clientExtensions',
        "Client Extensions",
        "The client extensions to add to the Order.",
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
        "Client Extensions to add to the Trade created when the Order is filled (if such a Trade is created).",
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

        if (data['initialMarketPrice'] !== undefined) {
            this.initialMarketPrice = data['initialMarketPrice'];
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
        'pricing.PriceValue'
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
        'clientExtensions',
        "Client Extensions",
        "The client extensions to add to the Order.",
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
        "The price threshold specified for the StopLoss Order. The associated Trade will be closed by a market price that is equal to or worse than this threshold.",
        'primitive',
        'pricing.PriceValue'
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
        'clientExtensions',
        "Client Extensions",
        "The client extensions to add to the Order.",
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

        if (data['timeInForce'] !== undefined) {
            this.timeInForce = data['timeInForce'];
        }
        else {
            this.timeInForce = "GTC";
        }

        if (data['gtdTime'] !== undefined) {
            this.gtdTime = data['gtdTime'];
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
        "The price distance specified for the TrailingStopLoss Order.",
        'primitive',
        'pricing.PriceValue'
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
        'clientExtensions',
        "Client Extensions",
        "The client extensions to add to the Order.",
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

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new transaction.ClientExtensions(data['clientExtensions']);
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
    }

    create(
        accountID,
        bodyParams,
        responseHandler
    )
    {
        let path = '/v3/accounts/{accountID}/orders';

        bodyParams = bodyParams || {};

        path = path.replace('{' + 'accountID' + '}', accountID);


        let body = {};

        if (typeof bodyParams['order'] !== 'undefined')
        {
            body['order'] = bodyParams['order'];
        }

        function handleResponse(response) {
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

                if (response.statusCode == 400)
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
            'POST',
            path,
            body,
            handleResponse
        );
    }

    list(
        accountID,
        queryParams,
        responseHandler
    )
    {
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

        function handleResponse(response) {
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

    listPending(
        accountID,
        responseHandler
    )
    {
        let path = '/v3/accounts/{accountID}/pendingOrders';


        path = path.replace('{' + 'accountID' + '}', accountID);


        let body = {};

        function handleResponse(response) {
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

    get(
        accountID,
        orderID,
        responseHandler
    )
    {
        let path = '/v3/accounts/{accountID}/orders/{orderID}';


        path = path.replace('{' + 'accountID' + '}', accountID);
        path = path.replace('{' + 'orderID' + '}', orderID);


        let body = {};

        function handleResponse(response) {
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

    replace(
        accountID,
        orderID,
        bodyParams,
        responseHandler
    )
    {
        let path = '/v3/accounts/{accountID}/orders/{orderID}';

        bodyParams = bodyParams || {};

        path = path.replace('{' + 'accountID' + '}', accountID);
        path = path.replace('{' + 'orderID' + '}', orderID);


        let body = {};

        if (typeof bodyParams['order'] !== 'undefined')
        {
            body['order'] = bodyParams['order'];
        }

        function handleResponse(response) {
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

                if (response.statusCode == 400)
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
            'PUT',
            path,
            body,
            handleResponse
        );
    }

    cancel(
        accountID,
        orderID,
        responseHandler
    )
    {
        let path = '/v3/accounts/{accountID}/orders/{orderID}/cancel';


        path = path.replace('{' + 'accountID' + '}', accountID);
        path = path.replace('{' + 'orderID' + '}', orderID);


        let body = {};

        function handleResponse(response) {
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
            'PUT',
            path,
            body,
            handleResponse
        );
    }

    setClientExtensions(
        accountID,
        orderID,
        bodyParams,
        responseHandler
    )
    {
        let path = '/v3/accounts/{accountID}/orders/{orderID}/clientExtensions';

        bodyParams = bodyParams || {};

        path = path.replace('{' + 'accountID' + '}', accountID);
        path = path.replace('{' + 'orderID' + '}', orderID);


        let body = {};

        if (typeof bodyParams['clientExtensions'] !== 'undefined')
        {
            body['clientExtensions'] = bodyParams['clientExtensions'];
        }

        if (typeof bodyParams['tradeClientExtensions'] !== 'undefined')
        {
            body['tradeClientExtensions'] = bodyParams['tradeClientExtensions'];
        }

        function handleResponse(response) {
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

                }

                if (response.statusCode == 400)
                {
                    if (msg['orderClientExtensionsModifyRejectTransaction'] !== undefined) {
                        response.body.orderClientExtensionsModifyRejectTransaction = new transaction.OrderClientExtensionsModifyRejectTransaction(msg['orderClientExtensionsModifyRejectTransaction']);
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
            'PUT',
            path,
            body,
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

exports.EntitySpec = EntitySpec;
