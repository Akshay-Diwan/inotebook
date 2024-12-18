const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        
    },
    email:{
        type: String,
        
        unique: true
    },
    password:{
        type: String,
        
        
    },
    date:{
        type: Date,
        default: Date.now
    }

})
module.exports = mongoose.model('user',UserSchema);