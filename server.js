"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var db_1 = require("./config/db");
var user_routes_1 = __importDefault(require("./routes/user.routes"));
var auth_routes_1 = __importDefault(require("./routes/auth.routes"));
var app = express_1.default();
var origin = process.env.NODE_ENV !== 'development'
    ? 'https://stock-chat-app.herokuapp.com'
    : 'http://localhost:3000';
app.use(cors_1.default({ origin: origin, credentials: true }));
mongoose_1.default
    .connect(db_1.uri, db_1.options)
    .then(function () { return console.log('DB connection successful!'); });
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1/users', user_routes_1.default);
app.use('/api/v1/auth', auth_routes_1.default);
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log("server is running on PORT " + PORT);
});
