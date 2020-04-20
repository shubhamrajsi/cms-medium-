const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

var commentSchema = new Schema({
    post : 
    {
        type : Schema.Types.ObjectId,
        ref : 'posts'
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'users'
    },
    body : {
        type : String,
        required : true
    }

})
module.exports = mongoose.model('comments',commentSchema);