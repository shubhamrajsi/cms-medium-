const mongoose = require('mongoose')
const schema = require('mongoose').Schema;

var catSchema = new schema({
    category:{
        type : String,
        required:true
    }
})

module.exports=mongoose.model('categories',catSchema)