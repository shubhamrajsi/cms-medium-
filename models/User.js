const mongoose = require('mongoose')

const Schema = require('mongoose').Schema;

var userSchema = new Schema({
    name1 : {
        type : String,
        required : true
    },
    email1 : {
        type : String,
        required : true
    },
    password1 : {
        type : String,
        required: true
    },
    photos1 : [
        {
            type : String
        }
    ]

});

module.exports = mongoose.model('users',userSchema);
