"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var csv = __importStar(require("csv-string"));
var message_model_1 = __importDefault(require("../model/message.model"));
var channel_service_1 = __importDefault(require("../services/channel.service"));
var message_service_1 = __importDefault(require("../services/message.service"));
var stockBot_service_1 = __importDefault(require("../services/stockBot.service"));
var user_service_1 = __importDefault(require("../services/user.service"));
var http_util_1 = __importDefault(require("../utils/http.util"));
var httpUtil = new http_util_1.default();
var initiateStockBot = function (author, channel, message) { return __awaiter(void 0, void 0, void 0, function () {
    var botUser, botMessage, messageByStockBot, stooqCode, stock, arr, stooqValue, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_service_1.default.getFullUser(process.env.STOCK_BOT_ID)];
            case 1:
                botUser = _a.sent();
                botMessage = new message_model_1.default({
                    author: botUser,
                    channel: channel,
                    content: '',
                });
                messageByStockBot = function (text) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                botMessage = new message_model_1.default({
                                    author: botUser,
                                    channel: channel,
                                    content: text,
                                });
                                return [4 /*yield*/, message_service_1.default.createMessage(botMessage)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); };
                if (!message.startsWith('/stock=')) return [3 /*break*/, 8];
                stooqCode = message.split('/stock=')[1];
                if (stooqCode.length > 10) {
                    return [2 /*return*/, messageByStockBot("Hello, " + author + "! That seems to be an invalid code. :( Please, use a valid stock code!")];
                }
                messageByStockBot("Hello, " + author + "! Let me see if I can find the current value for the \"" + stooqCode + "\" stock...");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 7]);
                return [4 /*yield*/, stockBot_service_1.default.checkStooq(stooqCode)];
            case 3:
                stock = _a.sent();
                arr = csv.parse(stock.data);
                stooqValue = arr[1][6];
                if (stooqValue === 'N/D') {
                    return [2 /*return*/, messageByStockBot("Unfortunately, I couldn't find any values for \"" + stooqCode + "\". Are you sure it's a valid stock code?")];
                }
                botMessage = new message_model_1.default({
                    author: botUser,
                    channel: channel,
                    content: stooqCode.toUpperCase() + " quote is $" + parseFloat(stooqValue).toFixed(2) + " per share.",
                });
                return [4 /*yield*/, message_service_1.default.createMessage(botMessage)];
            case 4: return [2 /*return*/, _a.sent()];
            case 5:
                err_1 = _a.sent();
                botMessage = new message_model_1.default({
                    author: botUser,
                    channel: channel,
                    content: "There seems to be a problem with retrieving stock quotes from stooq.com :( Please, try again later.",
                });
                return [4 /*yield*/, message_service_1.default.createMessage(botMessage)];
            case 6: return [2 /*return*/, _a.sent()];
            case 7: return [3 /*break*/, 10];
            case 8:
                botMessage = new message_model_1.default({
                    author: botUser,
                    channel: channel,
                    content: "That's an invalid code. :( Please, use '/stock=<STOCK_CODE>' for me to tell you proper stock values!",
                });
                return [4 /*yield*/, message_service_1.default.createMessage(botMessage)];
            case 9: return [2 /*return*/, _a.sent()];
            case 10: return [2 /*return*/];
        }
    });
}); };
var MessageController = /** @class */ (function () {
    function MessageController() {
    }
    MessageController.createMessage = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var author, channel, newMessage, createdMessage, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.body) {
                            httpUtil.setError(400, 'Incomplete info.');
                            return [2 /*return*/, httpUtil.send(res)];
                        }
                        if (!req.body.author || !req.body.channel || !req.body.content) {
                            httpUtil.setError(400, 'Incomplete info.');
                            return [2 /*return*/, httpUtil.send(res)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, user_service_1.default.getFullUser(req.body.author)];
                    case 2:
                        author = _a.sent();
                        if (!author) {
                            httpUtil.setError(401, 'Credentials invalid');
                            return [2 /*return*/, httpUtil.send(res)];
                        }
                        return [4 /*yield*/, channel_service_1.default.getChannelById(req.body.channel)];
                    case 3:
                        channel = _a.sent();
                        if (!channel) {
                            httpUtil.setError(401, 'Invalid channel');
                            return [2 /*return*/, httpUtil.send(res)];
                        }
                        newMessage = new message_model_1.default({
                            author: author,
                            channel: channel,
                            content: req.body.content,
                        });
                        return [4 /*yield*/, message_service_1.default.createMessage(newMessage)];
                    case 4:
                        createdMessage = _a.sent();
                        if (newMessage.content.startsWith('/')) {
                            initiateStockBot(newMessage.author.username, newMessage.channel, newMessage.content);
                        }
                        createdMessage.author.password = undefined;
                        createdMessage.author.salt = undefined;
                        createdMessage.author.email = undefined;
                        createdMessage.author.username = undefined;
                        createdMessage.channel.creator = undefined;
                        httpUtil.setSuccess(201, 'Message Added!', createdMessage);
                        return [2 /*return*/, httpUtil.send(res)];
                    case 5:
                        error_1 = _a.sent();
                        httpUtil.setError(400, error_1);
                        return [2 /*return*/, httpUtil.send(res)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MessageController.getMessage = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, message, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, message_service_1.default.getMessageById(id)];
                    case 2:
                        message = _a.sent();
                        if (!message) {
                            httpUtil.setError(404, "Cannot find a message with id " + id + ".");
                        }
                        else {
                            httpUtil.setSuccess(200, 'Message found.', message);
                        }
                        return [2 /*return*/, httpUtil.send(res)];
                    case 3:
                        error_2 = _a.sent();
                        httpUtil.setError(404, error_2);
                        return [2 /*return*/, httpUtil.send(res)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MessageController.getAllMessages = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var allMessages, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, message_service_1.default.getMessages()];
                    case 1:
                        allMessages = _a.sent();
                        if (allMessages.length > 0) {
                            httpUtil.setSuccess(200, 'Messages retrieved.', allMessages);
                        }
                        else {
                            httpUtil.setSuccess(200, 'No messages found.');
                        }
                        return [2 /*return*/, httpUtil.send(res)];
                    case 2:
                        error_3 = _a.sent();
                        httpUtil.setError(400, error_3);
                        return [2 /*return*/, httpUtil.send(res)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MessageController.getMessagesByChannel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var channelId, allMessages, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channelId = req.params.channelId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, message_service_1.default.getMessagesByChannel(channelId)];
                    case 2:
                        allMessages = _a.sent();
                        if (allMessages && allMessages.length > 0) {
                            httpUtil.setSuccess(200, 'Messages retrieved.', allMessages);
                        }
                        else {
                            httpUtil.setSuccess(200, 'No messages found.');
                        }
                        return [2 /*return*/, httpUtil.send(res)];
                    case 3:
                        error_4 = _a.sent();
                        httpUtil.setError(400, error_4);
                        return [2 /*return*/, httpUtil.send(res)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return MessageController;
}());
exports.default = MessageController;
