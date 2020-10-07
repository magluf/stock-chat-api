"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var message_controller_1 = __importDefault(require("../controllers/message.controller"));
var auth_controller_1 = require("../controllers/auth.controller");
var router = express_1.Router();
router
    .route('/')
    .post(auth_controller_1.protect, message_controller_1.default.createMessage)
    .get(auth_controller_1.protect, message_controller_1.default.getAllMessages);
router
    .route('/:channelId')
    .get(auth_controller_1.protect, message_controller_1.default.getMessagesByChannel);
exports.default = router;
