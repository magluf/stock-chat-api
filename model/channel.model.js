"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelSchema = void 0;
var mongoose_1 = require("mongoose");
exports.channelSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: 'Name is required.',
        unique: true,
    },
    details: {
        type: String,
        required: 'Details are required.',
    },
}, { timestamps: true });
exports.default = mongoose_1.model('Channel', exports.channelSchema);
