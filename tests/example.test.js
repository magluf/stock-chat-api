"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
var chai_1 = __importDefault(require("chai"));
var chai_http_1 = __importDefault(require("chai-http"));
var server_1 = __importDefault(require("../server"));
process.env.NODE_ENV = 'test';
var should = chai_1.default.should();
chai_1.default.use(chai_http_1.default);
describe('Messages', function () {
    describe('/POST message', function () {
        it('it should not POST a new user named StockBot', function (done) {
            var user = {
                username: 'StockBot',
                email: 'email@email.com',
                password: '123',
            };
            chai_1.default
                .request(server_1.default)
                .post('/api/v1/users')
                .send(user)
                .end(function (err, res) {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.be.equal("Username 'StockBot' already in use.");
                done();
            });
        });
    });
});
