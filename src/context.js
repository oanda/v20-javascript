/* jshint esversion: 6 */

"use strict";

var account = require("./account");
var transaction = require("./transaction");
var trade = require("./trade");
var instrument = require("./instrument");
var pricing = require("./pricing");
var primitives = require("./primitives");
var position = require("./position");
var order = require("./order");
var user = require("./user");


class Response {
    constructor(
        method,
        path,
        statusCode,
        statusMessage,
        contentType,
        rawBody
    ) {
        this.method = method;
        this.path = path;
        this.statusCode = statusCode.toString();
        this.statusMessage = statusMessage;
        this.contentType = contentType;
        this.rawBody = rawBody;
        this.body = null;
    }

    isSuccess() {
        return this.statusCode.startsWith("2");
    }

    isRedirection() {
        return this.statusCode.startsWith("3");
    }

    isClientError() {
        return this.statusCode.startsWith("4");
    }

    isServerError() {
        return this.statusCode.startsWith("5");
    }

    isError() {
        return (
            this.isClientError() || this.isServerError()
        );
    }
}

class Context {
    constructor(hostname, port, ssl, application) {
        application = application || "";

        console.log(application);

        this.username = "";

        this.hostname = hostname;

        this.port = port;

        this.headers = {
            "Content-Type": "application/json",
            "OANDA-Agent" : `v20-javascript/3.0.10 (${application})`
        };

        this.token = "";

        if (ssl)
        {
            this.http = require('https');
        }
        else
        {
            this.http = require('http');
        }

        this.account = new account.EntitySpec(this);
        this.transaction = new transaction.EntitySpec(this);
        this.trade = new trade.EntitySpec(this);
        this.instrument = new instrument.EntitySpec(this);
        this.pricing = new pricing.EntitySpec(this);
        this.primitives = new primitives.EntitySpec(this);
        this.position = new position.EntitySpec(this);
        this.order = new order.EntitySpec(this);
        this.user = new user.EntitySpec(this);
    }

    setToken(token) {
        this.token = token;
        this.headers['Authorization'] = "Bearer " + this.token;
    }

    request(method, path, body, responseHandler) {
        let headers = JSON.parse(JSON.stringify(this.headers));

        let postData = "";

        if (Object.keys(body).length > 0)
        {
            postData = JSON.stringify(body);
            headers['Content-Length'] = postData.length;
        }

        let options = {
            hostname: this.hostname,
            port: this.port,
            method: method,
            path: path,
            headers: headers
        };

        let req = this.http.request(
            options,
            response => {
                let responseBody = '';

                response.on('data', d => responseBody += d);

                response.on('end', () => {
                    if (responseHandler)
                    {
                        responseHandler(
                            new Response(
                                method,
                                path,
                                response.statusCode,
                                response.statusMessage,
                                response.headers['content-type'],
                                responseBody
                            )
                        );
                    }
                });

            }
        );

        if (postData.length > 0)
        {
            req.write(postData);
        }

        req.end();
    }
}

exports.Context = Context;
