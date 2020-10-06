"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var channel_controller_1 = __importDefault(require("../controllers/channel.controller"));
var auth_controller_1 = require("../controllers/auth.controller");
var router = express_1.Router();
router
    .route('/')
    .post(auth_controller_1.protect, channel_controller_1.default.createChannel)
    .get(auth_controller_1.protect, channel_controller_1.default.getAllChannels);
router.route('/:id').get(auth_controller_1.protect, channel_controller_1.default.getChannel);
exports.default = router;
