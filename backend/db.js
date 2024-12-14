const mongoose = require('mongoose');  //this file connects to mongodb

const mongoURI = "mongodb://localhost:27017/inotebook";
const connectToMongo = async ()=>{
   await mongoose.connect(mongoURI);
    console.log("Connected to mongo");
}
module.exports = connectToMongo;