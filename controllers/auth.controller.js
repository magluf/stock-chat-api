"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJwt = void 0;
// import { Request, Response } from 'express';
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var util_1 = require("util");
var user_service_1 = __importDefault(require("../services/user.service"));
var encrypt_util_1 = require("../utils/encrypt.util");
var http_util_1 = __importDefault(require("../utils/http.util"));
var httpUtil = new http_util_1.default();
var jwtToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
exports.decodeJwt = function (token) {
    return util_1.promisify(jsonwebtoken_1.default.verify)(token, process.env.JWT_SECRET);
};
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, user, token, cookieOptions, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password;
                        if (!username || !password) {
                            httpUtil.setError(400, 'Incomplete info.');
                            return [2 /*return*/, httpUtil.send(res)];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, user_service_1.default.getUserByUsername(username)];
                    case 2:
                        user = _b.sent();
                        if (!user) {
                            httpUtil.setError(401, 'Credentials invalid');
                            return [2 /*return*/, httpUtil.send(res)];
                        }
                        return [4 /*yield*/, encrypt_util_1.isDecryptionValid(password, user.salt, user.password)];
                    case 3:
                        if (_b.sent()) {
                            token = jwtToken(user.id);
                            cookieOptions = {
                                expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                                secure: false,
                                httpOnly: true,
                            };
                            if (process.env.NODE_ENV === 'production')
                                cookieOptions = __assign(__assign({}, cookieOptions), { secure: true });
                            res.cookie('jwt', token, cookieOptions);
                            httpUtil.setSuccess(201, 'User logged in!', {
                                id: user._id,
                                username: user.username,
                                email: user.email,
                            });
                            return [2 /*return*/, httpUtil.send(res)];
                        }
                        httpUtil.setError(401, 'Credentials invalid.');
                        return [2 /*return*/, httpUtil.send(res)];
                    case 4:
                        error_1 = _b.sent();
                        httpUtil.setError(400, error_1);
                        return [2 /*return*/, httpUtil.send(res)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AuthController;
}());
exports.default = AuthController;
