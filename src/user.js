/* jshint esversion: 6 */

"use strict";

var Definition = require('./base').Definition;
var Property = require('./base').Property;
var Field = require('./base').Field;

var account = require('./account');



class EntitySpec {
    constructor(context) {
        this.context = context;
    }

    list(
        userID,
        responseHandler
    )
    {
        let path = '/v3/users/{userID}/accounts';


        path = path.replace('{' + 'userID' + '}', userID);


        let body = {};

        function handleResponse(response) {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['accounts'] !== undefined) {
                        response.body.accounts = msg['accounts'].map(x => new account.AccountProperties(x));
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


exports.EntitySpec = EntitySpec;
