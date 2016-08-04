/* jshint esversion: 6 */

"use strict";

var Definition = require('./base').Definition;
var Property = require('./base').Property;
var Field = require('./base').Field;




const Transaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
];

class Transaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "Transaction {id}";

        this._properties = Transaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

    }

    static create(transaction) {
        if (! transaction["type"])
        {
            return new Transaction(transaction);
        }
        else if (transaction["type"] == "CREATE")
        {
            return new CreateTransaction(transaction);
        }
        else if (transaction["type"] == "CLOSE")
        {
            return new CloseTransaction(transaction);
        }
        else if (transaction["type"] == "REOPEN")
        {
            return new ReopenTransaction(transaction);
        }
        else if (transaction["type"] == "CLIENT_CONFIGURE")
        {
            return new ClientConfigureTransaction(transaction);
        }
        else if (transaction["type"] == "CLIENT_CONFIGURE_REJECT")
        {
            return new ClientConfigureRejectTransaction(transaction);
        }
        else if (transaction["type"] == "TRANSFER_FUNDS")
        {
            return new TransferFundsTransaction(transaction);
        }
        else if (transaction["type"] == "TRANSFER_FUNDS_REJECT")
        {
            return new TransferFundsRejectTransaction(transaction);
        }
        else if (transaction["type"] == "MARKET_ORDER")
        {
            return new MarketOrderTransaction(transaction);
        }
        else if (transaction["type"] == "MARKET_ORDER_REJECT")
        {
            return new MarketOrderRejectTransaction(transaction);
        }
        else if (transaction["type"] == "LIMIT_ORDER")
        {
            return new LimitOrderTransaction(transaction);
        }
        else if (transaction["type"] == "LIMIT_ORDER_REJECT")
        {
            return new LimitOrderRejectTransaction(transaction);
        }
        else if (transaction["type"] == "STOP_ORDER")
        {
            return new StopOrderTransaction(transaction);
        }
        else if (transaction["type"] == "STOP_ORDER_REJECT")
        {
            return new StopOrderRejectTransaction(transaction);
        }
        else if (transaction["type"] == "MARKET_IF_TOUCHED_ORDER")
        {
            return new MarketIfTouchedOrderTransaction(transaction);
        }
        else if (transaction["type"] == "MARKET_IF_TOUCHED_ORDER_REJECT")
        {
            return new MarketIfTouchedOrderRejectTransaction(transaction);
        }
        else if (transaction["type"] == "TAKE_PROFIT_ORDER")
        {
            return new TakeProfitOrderTransaction(transaction);
        }
        else if (transaction["type"] == "TAKE_PROFIT_ORDER_REJECT")
        {
            return new TakeProfitOrderRejectTransaction(transaction);
        }
        else if (transaction["type"] == "STOP_LOSS_ORDER")
        {
            return new StopLossOrderTransaction(transaction);
        }
        else if (transaction["type"] == "STOP_LOSS_ORDER_REJECT")
        {
            return new StopLossOrderRejectTransaction(transaction);
        }
        else if (transaction["type"] == "TRAILING_STOP_LOSS_ORDER")
        {
            return new TrailingStopLossOrderTransaction(transaction);
        }
        else if (transaction["type"] == "TRAILING_STOP_LOSS_ORDER_REJECT")
        {
            return new TrailingStopLossOrderRejectTransaction(transaction);
        }
        else if (transaction["type"] == "ORDER_FILL")
        {
            return new OrderFillTransaction(transaction);
        }
        else if (transaction["type"] == "ORDER_CANCEL")
        {
            return new OrderCancelRejectTransaction(transaction);
        }
        else if (transaction["type"] == "ORDER_CLIENT_EXTENSIONS_MODIFY")
        {
            return new OrderClientExtensionsModifyTransaction(transaction);
        }
        else if (transaction["type"] == "ORDER_CLIENT_EXTENSIONS_MODIFY_REJECT")
        {
            return new OrderClientExtensionsModifyRejectTransaction(transaction);
        }
        else if (transaction["type"] == "TRADE_CLIENT_EXTENSIONS_MODIFY")
        {
            return new TradeClientExtensionsModifyTransaction(transaction);
        }
        else if (transaction["type"] == "TRADE_CLIENT_EXTENSIONS_MODIFY_REJECT")
        {
            return new TradeClientExtensionsModifyRejectTransaction(transaction);
        }
        else if (transaction["type"] == "MARGIN_CALL_ENTER")
        {
            return new MarginCallEnterTransaction(transaction);
        }
        else if (transaction["type"] == "MARGIN_CALL_EXTEND")
        {
            return new MarginCallExtendTransaction(transaction);
        }
        else if (transaction["type"] == "MARGIN_CALL_EXIT")
        {
            return new MarginCallExitTransaction(transaction);
        }
        else if (transaction["type"] == "DAILY_FINANCING")
        {
            return new DailyFinancingTransaction(transaction);
        }
        else if (transaction["type"] == "RESET_RESETTABLE_PL")
        {
            return new ResetResettablePLTransaction(transaction);
        }

        return new Transaction(transaction);
    }
}

const CreateTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"CREATE\" in a CreateTransaction.",
        'primitive',
        'transaction.TransactionType'
    ),
    new Property(
        'divisionID',
        "Division ID",
        "The ID of the Division that the Account is in",
        'primitive',
        'integer'
    ),
    new Property(
        'siteID',
        "Site ID",
        "The ID of the Site that the Account was created at",
        'primitive',
        'integer'
    ),
    new Property(
        'accountUserID',
        "Account User ID",
        "The ID of the user that the Account was created for",
        'primitive',
        'integer'
    ),
    new Property(
        'accountNumber',
        "Account Number",
        "The number of the Account within the site/division/user",
        'primitive',
        'integer'
    ),
    new Property(
        'homeCurrency',
        "Home Currency",
        "The home currency of the Account",
        'primitive',
        'primitives.Currency'
    ),
];

class CreateTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Create Account {accountID}";

        this._nameFormat = "Transaction {id}";

        this._properties = CreateTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "CREATE";
        }

        if (data['divisionID'] !== undefined) {
            this.divisionID = data['divisionID'];
        }

        if (data['siteID'] !== undefined) {
            this.siteID = data['siteID'];
        }

        if (data['accountUserID'] !== undefined) {
            this.accountUserID = data['accountUserID'];
        }

        if (data['accountNumber'] !== undefined) {
            this.accountNumber = data['accountNumber'];
        }

        if (data['homeCurrency'] !== undefined) {
            this.homeCurrency = data['homeCurrency'];
        }

    }
}

const CloseTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"CLOSE\" in a CloseTransaction.",
        'primitive',
        'transaction.TransactionType'
    ),
];

class CloseTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Close Account {accountID}";

        this._nameFormat = "Transaction {id}";

        this._properties = CloseTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "CLOSE";
        }

    }
}

const ReopenTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"REOPEN\" in a ReopenTransaction.",
        'primitive',
        'transaction.TransactionType'
    ),
];

class ReopenTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Reopen Account {accountID}";

        this._nameFormat = "Transaction {id}";

        this._properties = ReopenTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "REOPEN";
        }

    }
}

const ClientConfigureTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"CLIENT_CONFIGURE\" in a ClientConfigureTransaction.",
        'primitive',
        'transaction.TransactionType'
    ),
    new Property(
        'alias',
        "Account Alias",
        "The client-provided alias for the Account.",
        'primitive',
        'string'
    ),
    new Property(
        'marginRate',
        "Margin Rate",
        "The margin rate override for the Account.",
        'primitive',
        'primitives.DecimalNumber'
    ),
];

class ClientConfigureTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Client Configure";

        this._nameFormat = "Transaction {id}";

        this._properties = ClientConfigureTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "CLIENT_CONFIGURE";
        }

        if (data['alias'] !== undefined) {
            this.alias = data['alias'];
        }

        if (data['marginRate'] !== undefined) {
            this.marginRate = data['marginRate'];
        }

    }
}

const ClientConfigureRejectTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"CLIENT_CONFIGURE_REJECT\" in a ClientConfigureRejectTransaction.",
        'primitive',
        'transaction.TransactionType'
    ),
    new Property(
        'alias',
        "Account Alias",
        "The client-provided alias for the Account.",
        'primitive',
        'string'
    ),
    new Property(
        'marginRate',
        "Margin Rate",
        "The margin rate override for the Account.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'rejectReason',
        "Reject Reason",
        "The reason that the Reject Transaction was created",
        'primitive',
        'transaction.TransactionRejectReason'
    ),
];

class ClientConfigureRejectTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Client Configure Reject";

        this._nameFormat = "Transaction {id}";

        this._properties = ClientConfigureRejectTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "CLIENT_CONFIGURE_REJECT";
        }

        if (data['alias'] !== undefined) {
            this.alias = data['alias'];
        }

        if (data['marginRate'] !== undefined) {
            this.marginRate = data['marginRate'];
        }

        if (data['rejectReason'] !== undefined) {
            this.rejectReason = data['rejectReason'];
        }

    }
}

const TransferFundsTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"TRANSFER_FUNDS\" in a TransferFundsTransaction.",
        'primitive',
        'transaction.TransactionType'
    ),
    new Property(
        'amount',
        "Transfer Amount",
        "The amount to deposit/withdraw from the Account in the Account's home currency. A positive value indicates a deposit, a negative value indicates a withdrawal.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'fundingReason',
        "Reason",
        "The reason that an Account is being funded.",
        'primitive',
        'transaction.FundingReason'
    ),
    new Property(
        'accountBalance',
        "Account Balance",
        "The Account's balance after funds are transferred.",
        'primitive',
        'primitives.AccountUnits'
    ),
];

class TransferFundsTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Account Transfer of {amount}";

        this._nameFormat = "Transaction {id}";

        this._properties = TransferFundsTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "TRANSFER_FUNDS";
        }

        if (data['amount'] !== undefined) {
            this.amount = data['amount'];
        }

        if (data['fundingReason'] !== undefined) {
            this.fundingReason = data['fundingReason'];
        }

        if (data['accountBalance'] !== undefined) {
            this.accountBalance = data['accountBalance'];
        }

    }
}

const TransferFundsRejectTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"TRANSFER_FUNDS_REJECT\" in a TransferFundsRejectTransaction.",
        'primitive',
        'transaction.TransactionType'
    ),
    new Property(
        'amount',
        "Transfer Amount",
        "The amount to deposit/withdraw from the Account in the Account's home currency. A positive value indicates a deposit, a negative value indicates a withdrawal.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'fundingReason',
        "Reason",
        "The reason that an Account is being funded.",
        'primitive',
        'transaction.FundingReason'
    ),
    new Property(
        'rejectReason',
        "Reject Reason",
        "The reason that the Reject Transaction was created",
        'primitive',
        'transaction.TransactionRejectReason'
    ),
];

class TransferFundsRejectTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Account Reject Transfer of {amount}";

        this._nameFormat = "Transaction {id}";

        this._properties = TransferFundsRejectTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "TRANSFER_FUNDS_REJECT";
        }

        if (data['amount'] !== undefined) {
            this.amount = data['amount'];
        }

        if (data['fundingReason'] !== undefined) {
            this.fundingReason = data['fundingReason'];
        }

        if (data['rejectReason'] !== undefined) {
            this.rejectReason = data['rejectReason'];
        }

    }
}

const MarketOrderTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"MARKET_ORDER\" in a MarketOrderTransaction.",
        'primitive',
        'transaction.TransactionType'
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
        'reason',
        "Reason",
        "The reason that the Market Order was created",
        'primitive',
        'transaction.MarketOrderReason'
    ),
    new Property(
        'clientExtensions',
        "Order Client Extensions",
        "Client Extensions to add to the Order (only provided if the Order is being created with client extensions).",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'takeProfitOnFill',
        "Take Profit On Fill",
        "The specification of the Take Profit Order that should be created for a Trade opened when the Order is filled (if such a Trade is created).",
        'object',
        'transaction.TakeProfitDetails'
    ),
    new Property(
        'stopLossOnFill',
        "Stop Loss On Fill",
        "The specification of the Stop Loss Order that should be created for a Trade opened when the Order is filled (if such a Trade is created).",
        'object',
        'transaction.StopLossDetails'
    ),
    new Property(
        'trailingStopLossOnFill',
        "Trailing Stop Loss On Fill",
        "The specification of the Trailing Stop Loss Order that should be created for a Trade that is opened when the Order is filled (if such a Trade is created).",
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

class MarketOrderTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Create Market Order {id} ({reason}): {units} of {instrument}";

        this._nameFormat = "Transaction {id}";

        this._properties = MarketOrderTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "MARKET_ORDER";
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
            this.tradeClose = new MarketOrderTradeClose(data['tradeClose']);
        }

        if (data['longPositionCloseout'] !== undefined) {
            this.longPositionCloseout = new MarketOrderPositionCloseout(data['longPositionCloseout']);
        }

        if (data['shortPositionCloseout'] !== undefined) {
            this.shortPositionCloseout = new MarketOrderPositionCloseout(data['shortPositionCloseout']);
        }

        if (data['marginCloseout'] !== undefined) {
            this.marginCloseout = new MarketOrderMarginCloseout(data['marginCloseout']);
        }

        if (data['delayedTradeClose'] !== undefined) {
            this.delayedTradeClose = new MarketOrderDelayedTradeClose(data['delayedTradeClose']);
        }

        if (data['reason'] !== undefined) {
            this.reason = data['reason'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new ClientExtensions(data['clientExtensions']);
        }

        if (data['takeProfitOnFill'] !== undefined) {
            this.takeProfitOnFill = new TakeProfitDetails(data['takeProfitOnFill']);
        }

        if (data['stopLossOnFill'] !== undefined) {
            this.stopLossOnFill = new StopLossDetails(data['stopLossOnFill']);
        }

        if (data['trailingStopLossOnFill'] !== undefined) {
            this.trailingStopLossOnFill = new TrailingStopLossDetails(data['trailingStopLossOnFill']);
        }

        if (data['tradeClientExtensions'] !== undefined) {
            this.tradeClientExtensions = new ClientExtensions(data['tradeClientExtensions']);
        }

    }
}

const MarketOrderRejectTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"MARKET_ORDER_REJECT\" in a MarketOrderRejectTransaction.",
        'primitive',
        'transaction.TransactionType'
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
        'reason',
        "Reason",
        "The reason that the Market Order was created",
        'primitive',
        'transaction.MarketOrderReason'
    ),
    new Property(
        'clientExtensions',
        "Order Client Extensions",
        "Client Extensions to add to the Order (only provided if the Order is being created with client extensions).",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'takeProfitOnFill',
        "Take Profit On Fill",
        "The specification of the Take Profit Order that should be created for a Trade opened when the Order is filled (if such a Trade is created).",
        'object',
        'transaction.TakeProfitDetails'
    ),
    new Property(
        'stopLossOnFill',
        "Stop Loss On Fill",
        "The specification of the Stop Loss Order that should be created for a Trade opened when the Order is filled (if such a Trade is created).",
        'object',
        'transaction.StopLossDetails'
    ),
    new Property(
        'trailingStopLossOnFill',
        "Trailing Stop Loss On Fill",
        "The specification of the Trailing Stop Loss Order that should be created for a Trade that is opened when the Order is filled (if such a Trade is created).",
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
        'rejectReason',
        "Reject Reason",
        "The reason that the Reject Transaction was created",
        'primitive',
        'transaction.TransactionRejectReason'
    ),
];

class MarketOrderRejectTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Reject Market Order ({reason}): {units} of {instrument}";

        this._nameFormat = "Transaction {id}";

        this._properties = MarketOrderRejectTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "MARKET_ORDER_REJECT";
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
            this.tradeClose = new MarketOrderTradeClose(data['tradeClose']);
        }

        if (data['longPositionCloseout'] !== undefined) {
            this.longPositionCloseout = new MarketOrderPositionCloseout(data['longPositionCloseout']);
        }

        if (data['shortPositionCloseout'] !== undefined) {
            this.shortPositionCloseout = new MarketOrderPositionCloseout(data['shortPositionCloseout']);
        }

        if (data['marginCloseout'] !== undefined) {
            this.marginCloseout = new MarketOrderMarginCloseout(data['marginCloseout']);
        }

        if (data['delayedTradeClose'] !== undefined) {
            this.delayedTradeClose = new MarketOrderDelayedTradeClose(data['delayedTradeClose']);
        }

        if (data['reason'] !== undefined) {
            this.reason = data['reason'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new ClientExtensions(data['clientExtensions']);
        }

        if (data['takeProfitOnFill'] !== undefined) {
            this.takeProfitOnFill = new TakeProfitDetails(data['takeProfitOnFill']);
        }

        if (data['stopLossOnFill'] !== undefined) {
            this.stopLossOnFill = new StopLossDetails(data['stopLossOnFill']);
        }

        if (data['trailingStopLossOnFill'] !== undefined) {
            this.trailingStopLossOnFill = new TrailingStopLossDetails(data['trailingStopLossOnFill']);
        }

        if (data['tradeClientExtensions'] !== undefined) {
            this.tradeClientExtensions = new ClientExtensions(data['tradeClientExtensions']);
        }

        if (data['rejectReason'] !== undefined) {
            this.rejectReason = data['rejectReason'];
        }

    }
}

const LimitOrderTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"LIMIT_ORDER\" in a LimitOrderTransaction.",
        'primitive',
        'transaction.TransactionType'
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
        'reason',
        "Reason",
        "The reason that the Limit Order was initiated",
        'primitive',
        'transaction.LimitOrderReason'
    ),
    new Property(
        'clientExtensions',
        "Order Client Extensions",
        "Client Extensions to add to the Order (only provided if the Order is being created with client extensions).",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'takeProfitOnFill',
        "Take Profit On Fill",
        "The specification of the Take Profit Order that should be created for a Trade opened when the Order is filled (if such a Trade is created).",
        'object',
        'transaction.TakeProfitDetails'
    ),
    new Property(
        'stopLossOnFill',
        "Stop Loss On Fill",
        "The specification of the Stop Loss Order that should be created for a Trade opened when the Order is filled (if such a Trade is created).",
        'object',
        'transaction.StopLossDetails'
    ),
    new Property(
        'trailingStopLossOnFill',
        "Trailing Stop Loss On Fill",
        "The specification of the Trailing Stop Loss Order that should be created for a Trade that is opened when the Order is filled (if such a Trade is created).",
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
        'replacesOrderID',
        "Replaces Order ID",
        "The ID of the Order that this Order replaces (only provided if this Order replaces an existing Order).",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'replacedOrderCancelTransactionID',
        "Replaces Order Cancel Transaction ID",
        "The ID of the Transaction that cancels the replaced Order (only provided if this Order replaces an existing Order).",
        'primitive',
        'transaction.TransactionID'
    ),
];

class LimitOrderTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Create Limit Order {id} ({reason}): {units} of {instrument} @ {price}";

        this._nameFormat = "Transaction {id}";

        this._properties = LimitOrderTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "LIMIT_ORDER";
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

        if (data['reason'] !== undefined) {
            this.reason = data['reason'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new ClientExtensions(data['clientExtensions']);
        }

        if (data['takeProfitOnFill'] !== undefined) {
            this.takeProfitOnFill = new TakeProfitDetails(data['takeProfitOnFill']);
        }

        if (data['stopLossOnFill'] !== undefined) {
            this.stopLossOnFill = new StopLossDetails(data['stopLossOnFill']);
        }

        if (data['trailingStopLossOnFill'] !== undefined) {
            this.trailingStopLossOnFill = new TrailingStopLossDetails(data['trailingStopLossOnFill']);
        }

        if (data['tradeClientExtensions'] !== undefined) {
            this.tradeClientExtensions = new ClientExtensions(data['tradeClientExtensions']);
        }

        if (data['replacesOrderID'] !== undefined) {
            this.replacesOrderID = data['replacesOrderID'];
        }

        if (data['replacedOrderCancelTransactionID'] !== undefined) {
            this.replacedOrderCancelTransactionID = data['replacedOrderCancelTransactionID'];
        }

    }
}

const LimitOrderRejectTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"LIMIT_ORDER_REJECT\" in a LimitOrderRejectTransaction.",
        'primitive',
        'transaction.TransactionType'
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
        'reason',
        "Reason",
        "The reason that the Limit Order was initiated",
        'primitive',
        'transaction.LimitOrderReason'
    ),
    new Property(
        'clientExtensions',
        "Order Client Extensions",
        "Client Extensions to add to the Order (only provided if the Order is being created with client extensions).",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'takeProfitOnFill',
        "Take Profit On Fill",
        "The specification of the Take Profit Order that should be created for a Trade opened when the Order is filled (if such a Trade is created).",
        'object',
        'transaction.TakeProfitDetails'
    ),
    new Property(
        'stopLossOnFill',
        "Stop Loss On Fill",
        "The specification of the Stop Loss Order that should be created for a Trade opened when the Order is filled (if such a Trade is created).",
        'object',
        'transaction.StopLossDetails'
    ),
    new Property(
        'trailingStopLossOnFill',
        "Trailing Stop Loss On Fill",
        "The specification of the Trailing Stop Loss Order that should be created for a Trade that is opened when the Order is filled (if such a Trade is created).",
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
        'intendedReplacesOrderID',
        "Order ID to Replace",
        "The ID of the Order that this Order was intended to replace (only provided if this Order was intended to replace an existing Order).",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'rejectReason',
        "Reject Reason",
        "The reason that the Reject Transaction was created",
        'primitive',
        'transaction.TransactionRejectReason'
    ),
];

class LimitOrderRejectTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Reject Limit Order ({reason}): {units} of {instrument} @ {price}";

        this._nameFormat = "Transaction {id}";

        this._properties = LimitOrderRejectTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "LIMIT_ORDER_REJECT";
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

        if (data['reason'] !== undefined) {
            this.reason = data['reason'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new ClientExtensions(data['clientExtensions']);
        }

        if (data['takeProfitOnFill'] !== undefined) {
            this.takeProfitOnFill = new TakeProfitDetails(data['takeProfitOnFill']);
        }

        if (data['stopLossOnFill'] !== undefined) {
            this.stopLossOnFill = new StopLossDetails(data['stopLossOnFill']);
        }

        if (data['trailingStopLossOnFill'] !== undefined) {
            this.trailingStopLossOnFill = new TrailingStopLossDetails(data['trailingStopLossOnFill']);
        }

        if (data['tradeClientExtensions'] !== undefined) {
            this.tradeClientExtensions = new ClientExtensions(data['tradeClientExtensions']);
        }

        if (data['intendedReplacesOrderID'] !== undefined) {
            this.intendedReplacesOrderID = data['intendedReplacesOrderID'];
        }

        if (data['rejectReason'] !== undefined) {
            this.rejectReason = data['rejectReason'];
        }

    }
}

const StopOrderTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"STOP_ORDER\" in a StopOrderTransaction.",
        'primitive',
        'transaction.TransactionType'
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
        'reason',
        "Reason",
        "The reason that the Stop Order was initiated",
        'primitive',
        'transaction.StopOrderReason'
    ),
    new Property(
        'clientExtensions',
        "Order Client Extensions",
        "Client Extensions to add to the Order (only provided if the Order is being created with client extensions).",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'takeProfitOnFill',
        "Take Profit On Fill",
        "The specification of the Take Profit Order that should be created for a Trade opened when the Order is filled (if such a Trade is created).",
        'object',
        'transaction.TakeProfitDetails'
    ),
    new Property(
        'stopLossOnFill',
        "Stop Loss On Fill",
        "The specification of the Stop Loss Order that should be created for a Trade opened when the Order is filled (if such a Trade is created).",
        'object',
        'transaction.StopLossDetails'
    ),
    new Property(
        'trailingStopLossOnFill',
        "Trailing Stop Loss On Fill",
        "The specification of the Trailing Stop Loss Order that should be created for a Trade that is opened when the Order is filled (if such a Trade is created).",
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
        'replacesOrderID',
        "Replaces Order ID",
        "The ID of the Order that this Order replaces (only provided if this Order replaces an existing Order).",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'replacedOrderCancelTransactionID',
        "Replaces Order Cancel Transaction ID",
        "The ID of the Transaction that cancels the replaced Order (only provided if this Order replaces an existing Order).",
        'primitive',
        'transaction.TransactionID'
    ),
];

class StopOrderTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Create Stop Order {id} ({reason}): {units} of {instrument} @ {price}";

        this._nameFormat = "Transaction {id}";

        this._properties = StopOrderTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "STOP_ORDER";
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

        if (data['reason'] !== undefined) {
            this.reason = data['reason'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new ClientExtensions(data['clientExtensions']);
        }

        if (data['takeProfitOnFill'] !== undefined) {
            this.takeProfitOnFill = new TakeProfitDetails(data['takeProfitOnFill']);
        }

        if (data['stopLossOnFill'] !== undefined) {
            this.stopLossOnFill = new StopLossDetails(data['stopLossOnFill']);
        }

        if (data['trailingStopLossOnFill'] !== undefined) {
            this.trailingStopLossOnFill = new TrailingStopLossDetails(data['trailingStopLossOnFill']);
        }

        if (data['tradeClientExtensions'] !== undefined) {
            this.tradeClientExtensions = new ClientExtensions(data['tradeClientExtensions']);
        }

        if (data['replacesOrderID'] !== undefined) {
            this.replacesOrderID = data['replacesOrderID'];
        }

        if (data['replacedOrderCancelTransactionID'] !== undefined) {
            this.replacedOrderCancelTransactionID = data['replacedOrderCancelTransactionID'];
        }

    }
}

const StopOrderRejectTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"STOP_ORDER_REJECT\" in a StopOrderRejectTransaction.",
        'primitive',
        'transaction.TransactionType'
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
        'reason',
        "Reason",
        "The reason that the Stop Order was initiated",
        'primitive',
        'transaction.StopOrderReason'
    ),
    new Property(
        'clientExtensions',
        "Order Client Extensions",
        "Client Extensions to add to the Order (only provided if the Order is being created with client extensions).",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'takeProfitOnFill',
        "Take Profit On Fill",
        "The specification of the Take Profit Order that should be created for a Trade opened when the Order is filled (if such a Trade is created).",
        'object',
        'transaction.TakeProfitDetails'
    ),
    new Property(
        'stopLossOnFill',
        "Stop Loss On Fill",
        "The specification of the Stop Loss Order that should be created for a Trade opened when the Order is filled (if such a Trade is created).",
        'object',
        'transaction.StopLossDetails'
    ),
    new Property(
        'trailingStopLossOnFill',
        "Trailing Stop Loss On Fill",
        "The specification of the Trailing Stop Loss Order that should be created for a Trade that is opened when the Order is filled (if such a Trade is created).",
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
        'intendedReplacesOrderID',
        "Order ID to Replace",
        "The ID of the Order that this Order was intended to replace (only provided if this Order was intended to replace an existing Order).",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'rejectReason',
        "Reject Reason",
        "The reason that the Reject Transaction was created",
        'primitive',
        'transaction.TransactionRejectReason'
    ),
];

class StopOrderRejectTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Reject Stop Order ({reason}): {units} of {instrument} @ {price}";

        this._nameFormat = "Transaction {id}";

        this._properties = StopOrderRejectTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "STOP_ORDER_REJECT";
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

        if (data['reason'] !== undefined) {
            this.reason = data['reason'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new ClientExtensions(data['clientExtensions']);
        }

        if (data['takeProfitOnFill'] !== undefined) {
            this.takeProfitOnFill = new TakeProfitDetails(data['takeProfitOnFill']);
        }

        if (data['stopLossOnFill'] !== undefined) {
            this.stopLossOnFill = new StopLossDetails(data['stopLossOnFill']);
        }

        if (data['trailingStopLossOnFill'] !== undefined) {
            this.trailingStopLossOnFill = new TrailingStopLossDetails(data['trailingStopLossOnFill']);
        }

        if (data['tradeClientExtensions'] !== undefined) {
            this.tradeClientExtensions = new ClientExtensions(data['tradeClientExtensions']);
        }

        if (data['intendedReplacesOrderID'] !== undefined) {
            this.intendedReplacesOrderID = data['intendedReplacesOrderID'];
        }

        if (data['rejectReason'] !== undefined) {
            this.rejectReason = data['rejectReason'];
        }

    }
}

const MarketIfTouchedOrderTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"MARKET_IF_TOUCHED_ORDER\" in a MarketIfTouchedOrderTransaction.",
        'primitive',
        'transaction.TransactionType'
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
        'reason',
        "Reason",
        "The reason that the Market-if-touched Order was initiated",
        'primitive',
        'transaction.MarketIfTouchedOrderReason'
    ),
    new Property(
        'clientExtensions',
        "Order Client Extensions",
        "Client Extensions to add to the Order (only provided if the Order is being created with client extensions).",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'takeProfitOnFill',
        "Take Profit On Fill",
        "The specification of the Take Profit Order that should be created for a Trade opened when the Order is filled (if such a Trade is created).",
        'object',
        'transaction.TakeProfitDetails'
    ),
    new Property(
        'stopLossOnFill',
        "Stop Loss On Fill",
        "The specification of the Stop Loss Order that should be created for a Trade opened when the Order is filled (if such a Trade is created).",
        'object',
        'transaction.StopLossDetails'
    ),
    new Property(
        'trailingStopLossOnFill',
        "Trailing Stop Loss On Fill",
        "The specification of the Trailing Stop Loss Order that should be created for a Trade that is opened when the Order is filled (if such a Trade is created).",
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
        'replacesOrderID',
        "Replaces Order ID",
        "The ID of the Order that this Order replaces (only provided if this Order replaces an existing Order).",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'replacedOrderCancelTransactionID',
        "Replaces Order Cancel Transaction ID",
        "The ID of the Transaction that cancels the replaced Order (only provided if this Order replaces an existing Order).",
        'primitive',
        'transaction.TransactionID'
    ),
];

class MarketIfTouchedOrderTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Create MIT Order {id} ({reason}): {units} of {instrument} @ {price}";

        this._nameFormat = "Transaction {id}";

        this._properties = MarketIfTouchedOrderTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "MARKET_IF_TOUCHED_ORDER";
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

        if (data['reason'] !== undefined) {
            this.reason = data['reason'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new ClientExtensions(data['clientExtensions']);
        }

        if (data['takeProfitOnFill'] !== undefined) {
            this.takeProfitOnFill = new TakeProfitDetails(data['takeProfitOnFill']);
        }

        if (data['stopLossOnFill'] !== undefined) {
            this.stopLossOnFill = new StopLossDetails(data['stopLossOnFill']);
        }

        if (data['trailingStopLossOnFill'] !== undefined) {
            this.trailingStopLossOnFill = new TrailingStopLossDetails(data['trailingStopLossOnFill']);
        }

        if (data['tradeClientExtensions'] !== undefined) {
            this.tradeClientExtensions = new ClientExtensions(data['tradeClientExtensions']);
        }

        if (data['replacesOrderID'] !== undefined) {
            this.replacesOrderID = data['replacesOrderID'];
        }

        if (data['replacedOrderCancelTransactionID'] !== undefined) {
            this.replacedOrderCancelTransactionID = data['replacedOrderCancelTransactionID'];
        }

    }
}

const MarketIfTouchedOrderRejectTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"MARKET_IF_TOUCHED_ORDER_REJECT\" in a MarketIfTouchedOrderRejectTransaction.",
        'primitive',
        'transaction.TransactionType'
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
        'reason',
        "Reason",
        "The reason that the Market-if-touched Order was initiated",
        'primitive',
        'transaction.MarketIfTouchedOrderReason'
    ),
    new Property(
        'clientExtensions',
        "Order Client Extensions",
        "Client Extensions to add to the Order (only provided if the Order is being created with client extensions).",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'takeProfitOnFill',
        "Take Profit On Fill",
        "The specification of the Take Profit Order that should be created for a Trade opened when the Order is filled (if such a Trade is created).",
        'object',
        'transaction.TakeProfitDetails'
    ),
    new Property(
        'stopLossOnFill',
        "Stop Loss On Fill",
        "The specification of the Stop Loss Order that should be created for a Trade opened when the Order is filled (if such a Trade is created).",
        'object',
        'transaction.StopLossDetails'
    ),
    new Property(
        'trailingStopLossOnFill',
        "Trailing Stop Loss On Fill",
        "The specification of the Trailing Stop Loss Order that should be created for a Trade that is opened when the Order is filled (if such a Trade is created).",
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
        'intendedReplacesOrderID',
        "Order ID to Replace",
        "The ID of the Order that this Order was intended to replace (only provided if this Order was intended to replace an existing Order).",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'rejectReason',
        "Reject Reason",
        "The reason that the Reject Transaction was created",
        'primitive',
        'transaction.TransactionRejectReason'
    ),
];

class MarketIfTouchedOrderRejectTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Reject MIT Order ({reason}): {units} of {instrument} @ {price}";

        this._nameFormat = "Transaction {id}";

        this._properties = MarketIfTouchedOrderRejectTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "MARKET_IF_TOUCHED_ORDER_REJECT";
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

        if (data['reason'] !== undefined) {
            this.reason = data['reason'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new ClientExtensions(data['clientExtensions']);
        }

        if (data['takeProfitOnFill'] !== undefined) {
            this.takeProfitOnFill = new TakeProfitDetails(data['takeProfitOnFill']);
        }

        if (data['stopLossOnFill'] !== undefined) {
            this.stopLossOnFill = new StopLossDetails(data['stopLossOnFill']);
        }

        if (data['trailingStopLossOnFill'] !== undefined) {
            this.trailingStopLossOnFill = new TrailingStopLossDetails(data['trailingStopLossOnFill']);
        }

        if (data['tradeClientExtensions'] !== undefined) {
            this.tradeClientExtensions = new ClientExtensions(data['tradeClientExtensions']);
        }

        if (data['intendedReplacesOrderID'] !== undefined) {
            this.intendedReplacesOrderID = data['intendedReplacesOrderID'];
        }

        if (data['rejectReason'] !== undefined) {
            this.rejectReason = data['rejectReason'];
        }

    }
}

const TakeProfitOrderTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"TAKE_PROFIT_ORDER\" in a TakeProfitOrderTransaction.",
        'primitive',
        'transaction.TransactionType'
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
        'reason',
        "Reason",
        "The reason that the Take Profit Order was initiated",
        'primitive',
        'transaction.TakeProfitOrderReason'
    ),
    new Property(
        'clientExtensions',
        "Order Client Extensions",
        "Client Extensions to add to the Order (only provided if the Order is being created with client extensions).",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'orderFillTransactionID',
        "Order Fill Transaction ID",
        "The ID of the OrderFill Transaction that caused this Order to be created (only provided if this Order was created automatically when another Order was filled).",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'replacesOrderID',
        "Replaces Order ID",
        "The ID of the Order that this Order replaces (only provided if this Order replaces an existing Order).",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'replacedOrderCancelTransactionID',
        "Replaces Order Cancel Transaction ID",
        "The ID of the Transaction that cancels the replaced Order (only provided if this Order replaces an existing Order).",
        'primitive',
        'transaction.TransactionID'
    ),
];

class TakeProfitOrderTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Create Take Profit Order {id} ({reason}): Close Trade {tradeID} @ {price}";

        this._nameFormat = "Transaction {id}";

        this._properties = TakeProfitOrderTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "TAKE_PROFIT_ORDER";
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

        if (data['reason'] !== undefined) {
            this.reason = data['reason'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new ClientExtensions(data['clientExtensions']);
        }

        if (data['orderFillTransactionID'] !== undefined) {
            this.orderFillTransactionID = data['orderFillTransactionID'];
        }

        if (data['replacesOrderID'] !== undefined) {
            this.replacesOrderID = data['replacesOrderID'];
        }

        if (data['replacedOrderCancelTransactionID'] !== undefined) {
            this.replacedOrderCancelTransactionID = data['replacedOrderCancelTransactionID'];
        }

    }
}

const TakeProfitOrderRejectTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"TAKE_PROFIT_ORDER_REJECT\" in a TakeProfitOrderRejectTransaction.",
        'primitive',
        'transaction.TransactionType'
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
        'reason',
        "Reason",
        "The reason that the Take Profit Order was initiated",
        'primitive',
        'transaction.TakeProfitOrderReason'
    ),
    new Property(
        'clientExtensions',
        "Order Client Extensions",
        "Client Extensions to add to the Order (only provided if the Order is being created with client extensions).",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'orderFillTransactionID',
        "Order Fill Transaction ID",
        "The ID of the OrderFill Transaction that caused this Order to be created (only provided if this Order was created automatically when another Order was filled).",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'intendedReplacesOrderID',
        "Order ID to Replace",
        "The ID of the Order that this Order was intended to replace (only provided if this Order was intended to replace an existing Order).",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'rejectReason',
        "Reject Reason",
        "The reason that the Reject Transaction was created",
        'primitive',
        'transaction.TransactionRejectReason'
    ),
];

class TakeProfitOrderRejectTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Reject Take Profit Order ({reason}): Close Trade {tradeID} @ {price}";

        this._nameFormat = "Transaction {id}";

        this._properties = TakeProfitOrderRejectTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "TAKE_PROFIT_ORDER_REJECT";
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

        if (data['reason'] !== undefined) {
            this.reason = data['reason'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new ClientExtensions(data['clientExtensions']);
        }

        if (data['orderFillTransactionID'] !== undefined) {
            this.orderFillTransactionID = data['orderFillTransactionID'];
        }

        if (data['intendedReplacesOrderID'] !== undefined) {
            this.intendedReplacesOrderID = data['intendedReplacesOrderID'];
        }

        if (data['rejectReason'] !== undefined) {
            this.rejectReason = data['rejectReason'];
        }

    }
}

const StopLossOrderTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"STOP_LOSS_ORDER\" in a StopLossOrderTransaction.",
        'primitive',
        'transaction.TransactionType'
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
        'reason',
        "Reason",
        "The reason that the Stop Loss Order was initiated",
        'primitive',
        'transaction.StopLossOrderReason'
    ),
    new Property(
        'clientExtensions',
        "Order Client Extensions",
        "Client Extensions to add to the Order (only provided if the Order is being created with client extensions).",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'orderFillTransactionID',
        "Order Fill Transaction ID",
        "The ID of the OrderFill Transaction that caused this Order to be created (only provided if this Order was created automatically when another Order was filled).",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'replacesOrderID',
        "Replaces Order ID",
        "The ID of the Order that this Order replaces (only provided if this Order replaces an existing Order).",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'replacedOrderCancelTransactionID',
        "Replaces Order Cancel Transaction ID",
        "The ID of the Transaction that cancels the replaced Order (only provided if this Order replaces an existing Order).",
        'primitive',
        'transaction.TransactionID'
    ),
];

class StopLossOrderTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Create Stop Loss Order {id} ({reason}): Close Trade {tradeID} @ {price}";

        this._nameFormat = "Transaction {id}";

        this._properties = StopLossOrderTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "STOP_LOSS_ORDER";
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

        if (data['reason'] !== undefined) {
            this.reason = data['reason'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new ClientExtensions(data['clientExtensions']);
        }

        if (data['orderFillTransactionID'] !== undefined) {
            this.orderFillTransactionID = data['orderFillTransactionID'];
        }

        if (data['replacesOrderID'] !== undefined) {
            this.replacesOrderID = data['replacesOrderID'];
        }

        if (data['replacedOrderCancelTransactionID'] !== undefined) {
            this.replacedOrderCancelTransactionID = data['replacedOrderCancelTransactionID'];
        }

    }
}

const StopLossOrderRejectTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"STOP_LOSS_ORDER_REJECT\" in a StopLossOrderRejectTransaction.",
        'primitive',
        'transaction.TransactionType'
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
        'reason',
        "Reason",
        "The reason that the Stop Loss Order was initiated",
        'primitive',
        'transaction.StopLossOrderReason'
    ),
    new Property(
        'clientExtensions',
        "Order Client Extensions",
        "Client Extensions to add to the Order (only provided if the Order is being created with client extensions).",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'orderFillTransactionID',
        "Order Fill Transaction ID",
        "The ID of the OrderFill Transaction that caused this Order to be created (only provided if this Order was created automatically when another Order was filled).",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'intendedReplacesOrderID',
        "Order ID to Replace",
        "The ID of the Order that this Order was intended to replace (only provided if this Order was intended to replace an existing Order).",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'rejectReason',
        "Reject Reason",
        "The reason that the Reject Transaction was created",
        'primitive',
        'transaction.TransactionRejectReason'
    ),
];

class StopLossOrderRejectTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Reject Stop Loss Order ({reason}): Close Trade {tradeID} @ {price}";

        this._nameFormat = "Transaction {id}";

        this._properties = StopLossOrderRejectTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "STOP_LOSS_ORDER_REJECT";
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

        if (data['reason'] !== undefined) {
            this.reason = data['reason'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new ClientExtensions(data['clientExtensions']);
        }

        if (data['orderFillTransactionID'] !== undefined) {
            this.orderFillTransactionID = data['orderFillTransactionID'];
        }

        if (data['intendedReplacesOrderID'] !== undefined) {
            this.intendedReplacesOrderID = data['intendedReplacesOrderID'];
        }

        if (data['rejectReason'] !== undefined) {
            this.rejectReason = data['rejectReason'];
        }

    }
}

const TrailingStopLossOrderTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"TRAILING_STOP_LOSS_ORDER\" in a TrailingStopLossOrderTransaction.",
        'primitive',
        'transaction.TransactionType'
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
        'reason',
        "Reason",
        "The reason that the Trailing Stop Loss Order was initiated",
        'primitive',
        'transaction.TrailingStopLossOrderReason'
    ),
    new Property(
        'clientExtensions',
        "Order Client Extensions",
        "Client Extensions to add to the Order (only provided if the Order is being created with client extensions).",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'orderFillTransactionID',
        "Order Fill Transaction ID",
        "The ID of the OrderFill Transaction that caused this Order to be created (only provided if this Order was created automatically when another Order was filled).",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'replacesOrderID',
        "Replaces Order ID",
        "The ID of the Order that this Order replaces (only provided if this Order replaces an existing Order).",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'replacedOrderCancelTransactionID',
        "Replaces Order Cancel Transaction ID",
        "The ID of the Transaction that cancels the replaced Order (only provided if this Order replaces an existing Order).",
        'primitive',
        'transaction.TransactionID'
    ),
];

class TrailingStopLossOrderTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Create Trailing Stop Loss Order {id} ({reason}): Close Trade {tradeID}";

        this._nameFormat = "Transaction {id}";

        this._properties = TrailingStopLossOrderTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "TRAILING_STOP_LOSS_ORDER";
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

        if (data['reason'] !== undefined) {
            this.reason = data['reason'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new ClientExtensions(data['clientExtensions']);
        }

        if (data['orderFillTransactionID'] !== undefined) {
            this.orderFillTransactionID = data['orderFillTransactionID'];
        }

        if (data['replacesOrderID'] !== undefined) {
            this.replacesOrderID = data['replacesOrderID'];
        }

        if (data['replacedOrderCancelTransactionID'] !== undefined) {
            this.replacedOrderCancelTransactionID = data['replacedOrderCancelTransactionID'];
        }

    }
}

const TrailingStopLossOrderRejectTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"TRAILING_STOP_LOSS_ORDER_REJECT\" in a TrailingStopLossOrderRejectTransaction.",
        'primitive',
        'transaction.TransactionType'
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
        'reason',
        "Reason",
        "The reason that the Trailing Stop Loss Order was initiated",
        'primitive',
        'transaction.TrailingStopLossOrderReason'
    ),
    new Property(
        'clientExtensions',
        "Order Client Extensions",
        "Client Extensions to add to the Order (only provided if the Order is being created with client extensions).",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'orderFillTransactionID',
        "Order Fill Transaction ID",
        "The ID of the OrderFill Transaction that caused this Order to be created (only provided if this Order was created automatically when another Order was filled).",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'intendedReplacesOrderID',
        "Order ID to Replace",
        "The ID of the Order that this Order was intended to replace (only provided if this Order was intended to replace an existing Order).",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'rejectReason',
        "Reject Reason",
        "The reason that the Reject Transaction was created",
        'primitive',
        'transaction.TransactionRejectReason'
    ),
];

class TrailingStopLossOrderRejectTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Reject Trailing Stop Loss Order ({reason}): Close Trade {tradeID}";

        this._nameFormat = "Transaction {id}";

        this._properties = TrailingStopLossOrderRejectTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "TRAILING_STOP_LOSS_ORDER_REJECT";
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

        if (data['reason'] !== undefined) {
            this.reason = data['reason'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new ClientExtensions(data['clientExtensions']);
        }

        if (data['orderFillTransactionID'] !== undefined) {
            this.orderFillTransactionID = data['orderFillTransactionID'];
        }

        if (data['intendedReplacesOrderID'] !== undefined) {
            this.intendedReplacesOrderID = data['intendedReplacesOrderID'];
        }

        if (data['rejectReason'] !== undefined) {
            this.rejectReason = data['rejectReason'];
        }

    }
}

const OrderFillTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"ORDER_FILL\" for an OrderFillTransaction.",
        'primitive',
        'transaction.TransactionType'
    ),
    new Property(
        'orderID',
        "Filled Order ID",
        "The ID of the Order filled.",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'clientOrderID',
        "Filled Client Order ID",
        "The client Order ID of the Order filled (only provided if the client has assigned one).",
        'primitive',
        'transaction.ClientID'
    ),
    new Property(
        'instrument',
        "Fill Instrument",
        "The name of the filled Order's instrument.",
        'primitive',
        'primitives.InstrumentName'
    ),
    new Property(
        'units',
        "Fill Units",
        "The number of units filled by the Order.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'price',
        "Fill Price",
        "The average market price that the Order was filled at.",
        'primitive',
        'pricing.PriceValue'
    ),
    new Property(
        'reason',
        "Fill Reason",
        "The reason that an Order was filled",
        'primitive',
        'transaction.OrderFillReason'
    ),
    new Property(
        'pl',
        "Profit/Loss",
        "The profit or loss incurred when the Order was filled.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'financing',
        "Financing",
        "The financing paid or collected when the Order was filled.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'accountBalance',
        "Account Balance",
        "The Account's balance after the Order was filled.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'tradeOpened',
        "Trade Opened",
        "The Trade that was opened when the Order was filled (only  provided if filling the Order resulted in a new Trade).",
        'object',
        'transaction.TradeOpen'
    ),
    new Property(
        'tradesClosed',
        "Trades Closed",
        "The Trades that were closed when the Order was filled (only provided if filling the Order resulted in a closing open Trades).",
        'array_object',
        'TradeReduce'
    ),
    new Property(
        'tradeReduced',
        "Trade Reduced",
        "The Trade that was reduced when the Order was filled (only provided if filling the Order resulted in reducing an open Trade).",
        'object',
        'transaction.TradeReduce'
    ),
    new Property(
        'vwapReceipt',
        "VWAP Receipt",
        "The receipts of filled units with their prices that contributed to the volume-weighted average price that the entire Order was filled at.",
        'array_object',
        'VWAPReceipt'
    ),
    new Property(
        'accountFinancingMode',
        "Account Financing Mode",
        "The account financing mode at the time of the Order fill.",
        'primitive',
        'account.AccountFinancingMode'
    ),
    new Property(
        'liquidityRegenerationSchedule',
        "Liquidity Regeneration Schedule",
        "The liquidity regeneration schedule to in effect for this Account and instrument immediately following the OrderFill",
        'object',
        'transaction.LiquidityRegenerationSchedule'
    ),
];

class OrderFillTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Fill Order {orderID} ({reason}): {units} of {instrument} @ {price}";

        this._nameFormat = "Transaction {id}";

        this._properties = OrderFillTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "ORDER_FILL";
        }

        if (data['orderID'] !== undefined) {
            this.orderID = data['orderID'];
        }

        if (data['clientOrderID'] !== undefined) {
            this.clientOrderID = data['clientOrderID'];
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

        if (data['reason'] !== undefined) {
            this.reason = data['reason'];
        }

        if (data['pl'] !== undefined) {
            this.pl = data['pl'];
        }

        if (data['financing'] !== undefined) {
            this.financing = data['financing'];
        }

        if (data['accountBalance'] !== undefined) {
            this.accountBalance = data['accountBalance'];
        }

        if (data['tradeOpened'] !== undefined) {
            this.tradeOpened = new TradeOpen(data['tradeOpened']);
        }

        if (data['tradesClosed'] !== undefined) {
            this.tradesClosed = data['tradesClosed'].map(x => new TradeReduce(x));
        }

        if (data['tradeReduced'] !== undefined) {
            this.tradeReduced = new TradeReduce(data['tradeReduced']);
        }

        if (data['vwapReceipt'] !== undefined) {
            this.vwapReceipt = data['vwapReceipt'].map(x => new VWAPReceipt(x));
        }

        if (data['accountFinancingMode'] !== undefined) {
            this.accountFinancingMode = data['accountFinancingMode'];
        }

        if (data['liquidityRegenerationSchedule'] !== undefined) {
            this.liquidityRegenerationSchedule = new LiquidityRegenerationSchedule(data['liquidityRegenerationSchedule']);
        }

    }
}

const OrderCancelTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"ORDER_CANCEL\" for an OrderCancelTransaction.",
        'primitive',
        'transaction.TransactionType'
    ),
    new Property(
        'orderID',
        "Cancelled Order ID",
        "The ID of the Order cancelled",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'clientOrderID',
        "Cancelled Client Order ID",
        "The client ID of the Order cancelled (only provided if the Order has a client Order ID).",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'reason',
        "Cancel Reason",
        "The reason that the Order was cancelled.",
        'primitive',
        'transaction.OrderCancelReason'
    ),
    new Property(
        'replacedByOrderID',
        "Replaced By Order ID",
        "The ID of the Order that replaced this Order (only provided if this Order was cancelled for replacement).",
        'primitive',
        'order.OrderID'
    ),
];

class OrderCancelTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Cancel Order {orderID}";

        this._nameFormat = "Transaction {id}";

        this._properties = OrderCancelTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }

        if (data['orderID'] !== undefined) {
            this.orderID = data['orderID'];
        }

        if (data['clientOrderID'] !== undefined) {
            this.clientOrderID = data['clientOrderID'];
        }

        if (data['reason'] !== undefined) {
            this.reason = data['reason'];
        }

        if (data['replacedByOrderID'] !== undefined) {
            this.replacedByOrderID = data['replacedByOrderID'];
        }

    }
}

const OrderCancelRejectTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"ORDER_CANCEL_REJECT\" for an OrderCancelRejectTransaction.",
        'primitive',
        'transaction.TransactionType'
    ),
    new Property(
        'orderID',
        "Order ID",
        "The ID of the Order intended to be cancelled",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'clientOrderID',
        "Client Order ID",
        "The client ID of the Order intended to be cancelled (only provided if the Order has a client Order ID).",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'reason',
        "Cancel Reason",
        "The reason that the Order was to be cancelled.",
        'primitive',
        'transaction.OrderCancelReason'
    ),
    new Property(
        'rejectReason',
        "Reject Reason",
        "The reason that the Reject Transaction was created",
        'primitive',
        'transaction.TransactionRejectReason'
    ),
];

class OrderCancelRejectTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Order Cancel Reject {orderID}";

        this._nameFormat = "Transaction {id}";

        this._properties = OrderCancelRejectTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "ORDER_CANCEL";
        }

        if (data['orderID'] !== undefined) {
            this.orderID = data['orderID'];
        }

        if (data['clientOrderID'] !== undefined) {
            this.clientOrderID = data['clientOrderID'];
        }

        if (data['reason'] !== undefined) {
            this.reason = data['reason'];
        }

        if (data['rejectReason'] !== undefined) {
            this.rejectReason = data['rejectReason'];
        }

    }
}

const OrderClientExtensionsModifyTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"ORDER_CLIENT_EXTENSIONS_MODIFY\" for a OrderClienteExtensionsModifyTransaction.",
        'primitive',
        'transaction.TransactionType'
    ),
    new Property(
        'orderID',
        "Order ID",
        "The ID of the Order who's client extensions are to be modified.",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'clientOrderID',
        "Client Order ID",
        "The original Client ID of the Order who's client extensions are to be modified.",
        'primitive',
        'transaction.ClientID'
    ),
    new Property(
        'orderClientExtensionsModify',
        "Order Extensions",
        "The new Client Extensions for the Order.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'tradeClientExtensionsModify',
        "Trade Extensions",
        "The new Client Extensions for the Order's Trade on fill.",
        'object',
        'transaction.ClientExtensions'
    ),
];

class OrderClientExtensionsModifyTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Modify Order {orderID} Client Extensions";

        this._nameFormat = "Transaction {id}";

        this._properties = OrderClientExtensionsModifyTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "ORDER_CLIENT_EXTENSIONS_MODIFY";
        }

        if (data['orderID'] !== undefined) {
            this.orderID = data['orderID'];
        }

        if (data['clientOrderID'] !== undefined) {
            this.clientOrderID = data['clientOrderID'];
        }

        if (data['orderClientExtensionsModify'] !== undefined) {
            this.orderClientExtensionsModify = new ClientExtensions(data['orderClientExtensionsModify']);
        }

        if (data['tradeClientExtensionsModify'] !== undefined) {
            this.tradeClientExtensionsModify = new ClientExtensions(data['tradeClientExtensionsModify']);
        }

    }
}

const OrderClientExtensionsModifyRejectTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"ORDER_CLIENT_EXTENSIONS_MODIFY_REJECT\" for a OrderClientExtensionsModifyRejectTransaction.",
        'primitive',
        'transaction.TransactionType'
    ),
    new Property(
        'orderID',
        "Order ID",
        "The ID of the Order who's client extensions are to be modified.",
        'primitive',
        'order.OrderID'
    ),
    new Property(
        'clientOrderID',
        "Client Order ID",
        "The original Client ID of the Order who's client extensions are to be modified.",
        'primitive',
        'transaction.ClientID'
    ),
    new Property(
        'orderClientExtensionsModify',
        "Order Extensions",
        "The new Client Extensions for the Order.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'tradeClientExtensionsModify',
        "Trade Extensions",
        "The new Client Extensions for the Order's Trade on fill.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'rejectReason',
        "Reject Reason",
        "The reason that the Reject Transaction was created",
        'primitive',
        'transaction.TransactionRejectReason'
    ),
];

class OrderClientExtensionsModifyRejectTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Reject Modify Order {orderID} Client Extensions";

        this._nameFormat = "Transaction {id}";

        this._properties = OrderClientExtensionsModifyRejectTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "ORDER_CLIENT_EXTENSIONS_MODIFY_REJECT";
        }

        if (data['orderID'] !== undefined) {
            this.orderID = data['orderID'];
        }

        if (data['clientOrderID'] !== undefined) {
            this.clientOrderID = data['clientOrderID'];
        }

        if (data['orderClientExtensionsModify'] !== undefined) {
            this.orderClientExtensionsModify = new ClientExtensions(data['orderClientExtensionsModify']);
        }

        if (data['tradeClientExtensionsModify'] !== undefined) {
            this.tradeClientExtensionsModify = new ClientExtensions(data['tradeClientExtensionsModify']);
        }

        if (data['rejectReason'] !== undefined) {
            this.rejectReason = data['rejectReason'];
        }

    }
}

const TradeClientExtensionsModifyTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"TRADE_CLIENT_EXTENSIONS_MODIFY\" for a TradeClientExtensionsModifyTransaction.",
        'primitive',
        'transaction.TransactionType'
    ),
    new Property(
        'tradeID',
        "Trade ID",
        "The ID of the Trade who's client extensions are to be modified.",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'clientTradeID',
        "Client Trade ID",
        "The original Client ID of the Trade who's client extensions are to be modified.",
        'primitive',
        'transaction.ClientID'
    ),
    new Property(
        'tradeClientExtensionsModify',
        "Extensions",
        "The new Client Extensions for the Trade.",
        'object',
        'transaction.ClientExtensions'
    ),
];

class TradeClientExtensionsModifyTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Modify Trade {tradeID} Client Extensions";

        this._nameFormat = "Transaction {id}";

        this._properties = TradeClientExtensionsModifyTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "TRADE_CLIENT_EXTENSIONS_MODIFY";
        }

        if (data['tradeID'] !== undefined) {
            this.tradeID = data['tradeID'];
        }

        if (data['clientTradeID'] !== undefined) {
            this.clientTradeID = data['clientTradeID'];
        }

        if (data['tradeClientExtensionsModify'] !== undefined) {
            this.tradeClientExtensionsModify = new ClientExtensions(data['tradeClientExtensionsModify']);
        }

    }
}

const TradeClientExtensionsModifyRejectTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"TRADE_CLIENT_EXTENSIONS_MODIFY_REJECT\" for a TradeClientExtensionsModifyRejectTransaction.",
        'primitive',
        'transaction.TransactionType'
    ),
    new Property(
        'tradeID',
        "Trade ID",
        "The ID of the Trade who's client extensions are to be modified.",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'clientTradeID',
        "Client Trade ID",
        "The original Client ID of the Trade who's client extensions are to be modified.",
        'primitive',
        'transaction.ClientID'
    ),
    new Property(
        'tradeClientExtensionsModify',
        "Extensions",
        "The new Client Extensions for the Trade.",
        'object',
        'transaction.ClientExtensions'
    ),
    new Property(
        'rejectReason',
        "Reject Reason",
        "The reason that the Reject Transaction was created",
        'primitive',
        'transaction.TransactionRejectReason'
    ),
];

class TradeClientExtensionsModifyRejectTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Reject Modify Trade {tradeID} Client Extensions";

        this._nameFormat = "Transaction {id}";

        this._properties = TradeClientExtensionsModifyRejectTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "TRADE_CLIENT_EXTENSIONS_MODIFY_REJECT";
        }

        if (data['tradeID'] !== undefined) {
            this.tradeID = data['tradeID'];
        }

        if (data['clientTradeID'] !== undefined) {
            this.clientTradeID = data['clientTradeID'];
        }

        if (data['tradeClientExtensionsModify'] !== undefined) {
            this.tradeClientExtensionsModify = new ClientExtensions(data['tradeClientExtensionsModify']);
        }

        if (data['rejectReason'] !== undefined) {
            this.rejectReason = data['rejectReason'];
        }

    }
}

const MarginCallEnterTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"MARGIN_CALL_ENTER\" for an MarginCallEnterTransaction.",
        'primitive',
        'transaction.TransactionType'
    ),
];

class MarginCallEnterTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Margin Call Enter";

        this._nameFormat = "Transaction {id}";

        this._properties = MarginCallEnterTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "MARGIN_CALL_ENTER";
        }

    }
}

const MarginCallExtendTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"MARGIN_CALL_EXTEND\" for an MarginCallExtendTransaction.",
        'primitive',
        'transaction.TransactionType'
    ),
    new Property(
        'extensionNumber',
        "Extension Number",
        "The number of the extensions to the Account's current margin call that have been applied. This value will be set to 1 for the first MarginCallExtend Transaction",
        'primitive',
        'integer'
    ),
];

class MarginCallExtendTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Margin Call Enter";

        this._nameFormat = "Transaction {id}";

        this._properties = MarginCallExtendTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "MARGIN_CALL_EXTEND";
        }

        if (data['extensionNumber'] !== undefined) {
            this.extensionNumber = data['extensionNumber'];
        }

    }
}

const MarginCallExitTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"MARGIN_CALL_EXIT\" for an MarginCallExitTransaction.",
        'primitive',
        'transaction.TransactionType'
    ),
];

class MarginCallExitTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Margin Call Exit";

        this._nameFormat = "Transaction {id}";

        this._properties = MarginCallExitTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "MARGIN_CALL_EXIT";
        }

    }
}

const DelayedTradeClosureTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'reason',
        "Reason",
        "The reason for the delayed trade closure",
        'primitive',
        'transaction.MarketOrderReason'
    ),
    new Property(
        'tradeIDs',
        "Trade ID's",
        "List of Trade ID's identifying the open trades that will be closed when their respective instruments become tradeable",
        'primitive',
        'trade.TradeID'
    ),
];

class DelayedTradeClosureTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Delayed Trade Closure";

        this._nameFormat = "Transaction {id}";

        this._properties = DelayedTradeClosureTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['reason'] !== undefined) {
            this.reason = data['reason'];
        }

        if (data['tradeIDs'] !== undefined) {
            this.tradeIDs = data['tradeIDs'];
        }

    }
}

const DailyFinancingTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"DAILY_FINANCING\" for a DailyFinancingTransaction.",
        'primitive',
        'transaction.TransactionType'
    ),
    new Property(
        'financing',
        "Financing",
        "The amount of financing paid/collected for the Account.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'accountBalance',
        "Account Balance",
        "The Account's balance after daily financing.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'accountFinancingMode',
        "Account Financing Mode",
        "The account financing mode at the time of the daily financing.",
        'primitive',
        'account.AccountFinancingMode'
    ),
    new Property(
        'positionFinancings',
        "Per-Position Financing",
        "The financing paid/collected for each Position in the Account.",
        'array_object',
        'PositionFinancing'
    ),
];

class DailyFinancingTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "Daily Account Financing ({financing})";

        this._nameFormat = "Transaction {id}";

        this._properties = DailyFinancingTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "DAILY_FINANCING";
        }

        if (data['financing'] !== undefined) {
            this.financing = data['financing'];
        }

        if (data['accountBalance'] !== undefined) {
            this.accountBalance = data['accountBalance'];
        }

        if (data['accountFinancingMode'] !== undefined) {
            this.accountFinancingMode = data['accountFinancingMode'];
        }

        if (data['positionFinancings'] !== undefined) {
            this.positionFinancings = data['positionFinancings'].map(x => new PositionFinancing(x));
        }

    }
}

const ResetResettablePLTransaction_Properties = [
    new Property(
        'id',
        "Transaction ID",
        "The Transaction's Identifier.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'time',
        "Time",
        "The date/time when the Transaction was created.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'userID',
        "User ID",
        "The ID of the user that initiated the creation of the Transaction.",
        'primitive',
        'integer'
    ),
    new Property(
        'accountID',
        "Account ID",
        "The ID of the Account the Transaction was created for.",
        'primitive',
        'account.AccountID'
    ),
    new Property(
        'batchID',
        "Transaction Batch ID",
        "The ID of the \"batch\" that the Transaction belongs to. Transactions in the same batch are applied to the Account simultaneously.",
        'primitive',
        'transaction.TransactionID'
    ),
    new Property(
        'type',
        "Type",
        "The Type of the Transaction. Always set to \"RESET_RESETTABLE_PL\" for a ResetResettablePLTransaction.",
        'primitive',
        'transaction.TransactionType'
    ),
];

class ResetResettablePLTransaction extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "PL Reset";

        this._nameFormat = "Transaction {id}";

        this._properties = ResetResettablePLTransaction_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['time'] !== undefined) {
            this.time = data['time'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['accountID'] !== undefined) {
            this.accountID = data['accountID'];
        }

        if (data['batchID'] !== undefined) {
            this.batchID = data['batchID'];
        }

        if (data['type'] !== undefined) {
            this.type = data['type'];
        }
        else {
            this.type = "RESET_RESETTABLE_PL";
        }

    }
}

const ClientExtensions_Properties = [
    new Property(
        'id',
        "Client ID",
        "The Client ID of the Order/Trade",
        'primitive',
        'transaction.ClientID'
    ),
    new Property(
        'tag',
        "Tag",
        "A tag associated with the Order/Trade",
        'primitive',
        'transaction.ClientTag'
    ),
    new Property(
        'comment',
        "Comment",
        "A comment associated with the Order/Trade",
        'primitive',
        'transaction.ClientComment'
    ),
];

class ClientExtensions extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = ClientExtensions_Properties;

        data = data || {};

        if (data['id'] !== undefined) {
            this.id = data['id'];
        }

        if (data['tag'] !== undefined) {
            this.tag = data['tag'];
        }

        if (data['comment'] !== undefined) {
            this.comment = data['comment'];
        }

    }
}

const TakeProfitDetails_Properties = [
    new Property(
        'price',
        "Price",
        "The price that the Take Profit Order will be triggered at.",
        'primitive',
        'pricing.PriceValue'
    ),
    new Property(
        'timeInForce',
        "Time In Force",
        "The time in force for the created Take Profit Order. This may only be GTC, GTD or GFD.",
        'primitive',
        'order.TimeInForce'
    ),
    new Property(
        'gtdTime',
        "GTD Time",
        "The date when the Take Profit Order will be cancelled on if timeInForce is GTD.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'clientExtensions',
        "Client Extensions",
        "The Client Extensions to add to the Take Profit Order when created.",
        'object',
        'transaction.ClientExtensions'
    ),
];

class TakeProfitDetails extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = TakeProfitDetails_Properties;

        data = data || {};

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
            this.clientExtensions = new ClientExtensions(data['clientExtensions']);
        }

    }
}

const StopLossDetails_Properties = [
    new Property(
        'price',
        "Price",
        "The price that the Stop Loss Order will be triggered at.",
        'primitive',
        'pricing.PriceValue'
    ),
    new Property(
        'timeInForce',
        "Time In Force",
        "The time in force for the created Stop Loss Order. This may only be GTC, GTD or GFD.",
        'primitive',
        'order.TimeInForce'
    ),
    new Property(
        'gtdTime',
        "GTD Time",
        "The date when the Stop Loss Order will be cancelled on if timeInForce is GTD.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'clientExtensions',
        "Client Extensions",
        "The Client Extensions to add to the Stop Loss Order when created.",
        'object',
        'transaction.ClientExtensions'
    ),
];

class StopLossDetails extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = StopLossDetails_Properties;

        data = data || {};

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
            this.clientExtensions = new ClientExtensions(data['clientExtensions']);
        }

    }
}

const TrailingStopLossDetails_Properties = [
    new Property(
        'distance',
        "Trailing Price Distance",
        "The distance (in price units) from the Trade's fill price that the Trailing Stop Loss Order will be triggered at.",
        'primitive',
        'pricing.PriceValue'
    ),
    new Property(
        'timeInForce',
        "Time In Force",
        "The time in force for the created Trailing Stop Loss Order. This may only be GTC, GTD or GFD.",
        'primitive',
        'order.TimeInForce'
    ),
    new Property(
        'gtdTime',
        "GTD Time",
        "The date when the Trailing Stop Loss Order will be cancelled on if timeInForce is GTD.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'clientExtensions',
        "Client Extensions",
        "The Client Extensions to add to the Trailing Stop Loss Order when created.",
        'object',
        'transaction.ClientExtensions'
    ),
];

class TrailingStopLossDetails extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = TrailingStopLossDetails_Properties;

        data = data || {};

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
            this.clientExtensions = new ClientExtensions(data['clientExtensions']);
        }

    }
}

const TradeOpen_Properties = [
    new Property(
        'tradeID',
        "Trade ID",
        "The ID of the Trade that was opened",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'units',
        "Amount",
        "The number of units opened by the Trade",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'clientExtensions',
        "Client Extensions",
        "The client extensions for the newly opened Trade",
        'object',
        'transaction.ClientExtensions'
    ),
];

class TradeOpen extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = TradeOpen_Properties;

        data = data || {};

        if (data['tradeID'] !== undefined) {
            this.tradeID = data['tradeID'];
        }

        if (data['units'] !== undefined) {
            this.units = data['units'];
        }

        if (data['clientExtensions'] !== undefined) {
            this.clientExtensions = new ClientExtensions(data['clientExtensions']);
        }

    }
}

const TradeReduce_Properties = [
    new Property(
        'tradeID',
        "Trade ID",
        "The ID of the Trade that was reduced or closed",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'units',
        "Amount",
        "The number of units that the Trade was reduced by",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'realizedPL',
        "Profit/Loss",
        "The PL realized when reducing the Trade",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'financing',
        "Financing",
        "The financing paid/collected when reducing the Trade",
        'primitive',
        'primitives.AccountUnits'
    ),
];

class TradeReduce extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = TradeReduce_Properties;

        data = data || {};

        if (data['tradeID'] !== undefined) {
            this.tradeID = data['tradeID'];
        }

        if (data['units'] !== undefined) {
            this.units = data['units'];
        }

        if (data['realizedPL'] !== undefined) {
            this.realizedPL = data['realizedPL'];
        }

        if (data['financing'] !== undefined) {
            this.financing = data['financing'];
        }

    }
}

const MarketOrderTradeClose_Properties = [
    new Property(
        'tradeID',
        "Trade ID",
        "The ID of the Trade requested to be closed",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'clientTradeID',
        "Client Trade ID",
        "The client ID of the Trade requested to be closed",
        'primitive',
        'string'
    ),
    new Property(
        'units',
        "Amount",
        "Indication of how much of the Trade to close. Either \"ALL\", or a DecimalNumber reflection a partial close of the Trade.",
        'primitive',
        'string'
    ),
];

class MarketOrderTradeClose extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = MarketOrderTradeClose_Properties;

        data = data || {};

        if (data['tradeID'] !== undefined) {
            this.tradeID = data['tradeID'];
        }

        if (data['clientTradeID'] !== undefined) {
            this.clientTradeID = data['clientTradeID'];
        }

        if (data['units'] !== undefined) {
            this.units = data['units'];
        }

    }
}

const MarketOrderMarginCloseout_Properties = [
    new Property(
        'reason',
        "Reason",
        "The reason the Market Order was created to perform a margin closeout",
        'primitive',
        'transaction.MarketOrderMarginCloseoutReason'
    ),
];

class MarketOrderMarginCloseout extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = MarketOrderMarginCloseout_Properties;

        data = data || {};

        if (data['reason'] !== undefined) {
            this.reason = data['reason'];
        }

    }
}

const MarketOrderDelayedTradeClose_Properties = [
    new Property(
        'tradeID',
        "Trade ID",
        "The ID of the Trade being closed",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'clientTradeID',
        "Client Trade ID",
        "The Client ID of the Trade being closed",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'sourceTransactionID',
        "Source Transaction ID",
        "The Transaction ID of the DelayedTradeClosure transaction to which this Delayed Trade Close belongs to",
        'primitive',
        'transaction.TransactionID'
    ),
];

class MarketOrderDelayedTradeClose extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = MarketOrderDelayedTradeClose_Properties;

        data = data || {};

        if (data['tradeID'] !== undefined) {
            this.tradeID = data['tradeID'];
        }

        if (data['clientTradeID'] !== undefined) {
            this.clientTradeID = data['clientTradeID'];
        }

        if (data['sourceTransactionID'] !== undefined) {
            this.sourceTransactionID = data['sourceTransactionID'];
        }

    }
}

const MarketOrderPositionCloseout_Properties = [
    new Property(
        'instrument',
        "Instrument",
        "The instrument of the Position being closed out.",
        'primitive',
        'primitives.InstrumentName'
    ),
    new Property(
        'units',
        "Amount",
        "Indication of how much of the Position to close. Either \"ALL\", or a DecimalNumber reflection a partial close of the Trade. The DecimalNumber must always be positive, and represent a number that doesn't exceed the absolute size of the Position.",
        'primitive',
        'string'
    ),
];

class MarketOrderPositionCloseout extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = MarketOrderPositionCloseout_Properties;

        data = data || {};

        if (data['instrument'] !== undefined) {
            this.instrument = data['instrument'];
        }

        if (data['units'] !== undefined) {
            this.units = data['units'];
        }

    }
}

const VWAPReceipt_Properties = [
    new Property(
        'units',
        "Fill Amount",
        "The number of units filled",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'price',
        "Fill Price",
        "The price at which the units were filled",
        'primitive',
        'pricing.PriceValue'
    ),
];

class VWAPReceipt extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = VWAPReceipt_Properties;

        data = data || {};

        if (data['units'] !== undefined) {
            this.units = data['units'];
        }

        if (data['price'] !== undefined) {
            this.price = data['price'];
        }

    }
}

const LiquidityRegenerationSchedule_Properties = [
    new Property(
        'steps',
        "Steps",
        "The steps in the Liquidity Regeneration Schedule",
        'array_object',
        'LiquidityRegenerationScheduleStep'
    ),
];

class LiquidityRegenerationSchedule extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = LiquidityRegenerationSchedule_Properties;

        data = data || {};

        if (data['steps'] !== undefined) {
            this.steps = data['steps'].map(x => new LiquidityRegenerationScheduleStep(x));
        }

    }
}

const LiquidityRegenerationScheduleStep_Properties = [
    new Property(
        'timestamp',
        "Time",
        "The timestamp of the schedule step.",
        'primitive',
        'primitives.DateTime'
    ),
    new Property(
        'bidLiquidityUsed',
        "Bid Liquidity Used",
        "The amount of bid liquidity used at this step in the schedule.",
        'primitive',
        'primitives.DecimalNumber'
    ),
    new Property(
        'askLiquidityUsed',
        "Ask Liquidity Used",
        "The amount of ask liquidity used at this step in the schedule.",
        'primitive',
        'primitives.DecimalNumber'
    ),
];

class LiquidityRegenerationScheduleStep extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = LiquidityRegenerationScheduleStep_Properties;

        data = data || {};

        if (data['timestamp'] !== undefined) {
            this.timestamp = data['timestamp'];
        }

        if (data['bidLiquidityUsed'] !== undefined) {
            this.bidLiquidityUsed = data['bidLiquidityUsed'];
        }

        if (data['askLiquidityUsed'] !== undefined) {
            this.askLiquidityUsed = data['askLiquidityUsed'];
        }

    }
}

const OpenTradeFinancing_Properties = [
    new Property(
        'tradeID',
        'tradeID',
        "The ID of the Trade that financing is being paid/collected for.",
        'primitive',
        'trade.TradeID'
    ),
    new Property(
        'financing',
        "Financing",
        "The amount of financing paid/collected for the Trade.",
        'primitive',
        'primitives.AccountUnits'
    ),
];

class OpenTradeFinancing extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = OpenTradeFinancing_Properties;

        data = data || {};

        if (data['tradeID'] !== undefined) {
            this.tradeID = data['tradeID'];
        }

        if (data['financing'] !== undefined) {
            this.financing = data['financing'];
        }

    }
}

const PositionFinancing_Properties = [
    new Property(
        'instrumentID',
        "Instrument",
        "The instrument of the Position that financing is being paid/collected for.",
        'primitive',
        'primitives.InstrumentName'
    ),
    new Property(
        'financing',
        "Financing",
        "The amount of financing paid/collected for the Position.",
        'primitive',
        'primitives.AccountUnits'
    ),
    new Property(
        'openTradeFinancings',
        "Trade Financings",
        "The financing paid/collecte for each open Trade within the Position.",
        'array_object',
        'OpenTradeFinancing'
    ),
];

class PositionFinancing extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = PositionFinancing_Properties;

        data = data || {};

        if (data['instrumentID'] !== undefined) {
            this.instrumentID = data['instrumentID'];
        }

        if (data['financing'] !== undefined) {
            this.financing = data['financing'];
        }

        if (data['openTradeFinancings'] !== undefined) {
            this.openTradeFinancings = data['openTradeFinancings'].map(x => new OpenTradeFinancing(x));
        }

    }
}

class EntitySpec {
    constructor(context) {
        this.context = context;
        this.Transaction = Transaction;
        this.CreateTransaction = CreateTransaction;
        this.CloseTransaction = CloseTransaction;
        this.ReopenTransaction = ReopenTransaction;
        this.ClientConfigureTransaction = ClientConfigureTransaction;
        this.ClientConfigureRejectTransaction = ClientConfigureRejectTransaction;
        this.TransferFundsTransaction = TransferFundsTransaction;
        this.TransferFundsRejectTransaction = TransferFundsRejectTransaction;
        this.MarketOrderTransaction = MarketOrderTransaction;
        this.MarketOrderRejectTransaction = MarketOrderRejectTransaction;
        this.LimitOrderTransaction = LimitOrderTransaction;
        this.LimitOrderRejectTransaction = LimitOrderRejectTransaction;
        this.StopOrderTransaction = StopOrderTransaction;
        this.StopOrderRejectTransaction = StopOrderRejectTransaction;
        this.MarketIfTouchedOrderTransaction = MarketIfTouchedOrderTransaction;
        this.MarketIfTouchedOrderRejectTransaction = MarketIfTouchedOrderRejectTransaction;
        this.TakeProfitOrderTransaction = TakeProfitOrderTransaction;
        this.TakeProfitOrderRejectTransaction = TakeProfitOrderRejectTransaction;
        this.StopLossOrderTransaction = StopLossOrderTransaction;
        this.StopLossOrderRejectTransaction = StopLossOrderRejectTransaction;
        this.TrailingStopLossOrderTransaction = TrailingStopLossOrderTransaction;
        this.TrailingStopLossOrderRejectTransaction = TrailingStopLossOrderRejectTransaction;
        this.OrderFillTransaction = OrderFillTransaction;
        this.OrderCancelTransaction = OrderCancelTransaction;
        this.OrderCancelRejectTransaction = OrderCancelRejectTransaction;
        this.OrderClientExtensionsModifyTransaction = OrderClientExtensionsModifyTransaction;
        this.OrderClientExtensionsModifyRejectTransaction = OrderClientExtensionsModifyRejectTransaction;
        this.TradeClientExtensionsModifyTransaction = TradeClientExtensionsModifyTransaction;
        this.TradeClientExtensionsModifyRejectTransaction = TradeClientExtensionsModifyRejectTransaction;
        this.MarginCallEnterTransaction = MarginCallEnterTransaction;
        this.MarginCallExtendTransaction = MarginCallExtendTransaction;
        this.MarginCallExitTransaction = MarginCallExitTransaction;
        this.DelayedTradeClosureTransaction = DelayedTradeClosureTransaction;
        this.DailyFinancingTransaction = DailyFinancingTransaction;
        this.ResetResettablePLTransaction = ResetResettablePLTransaction;
        this.ClientExtensions = ClientExtensions;
        this.TakeProfitDetails = TakeProfitDetails;
        this.StopLossDetails = StopLossDetails;
        this.TrailingStopLossDetails = TrailingStopLossDetails;
        this.TradeOpen = TradeOpen;
        this.TradeReduce = TradeReduce;
        this.MarketOrderTradeClose = MarketOrderTradeClose;
        this.MarketOrderMarginCloseout = MarketOrderMarginCloseout;
        this.MarketOrderDelayedTradeClose = MarketOrderDelayedTradeClose;
        this.MarketOrderPositionCloseout = MarketOrderPositionCloseout;
        this.VWAPReceipt = VWAPReceipt;
        this.LiquidityRegenerationSchedule = LiquidityRegenerationSchedule;
        this.LiquidityRegenerationScheduleStep = LiquidityRegenerationScheduleStep;
        this.OpenTradeFinancing = OpenTradeFinancing;
        this.PositionFinancing = PositionFinancing;
    }

    list(
        accountID,
        queryParams,
        responseHandler
    )
    {
        let path = '/v3/accounts/{accountID}/transactions';

        queryParams = queryParams || {};

        path = path.replace('{' + 'accountID' + '}', accountID);

        path = path + "?";
        if (typeof queryParams['from'] !== 'undefined') {
            path = path + "from=" + queryParams['from'] + "&";
        }
        if (typeof queryParams['to'] !== 'undefined') {
            path = path + "to=" + queryParams['to'] + "&";
        }
        if (typeof queryParams['pageSize'] !== 'undefined') {
            path = path + "pageSize=" + queryParams['pageSize'] + "&";
        }
        if (typeof queryParams['type'] !== 'undefined') {
            path = path + "type=" + queryParams['type'] + "&";
        }

        let body = {};

        function handleResponse(response) {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['from'] !== undefined) {
                        response.body.from = msg['from'];
                    }

                    if (msg['to'] !== undefined) {
                        response.body.to = msg['to'];
                    }

                    if (msg['pageSize'] !== undefined) {
                        response.body.pageSize = msg['pageSize'];
                    }

                    if (msg['type'] !== undefined) {
                        response.body.type = msg['type'];
                    }

                    if (msg['count'] !== undefined) {
                        response.body.count = msg['count'];
                    }

                    if (msg['pages'] !== undefined) {
                        response.body.pages = msg['pages'];
                    }

                    if (msg['lastTransactionID'] !== undefined) {
                        response.body.lastTransactionID = msg['lastTransactionID'];
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

                if (response.statusCode == 416)
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
        transactionID,
        responseHandler
    )
    {
        let path = '/v3/accounts/{accountID}/transactions/{transactionID}';


        path = path.replace('{' + 'accountID' + '}', accountID);
        path = path.replace('{' + 'transactionID' + '}', transactionID);


        let body = {};

        function handleResponse(response) {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['transaction'] !== undefined) {
                        response.body.transaction = Transaction.create(msg['transaction']);
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

    range(
        accountID,
        queryParams,
        responseHandler
    )
    {
        let path = '/v3/accounts/{accountID}/transactions/idrange';

        queryParams = queryParams || {};

        path = path.replace('{' + 'accountID' + '}', accountID);

        path = path + "?";
        if (typeof queryParams['from'] !== 'undefined') {
            path = path + "from=" + queryParams['from'] + "&";
        }
        if (typeof queryParams['to'] !== 'undefined') {
            path = path + "to=" + queryParams['to'] + "&";
        }
        if (typeof queryParams['type'] !== 'undefined') {
            path = path + "type=" + queryParams['type'] + "&";
        }

        let body = {};

        function handleResponse(response) {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['transactions'] !== undefined) {
                        response.body.transactions = msg['transactions'].map(x => Transaction.create(x));
                    }

                    if (msg['lastTransactionID'] !== undefined) {
                        response.body.lastTransactionID = msg['lastTransactionID'];
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

                if (response.statusCode == 416)
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

    since(
        accountID,
        queryParams,
        responseHandler
    )
    {
        let path = '/v3/accounts/{accountID}/transactions/sinceid';

        queryParams = queryParams || {};

        path = path.replace('{' + 'accountID' + '}', accountID);

        path = path + "?";
        if (typeof queryParams['id'] !== 'undefined') {
            path = path + "id=" + queryParams['id'] + "&";
        }

        let body = {};

        function handleResponse(response) {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['transactions'] !== undefined) {
                        response.body.transactions = msg['transactions'].map(x => Transaction.create(x));
                    }

                    if (msg['lastTransactionID'] !== undefined) {
                        response.body.lastTransactionID = msg['lastTransactionID'];
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

                if (response.statusCode == 416)
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

exports.Transaction = Transaction;
exports.CreateTransaction = CreateTransaction;
exports.CloseTransaction = CloseTransaction;
exports.ReopenTransaction = ReopenTransaction;
exports.ClientConfigureTransaction = ClientConfigureTransaction;
exports.ClientConfigureRejectTransaction = ClientConfigureRejectTransaction;
exports.TransferFundsTransaction = TransferFundsTransaction;
exports.TransferFundsRejectTransaction = TransferFundsRejectTransaction;
exports.MarketOrderTransaction = MarketOrderTransaction;
exports.MarketOrderRejectTransaction = MarketOrderRejectTransaction;
exports.LimitOrderTransaction = LimitOrderTransaction;
exports.LimitOrderRejectTransaction = LimitOrderRejectTransaction;
exports.StopOrderTransaction = StopOrderTransaction;
exports.StopOrderRejectTransaction = StopOrderRejectTransaction;
exports.MarketIfTouchedOrderTransaction = MarketIfTouchedOrderTransaction;
exports.MarketIfTouchedOrderRejectTransaction = MarketIfTouchedOrderRejectTransaction;
exports.TakeProfitOrderTransaction = TakeProfitOrderTransaction;
exports.TakeProfitOrderRejectTransaction = TakeProfitOrderRejectTransaction;
exports.StopLossOrderTransaction = StopLossOrderTransaction;
exports.StopLossOrderRejectTransaction = StopLossOrderRejectTransaction;
exports.TrailingStopLossOrderTransaction = TrailingStopLossOrderTransaction;
exports.TrailingStopLossOrderRejectTransaction = TrailingStopLossOrderRejectTransaction;
exports.OrderFillTransaction = OrderFillTransaction;
exports.OrderCancelTransaction = OrderCancelTransaction;
exports.OrderCancelRejectTransaction = OrderCancelRejectTransaction;
exports.OrderClientExtensionsModifyTransaction = OrderClientExtensionsModifyTransaction;
exports.OrderClientExtensionsModifyRejectTransaction = OrderClientExtensionsModifyRejectTransaction;
exports.TradeClientExtensionsModifyTransaction = TradeClientExtensionsModifyTransaction;
exports.TradeClientExtensionsModifyRejectTransaction = TradeClientExtensionsModifyRejectTransaction;
exports.MarginCallEnterTransaction = MarginCallEnterTransaction;
exports.MarginCallExtendTransaction = MarginCallExtendTransaction;
exports.MarginCallExitTransaction = MarginCallExitTransaction;
exports.DelayedTradeClosureTransaction = DelayedTradeClosureTransaction;
exports.DailyFinancingTransaction = DailyFinancingTransaction;
exports.ResetResettablePLTransaction = ResetResettablePLTransaction;
exports.ClientExtensions = ClientExtensions;
exports.TakeProfitDetails = TakeProfitDetails;
exports.StopLossDetails = StopLossDetails;
exports.TrailingStopLossDetails = TrailingStopLossDetails;
exports.TradeOpen = TradeOpen;
exports.TradeReduce = TradeReduce;
exports.MarketOrderTradeClose = MarketOrderTradeClose;
exports.MarketOrderMarginCloseout = MarketOrderMarginCloseout;
exports.MarketOrderDelayedTradeClose = MarketOrderDelayedTradeClose;
exports.MarketOrderPositionCloseout = MarketOrderPositionCloseout;
exports.VWAPReceipt = VWAPReceipt;
exports.LiquidityRegenerationSchedule = LiquidityRegenerationSchedule;
exports.LiquidityRegenerationScheduleStep = LiquidityRegenerationScheduleStep;
exports.OpenTradeFinancing = OpenTradeFinancing;
exports.PositionFinancing = PositionFinancing;

exports.EntitySpec = EntitySpec;
