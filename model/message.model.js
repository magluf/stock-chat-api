"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var channel_model_1 = require("./channel.model");
var user_model_1 = require("./user.model");
var messageSchema = new mongoose_1.Schema({
    author: {
        type: user_model_1.userSchema,
        required: true,
    },
    channel: {
        type: channel_model_1.channelSchema,
        required: true,
    },
    content: {
        type: String,
        required: 'Content is required',
    },
}, { timestamps: true });
exports.default = mongoose_1.model('Message', messageSchema);
