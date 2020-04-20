const express = require('express');
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;
const Post = require('../models/Post')
const User = require('../models/User')


router.get('/user/:id',(req,res)=>
{
    
    var id = req.params.id;
    var obj = []
    var post1 = []
    User.findOne({_id : id}).limit().lean().then(result=>
    {
        
    })
})