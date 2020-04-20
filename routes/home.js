const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const Categories = require('../models/Category')
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/verify')
router.all('*',(req,res,next)=>
{
    
    next();
})
router.get('/',verifyToken,(req,res)=>
{
    Post.find().populate('user').populate('cat').limit().lean().then(result=>
    {
        jwt.verify(req.token,'secretkey',(err,authData)=>
        {
            if(err){
                res.json({result})
            }
            else
            {
                res.json({
                    result,
                    authData
                })
            }
        })
        console.log(result)
    })
})
router.get('/home1',verifyToken,(req,res)=>
{
    
    Categories.find().limit().lean().then(result =>
    {
        jwt.verify(req.token,'secretkey',(err,authData)=>
        {
            if(err){
                res.json({result})
            }
            else
            {
                res.json({
                    result,
                    authData
                })
            }
        })
        
    })

})

module.exports = router;