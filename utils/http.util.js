"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpUtil = /** @class */ (function () {
    function HttpUtil() {
        this.statusCode = null;
        this.type = null;
        this.data = null;
        this.message = null;
    }
    HttpUtil.prototype.setSuccess = function (statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.type = 'success';
    };
    HttpUtil.prototype.setError = function (statusCode, message) {
        if (message.code === 11000) {
            if (Object.prototype.hasOwnProperty.call(message.keyValue, 'username')) {
                message = "Username '" + message.keyValue.username + "' already in use.";
            }
            else if (Object.prototype.hasOwnProperty.call(message.keyValue, 'email')) {
                message = "Email '" + message.keyValue.email + "' already in use.";
            }
            else if (Object.prototype.hasOwnProperty.call(message.keyValue, 'name')) {
                message = "Channel name '" + message.keyValue.name + "' already exists.";
            }
        }
        this.statusCode = statusCode;
        this.message = message;
        this.type = 'error';
    };
    HttpUtil.prototype.send = function (res) {
        var result = {
            status: this.type,
            message: this.message,
            data: this.data,
        };
        if (this.type === 'success') {
            return res.status(this.statusCode).json(result);
        }
        return res.status(this.statusCode).json({
            status: this.type,
            message: this.message,
        });
    };
    return HttpUtil;
}());
exports.default = HttpUtil;
