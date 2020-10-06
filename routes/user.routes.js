"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = __importDefault(require("../controllers/user.controller"));
// import { protect } from '../controllers/auth.controller';
var router = express_1.Router();
// router.route('/').post(protect, UserController.createUser);
router.route('/').post(user_controller_1.default.createUser);
exports.default = router;
