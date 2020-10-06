"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.uri = void 0;
// import { MongoClient } from 'mongodb';
var dotenv_1 = require("dotenv");
dotenv_1.config();
exports.uri = "mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASS + "@cluster0.zzgku.mongodb.net/" + process.env.MONGO_DB + "?retryWrites=true&w=majority";
// const env = process.env.NODE_ENV || 'development';
// const uri =
//   env !== 'development'
//     ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.zzgku.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
//     : `mongodb://localhost:27017/${process.env.MONGO_DB}`;
exports.options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
};
// export default mongoose.connect(uri, options);
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// client.connect((err) => {
//   const collection = client.db('test').collection('devices');
//   // perform actions on the collection object
//   client.close();
// });
