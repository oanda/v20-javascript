/* jshint esversion: 6 */

"use strict";

var account = require("./account");
var order = require("./order");
var position = require("./position");
var user = require("./user");
var transaction = require("./transaction");
var pricing = require("./pricing");
var primitives = require("./primitives");
var trade = require("./trade");
var instrument = require("./instrument");


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

        this.username = "";

        this.hostname = hostname;

        this.port = port;

        this.headers = {
            "Content-Type": "application/json",
            "OANDA-Agent" : `v20-javascript/3.0.15 (${application})`
        };

        this.token = "";
        this.isStream = "";

        if (ssl)
        {
            this.http = require('https');
        }
        else
        {
            this.http = require('http');
        }

        this.account = new account.EntitySpec(this);
        this.order = new order.EntitySpec(this);
        this.position = new position.EntitySpec(this);
        this.user = new user.EntitySpec(this);
        this.transaction = new transaction.EntitySpec(this);
        this.pricing = new pricing.EntitySpec(this);
        this.primitives = new primitives.EntitySpec(this);
        this.trade = new trade.EntitySpec(this);
        this.instrument = new instrument.EntitySpec(this);
    }

    setToken(token) {
        this.token = token;
        this.headers['Authorization'] = "Bearer " + this.token;
    }

    setIsStream(isStream) {
        this.isStream = isStream;
        this.headers['Connection'] = "Keep-Alive";
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

                response.on('data', d => {
                    if(this.isStream && responseHandler)
                    {
                        responseBody = d;
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
                    else
                    {
                        responseBody += d
                    }
                });

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

    // streamTimeout(method, path, body, responseHandler, ontype) {
    //     console.warn("[WARN]: No heartbeat received from prices stream for 10 seconds. Reconnecting.\n");
    //     this.request(method, path, body, responseHandler);
    // };
}

exports.Context = Context;
