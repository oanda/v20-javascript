/* jshint esversion: 6 */

"use strict";

var Definition = require('./base').Definition;
var Property = require('./base').Property;
var Field = require('./base').Field;




class EntitySpec {
    constructor(context) {
        this.context = context;
    }

    login(
        bodyParams,
        responseHandler
    )
    {
        let path = '/v3/login';

        bodyParams = bodyParams || {};



        let body = {};

        if (typeof bodyParams['username'] !== 'undefined')
        {
            body['username'] = bodyParams['username'];
        }

        if (typeof bodyParams['password'] !== 'undefined')
        {
            body['password'] = bodyParams['password'];
        }

        function handleResponse(response) {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                    if (msg['token'] !== undefined) {
                        response.body.token = msg['token'];
                    }

                }

                if (response.statusCode == 400)
                {
                }

                if (response.statusCode == 401)
                {
                }

                if (response.statusCode == 405)
                {
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

    logout(
        responseHandler
    )
    {
        let path = '/v3/logout';




        let body = {};

        function handleResponse(response) {
            if (response.contentType.startsWith("application/json"))
            {
                let msg = JSON.parse(response.rawBody);

                response.body = {};

                if (response.statusCode == 200)
                {
                }

                if (response.statusCode == 400)
                {
                }

                if (response.statusCode == 405)
                {
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



}


exports.EntitySpec = EntitySpec;
