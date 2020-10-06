"use strict";
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
var channel_model_1 = __importDefault(require("../model/channel.model"));
var channel_service_1 = __importDefault(require("../services/channel.service"));
var user_service_1 = __importDefault(require("../services/user.service"));
var http_util_1 = __importDefault(require("../utils/http.util"));
var httpUtil = new http_util_1.default();
var ChannelController = /** @class */ (function () {
    function ChannelController() {
    }
    ChannelController.createChannel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var creator, newChannel, createdChannel, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.body) {
                            httpUtil.setError(400, 'Incomplete info.');
                            return [2 /*return*/, httpUtil.send(res)];
                        }
                        if (!req.body.name || !req.body.creator || !req.body.details) {
                            httpUtil.setError(400, 'Incomplete info.');
                            return [2 /*return*/, httpUtil.send(res)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, user_service_1.default.getUserForChannel(req.body.creator)];
                    case 2:
                        creator = _a.sent();
                        if (!creator) {
                            httpUtil.setError(401, 'Credentials invalid');
                            return [2 /*return*/, httpUtil.send(res)];
                        }
                        newChannel = new channel_model_1.default({
                            creator: creator,
                            name: req.body.name,
                            details: req.body.details,
                        });
                        return [4 /*yield*/, channel_service_1.default.createChannel(newChannel)];
                    case 3:
                        createdChannel = _a.sent();
                        createdChannel.creator.password = undefined;
                        createdChannel.creator.salt = undefined;
                        createdChannel.creator.email = undefined;
                        httpUtil.setSuccess(201, 'Channel Added!', createdChannel);
                        return [2 /*return*/, httpUtil.send(res)];
                    case 4:
                        error_1 = _a.sent();
                        httpUtil.setError(400, error_1);
                        return [2 /*return*/, httpUtil.send(res)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ChannelController.getChannel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, channel, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, channel_service_1.default.getChannelById(id)];
                    case 2:
                        channel = _a.sent();
                        if (!channel) {
                            httpUtil.setError(404, "Cannot find a channel with id " + id + ".");
                        }
                        else {
                            httpUtil.setSuccess(200, 'Channel found.', channel);
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
    ChannelController.getAllChannels = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var allChannels, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, channel_service_1.default.getChannels()];
                    case 1:
                        allChannels = _a.sent();
                        if (allChannels.length > 0) {
                            httpUtil.setSuccess(200, 'Channels retrieved.', allChannels);
                        }
                        else {
                            httpUtil.setSuccess(200, 'No channels found.');
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
    return ChannelController;
}());
exports.default = ChannelController;