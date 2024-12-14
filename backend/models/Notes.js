const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',

    },
    title:{
        type: String,
        required: true
    },
   
    tag:{
        type: String,
        default: "General"
        
    },
    description:{
        type: String,
        default: "Add content here"
        
    },
    
    date:{
        type: Date,
        default: Date.now,
        unique: true
    }

})
module.exports = mongoose.model('notes',NotesSchema);