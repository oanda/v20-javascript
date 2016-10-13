/* jshint esversion: 6 */

"use strict";

var Definition = require('./base').Definition;
var Property = require('./base').Property;
var Field = require('./base').Field;




const UserInfo_Properties = [
    new Property(
        'username',
        'username',
        "The user-provided username.",
        'primitive',
        'string'
    ),
    new Property(
        'userID',
        'userID',
        "The user's OANDA-assigned user ID.",
        'primitive',
        'integer'
    ),
    new Property(
        'country',
        'country',
        "The country that the user is based in.",
        'primitive',
        'string'
    ),
    new Property(
        'emailAddress',
        'emailAddress',
        "The user's email address.",
        'primitive',
        'string'
    ),
];

class UserInfo extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = UserInfo_Properties;

        data = data || {};

        if (data['username'] !== undefined) {
            this.username = data['username'];
        }

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['country'] !== undefined) {
            this.country = data['country'];
        }

        if (data['emailAddress'] !== undefined) {
            this.emailAddress = data['emailAddress'];
        }

    }
}

const UserInfoExternal_Properties = [
    new Property(
        'userID',
        'userID',
        "The user's OANDA-assigned user ID.",
        'primitive',
        'integer'
    ),
    new Property(
        'country',
        'country',
        "The country that the user is based in.",
        'primitive',
        'string'
    ),
    new Property(
        'FIFO',
        'FIFO',
        "Flag indicating if the the user's Accounts adhere to FIFO execution rules.",
        'primitive',
        'boolean'
    ),
];

class UserInfoExternal extends Definition {
    constructor(data) {
        super();

        this._summaryFormat = "";

        this._nameFormat = "";

        this._properties = UserInfoExternal_Properties;

        data = data || {};

        if (data['userID'] !== undefined) {
            this.userID = data['userID'];
        }

        if (data['country'] !== undefined) {
            this.country = data['country'];
        }

        if (data['FIFO'] !== undefined) {
            this.FIFO = data['FIFO'];
        }

    }
}

class EntitySpec {
    constructor(context) {
        this.context = context;
        this.UserInfo = UserInfo;
        this.UserInfoExternal = UserInfoExternal;
    }

    get(
        userSpecifier,
        responseHandler
    )
    {
        let path = '/v3/users/{userSpecifier}';


        path = path.replace('{' + 'userSpecifier' + '}', userSpecifier);


        let body = {};

        function handleResponse(response) {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['userInfo'] !== undefined) {
                        response.body.userInfo = new UserInfo(msg['userInfo']);
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

                if (response.statusCode == 403)
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

    getExternal(
        userSpecifier,
        responseHandler
    )
    {
        let path = '/v3/users/{userSpecifier}/externalInfo';


        path = path.replace('{' + 'userSpecifier' + '}', userSpecifier);


        let body = {};

        function handleResponse(response) {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['userInfo'] !== undefined) {
                        response.body.userInfo = new UserInfoExternal(msg['userInfo']);
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

                if (response.statusCode == 403)
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

exports.UserInfo = UserInfo;
exports.UserInfoExternal = UserInfoExternal;

exports.EntitySpec = EntitySpec;
