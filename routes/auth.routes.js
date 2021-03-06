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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = __importStar(require("../controllers/auth.controller"));
var router = express_1.Router();
var checkIfHeroku = function (req, res, next) {
    if (req.query.heroku) {
        res.locals.heroku = true;
    }
    next();
};
router.route('/login').post(checkIfHeroku, auth_controller_1.default.login);
router.route('/logout').get(auth_controller_1.default.logout);
router.route('/check').get(auth_controller_1.protect, auth_controller_1.default.isLoggedIn); //Genius
exports.default = router;
