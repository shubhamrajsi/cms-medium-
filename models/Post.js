const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;


var postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:'users'

    },
    title : {
        type:String,
        required:true
    },
    cat : {
        type : Schema.Types.ObjectId,
        ref:'categories'
    },
    date : {
        type:String
    },
    head_img : {
        type:String,
        required: true
    },
    para: [
        {
            type:String,
            required:true
        }
    ],
    pics :[
        {
            type:String
        }
    ]
})

module.exports = mongoose.model('post',postSchema);