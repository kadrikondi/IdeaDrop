const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create schema
const IdeaSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    details:{
        type :String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        dafaut: Date.now
    }
});
mongoose.model('ideas', IdeaSchema);