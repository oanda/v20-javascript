/* jshint esversion: 6 */

"use strict";

var Definition = require('./base').Definition;
var Property = require('./base').Property;
var Field = require('./base').Field;

var trade = require('./trade');
var position = require('./position');
var order = require('./order');
var transaction = require('./transaction');
var primitives = require('./primitives');



const Account_Properties = [
    new Property(
        'id',
        "Account ID",
        "The Account's identifier",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'alias',
        "Alias",
        "Client-assigned alias for the Account. Only provided if the Account has an alias set",
        'primitive',
        'string'
    ),
    new Property(
        'currency',
        "Home Currency",
        "The home currency of the Account",
        'primitive',
        'primitives.Currency'
    ),
    new Property(
        'balance',
        "Balance",
        "The current balance of the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'createdByUserID',
        "Created by User ID",
        "ID of the user that created the Account.",
        'primitive',
        'integer'
    ),
    new Property(
        'createdTime',
        "Create Time",
        "The date/time when the Account was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'guaranteedStopLossOrderMode',
        "Guaranteed Stop Loss Order Mode",
        "The current guaranteed Stop Loss Order mode of the Account.",
        'primitive',
        'account.GuaranteedStopLossOrderMode'
    ),
    new Property(
        'pl',
        "Profit/Loss",
        "The total profit/loss realized over the lifetime of the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'resettablePL',
        "Resettable Profit/Loss",
        "The total realized profit/loss for the Account since it was last reset by the client.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'resettablePLTime',
        "Profit/Loss Reset Time",
        "The date/time that the Account's resettablePL was last reset.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'financing',
        "Financing",
        "The total amount of financing paid/collected over the lifetime of the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'commission',
        "Commission",
        "The total amount of commission paid over the lifetime of the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'guaranteedExecutionFees',
        "Guaranteed Execution Fees",
        "The total amount of fees charged over the lifetime of the Account for the execution of guaranteed Stop Loss Orders.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginRate',
        "Margin Rate",
        "Client-provided margin rate override for the Account. The effective margin rate of the Account is the lesser of this value and the OANDA margin rate for the Account's division. This value is only provided if a margin rate override exists for the Account.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'marginCallEnterTime',
        "Margin Call Enter Time",
        "The date/time when the Account entered a margin call state. Only provided if the Account is in a margin call.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'marginCallExtensionCount',
        "Margin Call Extension Count",
        "The number of times that the Account's current margin call was extended.",
        'primitive',
        'integer'
    ),
    new Property(
        'lastMarginCallExtensionTime',
        "Last Margin Call Extension Time",
        "The date/time of the Account's last margin call extension.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'openTradeCount',
        "Open Trade Count",
        "The number of Trades currently open in the Account.",
        'primitive',
        'integer'
    ),
    new Property(
        'openPositionCount',
        "Open Position Count",
        "The number of Positions currently open in the Account.",
        'primitive',
        'integer'
    ),
    new Property(
        'pendingOrderCount',
        "Pending Order Count",
        "The number of Orders currently pending in the Account.",
        'primitive',
        'integer'
    ),
    new Property(
        'hedgingEnabled',
        "Hedging Enabled",
        "Flag indicating that the Account has hedging enabled.",
        'primitive',
        'boolean'
    ),
    new Property(
        'lastOrderFillTimestamp',
        "Last Order Fill timestamp.",
        "The date/time of the last order that was filled for this account.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'unrealizedPL',
        "Unrealized Profit/Loss",
        "The total unrealized profit/loss for all Trades currently open in the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'NAV',
        "Net Asset Value",
        "The net asset value of the Account. Equal to Account balance + unrealizedPL.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginUsed',
        "Margin Used",
        "Margin currently used for the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginAvailable',
        "Margin Available",
        "Margin available for Account currency.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'positionValue',
        "Position Value",
        "The value of the Account's open positions represented in the Account's home currency.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCloseoutUnrealizedPL',
        "Closeout UPL",
        "The Account's margin closeout unrealized PL.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCloseoutNAV',
        "Closeout NAV",
        "The Account's margin closeout NAV.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCloseoutMarginUsed',
        "Closeout Margin Used",
        "The Account's margin closeout margin used.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCloseoutPercent',
        "Margin Closeout Percentage",
        "The Account's margin closeout percentage. When this value is 1.0 or above the Account is in a margin closeout situation.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'marginCloseoutPositionValue',
        "Margin Closeout Position Value",
        "The value of the Account's open positions as used for margin closeout calculations represented in the Account's home currency.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'withdrawalLimit',
        "Withdrawal Limit",
        "The current WithdrawalLimit for the account which will be zero or a positive value indicating how much can be withdrawn from the account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCallMarginUsed',
        "Margin Call Margin Used",
        "The Account's margin call margin used.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCallPercent',
        "Margin Call Percentage",
        "The Account's margin call percentage. When this value is 1.0 or above the Account is in a margin call situation.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'lastTransactionID',
        "Last Transaction ID",
        "The ID of the last Transaction created for the Account.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'trades',
        "Open Trades",
        "The details of the Trades currently open in the Account.",
        'array_object',
        'TradeSummary'
    ),
    new Property(
        'positions',
        "Positions",
        "The details all Account Positions.",
        'array_object',
        'Position'
    ),
    new Property(
        'orders',
        "Pending Orders",
        "The details of the Orders currently pending in the Account.",
        'array_object',
        'Order'
    ),
];

class Account extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Account {id}";

        this._nameFormat = "";

        this._properties = Account_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['alias'] !== undefined) {
            this.alias = data['alias'];
        }

        if (data['currency'] !== undefined) {
            this.currency = data['currency'];
        }

        if (data['balance'] !== undefined) {
            this.balance = data['balance'];
        }

        if (data['createdByUserID'] !== undefined) {
            this.createdByUserID = data['createdByUserID'];
        }

        if (data['createdTime'] !== undefined) {
            this.createdTime = data['createdTime'];
        }

        if (data['guaranteedStopLossOrderMode'] !== undefined) {
            this.guaranteedStopLossOrderMode = data['guaranteedStopLossOrderMode'];
        }

        if (data['pl'] !== undefined) {
            this.pl = data['pl'];
        }

        if (data['resettablePL'] !== undefined) {
            this.resettablePL = data['resettablePL'];
        }

        if (data['resettablePLTime'] !== undefined) {
            this.resettablePLTime = data['resettablePLTime'];
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

        if (data['marginRate'] !== undefined) {
            this.marginRate = data['marginRate'];
        }

        if (data['marginCallEnterTime'] !== undefined) {
            this.marginCallEnterTime = data['marginCallEnterTime'];
        }

        if (data['marginCallExtensionCount'] !== undefined) {
            this.marginCallExtensionCount = data['marginCallExtensionCount'];
        }

        if (data['lastMarginCallExtensionTime'] !== undefined) {
            this.lastMarginCallExtensionTime = data['lastMarginCallExtensionTime'];
        }

        if (data['openTradeCount'] !== undefined) {
            this.openTradeCount = data['openTradeCount'];
        }

        if (data['openPositionCount'] !== undefined) {
            this.openPositionCount = data['openPositionCount'];
        }

        if (data['pendingOrderCount'] !== undefined) {
            this.pendingOrderCount = data['pendingOrderCount'];
        }

        if (data['hedgingEnabled'] !== undefined) {
            this.hedgingEnabled = data['hedgingEnabled'];
        }

        if (data['lastOrderFillTimestamp'] !== undefined) {
            this.lastOrderFillTimestamp = data['lastOrderFillTimestamp'];
        }

        if (data['unrealizedPL'] !== undefined) {
            this.unrealizedPL = data['unrealizedPL'];
        }

        if (data['NAV'] !== undefined) {
            this.NAV = data['NAV'];
        }

        if (data['marginUsed'] !== undefined) {
            this.marginUsed = data['marginUsed'];
        }

        if (data['marginAvailable'] !== undefined) {
            this.marginAvailable = data['marginAvailable'];
        }

        if (data['positionValue'] !== undefined) {
            this.positionValue = data['positionValue'];
        }

        if (data['marginCloseoutUnrealizedPL'] !== undefined) {
            this.marginCloseoutUnrealizedPL = data['marginCloseoutUnrealizedPL'];
        }

        if (data['marginCloseoutNAV'] !== undefined) {
            this.marginCloseoutNAV = data['marginCloseoutNAV'];
        }

        if (data['marginCloseoutMarginUsed'] !== undefined) {
            this.marginCloseoutMarginUsed = data['marginCloseoutMarginUsed'];
        }

        if (data['marginCloseoutPercent'] !== undefined) {
            this.marginCloseoutPercent = data['marginCloseoutPercent'];
        }

        if (data['marginCloseoutPositionValue'] !== undefined) {
            this.marginCloseoutPositionValue = data['marginCloseoutPositionValue'];
        }

        if (data['withdrawalLimit'] !== undefined) {
            this.withdrawalLimit = data['withdrawalLimit'];
        }

        if (data['marginCallMarginUsed'] !== undefined) {
            this.marginCallMarginUsed = data['marginCallMarginUsed'];
        }

        if (data['marginCallPercent'] !== undefined) {
            this.marginCallPercent = data['marginCallPercent'];
        }

        if (data['lastTransactionID'] !== undefined) {
            this.lastTransactionID = data['lastTransactionID'];
        }

        if (data['trades'] !== undefined) {
            this.trades = data['trades'].map(x => new trade.TradeSummary(x));
        }

        if (data['positions'] !== undefined) {
            this.positions = data['positions'].map(x => new position.Position(x));
        }

        if (data['orders'] !== undefined) {
            this.orders = data['orders'].map(x => order.Order.create(x));
        }

    }
}

const AccountChangesState_Properties = [
    new Property(
        'unrealizedPL',
        "Unrealized Profit/Loss",
        "The total unrealized profit/loss for all Trades currently open in the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'NAV',
        "Net Asset Value",
        "The net asset value of the Account. Equal to Account balance + unrealizedPL.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginUsed',
        "Margin Used",
        "Margin currently used for the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginAvailable',
        "Margin Available",
        "Margin available for Account currency.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'positionValue',
        "Position Value",
        "The value of the Account's open positions represented in the Account's home currency.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCloseoutUnrealizedPL',
        "Closeout UPL",
        "The Account's margin closeout unrealized PL.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCloseoutNAV',
        "Closeout NAV",
        "The Account's margin closeout NAV.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCloseoutMarginUsed',
        "Closeout Margin Used",
        "The Account's margin closeout margin used.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCloseoutPercent',
        "Margin Closeout Percentage",
        "The Account's margin closeout percentage. When this value is 1.0 or above the Account is in a margin closeout situation.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'marginCloseoutPositionValue',
        "Margin Closeout Position Value",
        "The value of the Account's open positions as used for margin closeout calculations represented in the Account's home currency.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'withdrawalLimit',
        "Withdrawal Limit",
        "The current WithdrawalLimit for the account which will be zero or a positive value indicating how much can be withdrawn from the account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCallMarginUsed',
        "Margin Call Margin Used",
        "The Account's margin call margin used.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCallPercent',
        "Margin Call Percentage",
        "The Account's margin call percentage. When this value is 1.0 or above the Account is in a margin call situation.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'orders',
        "Order States",
        "The price-dependent state of each pending Order in the Account.",
        'array_object',
        'DynamicOrderState'
    ),
    new Property(
        'trades',
        "Trade States",
        "The price-dependent state for each open Trade in the Account.",
        'array_object',
        'CalculatedTradeState'
    ),
    new Property(
        'positions',
        "Position States",
        "The price-dependent state for each open Position in the Account.",
        'array_object',
        'CalculatedPositionState'
    ),
];

class AccountChangesState extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = AccountChangesState_Properties;

        data = data || {};

        if (data['unrealizedPL'] !== undefined) {
            this.unrealizedPL = data['unrealizedPL'];
        }

        if (data['NAV'] !== undefined) {
            this.NAV = data['NAV'];
        }

        if (data['marginUsed'] !== undefined) {
            this.marginUsed = data['marginUsed'];
        }

        if (data['marginAvailable'] !== undefined) {
            this.marginAvailable = data['marginAvailable'];
        }

        if (data['positionValue'] !== undefined) {
            this.positionValue = data['positionValue'];
        }

        if (data['marginCloseoutUnrealizedPL'] !== undefined) {
            this.marginCloseoutUnrealizedPL = data['marginCloseoutUnrealizedPL'];
        }

        if (data['marginCloseoutNAV'] !== undefined) {
            this.marginCloseoutNAV = data['marginCloseoutNAV'];
        }

        if (data['marginCloseoutMarginUsed'] !== undefined) {
            this.marginCloseoutMarginUsed = data['marginCloseoutMarginUsed'];
        }

        if (data['marginCloseoutPercent'] !== undefined) {
            this.marginCloseoutPercent = data['marginCloseoutPercent'];
        }

        if (data['marginCloseoutPositionValue'] !== undefined) {
            this.marginCloseoutPositionValue = data['marginCloseoutPositionValue'];
        }

        if (data['withdrawalLimit'] !== undefined) {
            this.withdrawalLimit = data['withdrawalLimit'];
        }

        if (data['marginCallMarginUsed'] !== undefined) {
            this.marginCallMarginUsed = data['marginCallMarginUsed'];
        }

        if (data['marginCallPercent'] !== undefined) {
            this.marginCallPercent = data['marginCallPercent'];
        }

        if (data['orders'] !== undefined) {
            this.orders = data['orders'].map(x => new order.DynamicOrderState(x));
        }

        if (data['trades'] !== undefined) {
            this.trades = data['trades'].map(x => new trade.CalculatedTradeState(x));
        }

        if (data['positions'] !== undefined) {
            this.positions = data['positions'].map(x => new position.CalculatedPositionState(x));
        }

    }
}

const AccountProperties_Properties = [
    new Property(
        'id',
        "ID",
        "The Account's identifier",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'mt4AccountID',
        "MT4 Account ID",
        "The Account's associated MT4 Account ID. This field will not be present if the Account is not an MT4 account.",
        'primitive',
        'integer'
    ),
    new Property(
        'tags',
        "Account Tags",
        "The Account's tags",
        'array_primitive',
        'string'
    ),
];

class AccountProperties extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = AccountProperties_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['mt4AccountID'] !== undefined) {
            this.mt4AccountID = data['mt4AccountID'];
        }

        if (data['tags'] !== undefined) {
            this.tags = data['tags'];
        }

    }
}

const AccountSummary_Properties = [
    new Property(
        'id',
        "Account ID",
        "The Account's identifier",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'alias',
        "Alias",
        "Client-assigned alias for the Account. Only provided if the Account has an alias set",
        'primitive',
        'string'
    ),
    new Property(
        'currency',
        "Home Currency",
        "The home currency of the Account",
        'primitive',
        'primitives.Currency'
    ),
    new Property(
        'balance',
        "Balance",
        "The current balance of the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'createdByUserID',
        "Created by User ID",
        "ID of the user that created the Account.",
        'primitive',
        'integer'
    ),
    new Property(
        'createdTime',
        "Create Time",
        "The date/time when the Account was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'guaranteedStopLossOrderMode',
        "Guaranteed Stop Loss Order Mode",
        "The current guaranteed Stop Loss Order mode of the Account.",
        'primitive',
        'account.GuaranteedStopLossOrderMode'
    ),
    new Property(
        'pl',
        "Profit/Loss",
        "The total profit/loss realized over the lifetime of the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'resettablePL',
        "Resettable Profit/Loss",
        "The total realized profit/loss for the Account since it was last reset by the client.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'resettablePLTime',
        "Profit/Loss Reset Time",
        "The date/time that the Account's resettablePL was last reset.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'financing',
        "Financing",
        "The total amount of financing paid/collected over the lifetime of the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'commission',
        "Commission",
        "The total amount of commission paid over the lifetime of the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'guaranteedExecutionFees',
        "Guaranteed Execution Fees",
        "The total amount of fees charged over the lifetime of the Account for the execution of guaranteed Stop Loss Orders.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginRate',
        "Margin Rate",
        "Client-provided margin rate override for the Account. The effective margin rate of the Account is the lesser of this value and the OANDA margin rate for the Account's division. This value is only provided if a margin rate override exists for the Account.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'marginCallEnterTime',
        "Margin Call Enter Time",
        "The date/time when the Account entered a margin call state. Only provided if the Account is in a margin call.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'marginCallExtensionCount',
        "Margin Call Extension Count",
        "The number of times that the Account's current margin call was extended.",
        'primitive',
        'integer'
    ),
    new Property(
        'lastMarginCallExtensionTime',
        "Last Margin Call Extension Time",
        "The date/time of the Account's last margin call extension.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'openTradeCount',
        "Open Trade Count",
        "The number of Trades currently open in the Account.",
        'primitive',
        'integer'
    ),
    new Property(
        'openPositionCount',
        "Open Position Count",
        "The number of Positions currently open in the Account.",
        'primitive',
        'integer'
    ),
    new Property(
        'pendingOrderCount',
        "Pending Order Count",
        "The number of Orders currently pending in the Account.",
        'primitive',
        'integer'
    ),
    new Property(
        'hedgingEnabled',
        "Hedging Enabled",
        "Flag indicating that the Account has hedging enabled.",
        'primitive',
        'boolean'
    ),
    new Property(
        'lastOrderFillTimestamp',
        "Last Order Fill timestamp.",
        "The date/time of the last order that was filled for this account.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'unrealizedPL',
        "Unrealized Profit/Loss",
        "The total unrealized profit/loss for all Trades currently open in the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'NAV',
        "Net Asset Value",
        "The net asset value of the Account. Equal to Account balance + unrealizedPL.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginUsed',
        "Margin Used",
        "Margin currently used for the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginAvailable',
        "Margin Available",
        "Margin available for Account currency.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'positionValue',
        "Position Value",
        "The value of the Account's open positions represented in the Account's home currency.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCloseoutUnrealizedPL',
        "Closeout UPL",
        "The Account's margin closeout unrealized PL.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCloseoutNAV',
        "Closeout NAV",
        "The Account's margin closeout NAV.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCloseoutMarginUsed',
        "Closeout Margin Used",
        "The Account's margin closeout margin used.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCloseoutPercent',
        "Margin Closeout Percentage",
        "The Account's margin closeout percentage. When this value is 1.0 or above the Account is in a margin closeout situation.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'marginCloseoutPositionValue',
        "Margin Closeout Position Value",
        "The value of the Account's open positions as used for margin closeout calculations represented in the Account's home currency.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'withdrawalLimit',
        "Withdrawal Limit",
        "The current WithdrawalLimit for the account which will be zero or a positive value indicating how much can be withdrawn from the account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCallMarginUsed',
        "Margin Call Margin Used",
        "The Account's margin call margin used.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCallPercent',
        "Margin Call Percentage",
        "The Account's margin call percentage. When this value is 1.0 or above the Account is in a margin call situation.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'lastTransactionID',
        "Last Transaction ID",
        "The ID of the last Transaction created for the Account.",
        'primitive',
        'transaction.TransactionID'
    ),
];

class AccountSummary extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = AccountSummary_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['alias'] !== undefined) {
            this.alias = data['alias'];
        }

        if (data['currency'] !== undefined) {
            this.currency = data['currency'];
        }

        if (data['balance'] !== undefined) {
            this.balance = data['balance'];
        }

        if (data['createdByUserID'] !== undefined) {
            this.createdByUserID = data['createdByUserID'];
        }

        if (data['createdTime'] !== undefined) {
            this.createdTime = data['createdTime'];
        }

        if (data['guaranteedStopLossOrderMode'] !== undefined) {
            this.guaranteedStopLossOrderMode = data['guaranteedStopLossOrderMode'];
        }

        if (data['pl'] !== undefined) {
            this.pl = data['pl'];
        }

        if (data['resettablePL'] !== undefined) {
            this.resettablePL = data['resettablePL'];
        }

        if (data['resettablePLTime'] !== undefined) {
            this.resettablePLTime = data['resettablePLTime'];
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

        if (data['marginRate'] !== undefined) {
            this.marginRate = data['marginRate'];
        }

        if (data['marginCallEnterTime'] !== undefined) {
            this.marginCallEnterTime = data['marginCallEnterTime'];
        }

        if (data['marginCallExtensionCount'] !== undefined) {
            this.marginCallExtensionCount = data['marginCallExtensionCount'];
        }

        if (data['lastMarginCallExtensionTime'] !== undefined) {
            this.lastMarginCallExtensionTime = data['lastMarginCallExtensionTime'];
        }

        if (data['openTradeCount'] !== undefined) {
            this.openTradeCount = data['openTradeCount'];
        }

        if (data['openPositionCount'] !== undefined) {
            this.openPositionCount = data['openPositionCount'];
        }

        if (data['pendingOrderCount'] !== undefined) {
            this.pendingOrderCount = data['pendingOrderCount'];
        }

        if (data['hedgingEnabled'] !== undefined) {
            this.hedgingEnabled = data['hedgingEnabled'];
        }

        if (data['lastOrderFillTimestamp'] !== undefined) {
            this.lastOrderFillTimestamp = data['lastOrderFillTimestamp'];
        }

        if (data['unrealizedPL'] !== undefined) {
            this.unrealizedPL = data['unrealizedPL'];
        }

        if (data['NAV'] !== undefined) {
            this.NAV = data['NAV'];
        }

        if (data['marginUsed'] !== undefined) {
            this.marginUsed = data['marginUsed'];
        }

        if (data['marginAvailable'] !== undefined) {
            this.marginAvailable = data['marginAvailable'];
        }

        if (data['positionValue'] !== undefined) {
            this.positionValue = data['positionValue'];
        }

        if (data['marginCloseoutUnrealizedPL'] !== undefined) {
            this.marginCloseoutUnrealizedPL = data['marginCloseoutUnrealizedPL'];
        }

        if (data['marginCloseoutNAV'] !== undefined) {
            this.marginCloseoutNAV = data['marginCloseoutNAV'];
        }

        if (data['marginCloseoutMarginUsed'] !== undefined) {
            this.marginCloseoutMarginUsed = data['marginCloseoutMarginUsed'];
        }

        if (data['marginCloseoutPercent'] !== undefined) {
            this.marginCloseoutPercent = data['marginCloseoutPercent'];
        }

        if (data['marginCloseoutPositionValue'] !== undefined) {
            this.marginCloseoutPositionValue = data['marginCloseoutPositionValue'];
        }

        if (data['withdrawalLimit'] !== undefined) {
            this.withdrawalLimit = data['withdrawalLimit'];
        }

        if (data['marginCallMarginUsed'] !== undefined) {
            this.marginCallMarginUsed = data['marginCallMarginUsed'];
        }

        if (data['marginCallPercent'] !== undefined) {
            this.marginCallPercent = data['marginCallPercent'];
        }

        if (data['lastTransactionID'] !== undefined) {
            this.lastTransactionID = data['lastTransactionID'];
        }

    }
}

const CalculatedAccountState_Properties = [
    new Property(
        'unrealizedPL',
        "Unrealized Profit/Loss",
        "The total unrealized profit/loss for all Trades currently open in the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'NAV',
        "Net Asset Value",
        "The net asset value of the Account. Equal to Account balance + unrealizedPL.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginUsed',
        "Margin Used",
        "Margin currently used for the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginAvailable',
        "Margin Available",
        "Margin available for Account currency.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'positionValue',
        "Position Value",
        "The value of the Account's open positions represented in the Account's home currency.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCloseoutUnrealizedPL',
        "Closeout UPL",
        "The Account's margin closeout unrealized PL.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCloseoutNAV',
        "Closeout NAV",
        "The Account's margin closeout NAV.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCloseoutMarginUsed',
        "Closeout Margin Used",
        "The Account's margin closeout margin used.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCloseoutPercent',
        "Margin Closeout Percentage",
        "The Account's margin closeout percentage. When this value is 1.0 or above the Account is in a margin closeout situation.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'marginCloseoutPositionValue',
        "Margin Closeout Position Value",
        "The value of the Account's open positions as used for margin closeout calculations represented in the Account's home currency.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'withdrawalLimit',
        "Withdrawal Limit",
        "The current WithdrawalLimit for the account which will be zero or a positive value indicating how much can be withdrawn from the account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCallMarginUsed',
        "Margin Call Margin Used",
        "The Account's margin call margin used.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'marginCallPercent',
        "Margin Call Percentage",
        "The Account's margin call percentage. When this value is 1.0 or above the Account is in a margin call situation.",
        'primitive',
        'primitives.DecimalNumber'
    ),
];

class CalculatedAccountState extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = CalculatedAccountState_Properties;

        data = data || {};

        if (data['unrealizedPL'] !== undefined) {
            this.unrealizedPL = data['unrealizedPL'];
        }

        if (data['NAV'] !== undefined) {
            this.NAV = data['NAV'];
        }

        if (data['marginUsed'] !== undefined) {
            this.marginUsed = data['marginUsed'];
        }

        if (data['marginAvailable'] !== undefined) {
            this.marginAvailable = data['marginAvailable'];
        }

        if (data['positionValue'] !== undefined) {
            this.positionValue = data['positionValue'];
        }

        if (data['marginCloseoutUnrealizedPL'] !== undefined) {
            this.marginCloseoutUnrealizedPL = data['marginCloseoutUnrealizedPL'];
        }

        if (data['marginCloseoutNAV'] !== undefined) {
            this.marginCloseoutNAV = data['marginCloseoutNAV'];
        }

        if (data['marginCloseoutMarginUsed'] !== undefined) {
            this.marginCloseoutMarginUsed = data['marginCloseoutMarginUsed'];
        }

        if (data['marginCloseoutPercent'] !== undefined) {
            this.marginCloseoutPercent = data['marginCloseoutPercent'];
        }

        if (data['marginCloseoutPositionValue'] !== undefined) {
            this.marginCloseoutPositionValue = data['marginCloseoutPositionValue'];
        }

        if (data['withdrawalLimit'] !== undefined) {
            this.withdrawalLimit = data['withdrawalLimit'];
        }

        if (data['marginCallMarginUsed'] !== undefined) {
            this.marginCallMarginUsed = data['marginCallMarginUsed'];
        }

        if (data['marginCallPercent'] !== undefined) {
            this.marginCallPercent = data['marginCallPercent'];
        }

    }
}

const AccountChanges_Properties = [
    new Property(
        'ordersCreated',
        "Orders Created",
        "The Orders created. These Orders may have been filled, cancelled or triggered in the same period.",
        'array_object',
        'Order'
    ),
    new Property(
        'ordersCancelled',
        "Orders Cancelled",
        "The Orders cancelled.",
        'array_object',
        'Order'
    ),
    new Property(
        'ordersFilled',
        "Orders Filled",
        "The Orders filled.",
        'array_object',
        'Order'
    ),
    new Property(
        'ordersTriggered',
        "Orders Triggered",
        "The Orders triggered.",
        'array_object',
        'Order'
    ),
    new Property(
        'tradesOpened',
        "Trades Opened",
        "The Trades opened.",
        'array_object',
        'TradeSummary'
    ),
    new Property(
        'tradesReduced',
        "Trades Reduced",
        "The Trades reduced.",
        'array_object',
        'TradeSummary'
    ),
    new Property(
        'tradesClosed',
        "Trades Closed",
        "The Trades closed.",
        'array_object',
        'TradeSummary'
    ),
    new Property(
        'positions',
        "Positions",
        "The Positions changed.",
        'array_object',
        'Position'
    ),
    new Property(
        'transactions',
        "Transactions",
        "The Transactions that have been generated.",
        'array_object',
        'Transaction'
    ),
];

class AccountChanges extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = AccountChanges_Properties;

        data = data || {};

        if (data['ordersCreated'] !== undefined) {
            this.ordersCreated = data['ordersCreated'].map(x => order.Order.create(x));
        }

        if (data['ordersCancelled'] !== undefined) {
            this.ordersCancelled = data['ordersCancelled'].map(x => order.Order.create(x));
        }

        if (data['ordersFilled'] !== undefined) {
            this.ordersFilled = data['ordersFilled'].map(x => order.Order.create(x));
        }

        if (data['ordersTriggered'] !== undefined) {
            this.ordersTriggered = data['ordersTriggered'].map(x => order.Order.create(x));
        }

        if (data['tradesOpened'] !== undefined) {
            this.tradesOpened = data['tradesOpened'].map(x => new trade.TradeSummary(x));
        }

        if (data['tradesReduced'] !== undefined) {
            this.tradesReduced = data['tradesReduced'].map(x => new trade.TradeSummary(x));
        }

        if (data['tradesClosed'] !== undefined) {
            this.tradesClosed = data['tradesClosed'].map(x => new trade.TradeSummary(x));
        }

        if (data['positions'] !== undefined) {
            this.positions = data['positions'].map(x => new position.Position(x));
        }

        if (data['transactions'] !== undefined) {
            this.transactions = data['transactions'].map(x => transaction.Transaction.create(x));
        }

    }
}

class EntitySpec {
    constructor(context) {
        this.context = context;
        this.Account = Account;
        this.AccountChangesState = AccountChangesState;
        this.AccountProperties = AccountProperties;
        this.AccountSummary = AccountSummary;
        this.CalculatedAccountState = CalculatedAccountState;
        this.AccountChanges = AccountChanges;
    }

    list(
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/accounts';




        let body = {};

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['accounts'] !== undefined) {
                        response.body.accounts = msg['accounts'].map(x => new AccountProperties(x));
                    }

                }
                else if (response.statusCode == 401)
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
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/accounts/{accountID}';


        path = path.replace('{' + 'accountID' + '}', accountID);


        let body = {};

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['account'] !== undefined) {
                        response.body.account = new Account(msg['account']);
                    }

                    if (msg['lastTransactionID'] !== undefined) {
                        response.body.lastTransactionID = msg['lastTransactionID'];
                    }

                }
                else if (response.statusCode == 400)
                {
                }
                else if (response.statusCode == 401)
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

    summary(
        accountID,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/accounts/{accountID}/summary';


        path = path.replace('{' + 'accountID' + '}', accountID);


        let body = {};

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['account'] !== undefined) {
                        response.body.account = new AccountSummary(msg['account']);
                    }

                    if (msg['lastTransactionID'] !== undefined) {
                        response.body.lastTransactionID = msg['lastTransactionID'];
                    }

                }
                else if (response.statusCode == 400)
                {
                }
                else if (response.statusCode == 401)
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

    instruments(
        accountID,
        queryParams,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/accounts/{accountID}/instruments';

        queryParams = queryParams || {};

        path = path.replace('{' + 'accountID' + '}', accountID);

        path = path + "?";
        if (typeof queryParams['instruments'] !== 'undefined') {
            path = path + "instruments=" + queryParams['instruments'] + "&";
        }

        let body = {};

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['instruments'] !== undefined) {
                        response.body.instruments = msg['instruments'].map(x => new primitives.Instrument(x));
                    }

                    if (msg['lastTransactionID'] !== undefined) {
                        response.body.lastTransactionID = msg['lastTransactionID'];
                    }

                }
                else if (response.statusCode == 400)
                {
                }
                else if (response.statusCode == 401)
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

    configure(
        accountID,
        bodyParams,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/accounts/{accountID}/configuration';

        bodyParams = bodyParams || {};

        path = path.replace('{' + 'accountID' + '}', accountID);


        let body = {};

        if (typeof bodyParams['alias'] !== 'undefined')
        {
            body['alias'] = bodyParams['alias'];
        }

        if (typeof bodyParams['marginRate'] !== 'undefined')
        {
            body['marginRate'] = bodyParams['marginRate'];
        }

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['clientConfigureTransaction'] !== undefined) {
                        response.body.clientConfigureTransaction = new transaction.ClientConfigureTransaction(msg['clientConfigureTransaction']);
                    }

                    if (msg['lastTransactionID'] !== undefined) {
                        response.body.lastTransactionID = msg['lastTransactionID'];
                    }

                }
                else if (response.statusCode == 400)
                {
                    if (msg['clientConfigureRejectTransaction'] !== undefined) {
                        response.body.clientConfigureRejectTransaction = new transaction.ClientConfigureRejectTransaction(msg['clientConfigureRejectTransaction']);
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
                else if (response.statusCode == 403)
                {
                    if (msg['clientConfigureRejectTransaction'] !== undefined) {
                        response.body.clientConfigureRejectTransaction = new transaction.ClientConfigureRejectTransaction(msg['clientConfigureRejectTransaction']);
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
            'PATCH',
            path,
            body,
            undefined,
            handleResponse
        );
    }

    changes(
        accountID,
        queryParams,
        responseHandler
    )
    {
        if (!responseHandler)
        {
            throw "No responseHandler provided for API call"
        }


        let path = '/v3/accounts/{accountID}/changes';

        queryParams = queryParams || {};

        path = path.replace('{' + 'accountID' + '}', accountID);

        path = path + "?";
        if (typeof queryParams['sinceTransactionID'] !== 'undefined') {
            path = path + "sinceTransactionID=" + queryParams['sinceTransactionID'] + "&";
        }

        let body = {};

        let handleResponse = (response) => {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['changes'] !== undefined) {
                        response.body.changes = new AccountChanges(msg['changes']);
                    }

                    if (msg['state'] !== undefined) {
                        response.body.state = new AccountChangesState(msg['state']);
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
                else if (response.statusCode == 416)
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

exports.Account = Account;
exports.AccountChangesState = AccountChangesState;
exports.AccountProperties = AccountProperties;
exports.AccountSummary = AccountSummary;
exports.CalculatedAccountState = CalculatedAccountState;
exports.AccountChanges = AccountChanges;

exports.EntitySpec = EntitySpec;
