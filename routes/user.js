const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const ObjectId = require('mongodb').ObjectId;
router.all('*',(req,res,next)=>
{
    
    next();
})

router.get('/profile',(req,res)=>
{  
    res.send(req.user)
})

router.get('/post',(req,res)=>
{
    Post.find({user : ObjectId(req.user._id)}).limit().lean().then(result1=>
    {
        res.send(result1);
    })
})
router.get('/comment',(req,res)=>
{
    Comment.find({user : ObjectId(req.user._id)}).limit().lean().then(result2=>
    {
        res.send(result2)
    })
})
router.post('/register',(req,res)=>
{
    User.findOne({email1 : req.body.email1}).limit().lean().then(result=>
        {
            if(result)
            {
                res.send('user found')
    
            }
            else
            {
                var newUser = new User({
                    name1 : req.body.name1,
                    email1 : req.body.email1,
                    password1 : req.body.password1,
                    photos1 : [req.body.photos1]
                })
            
                newUser.save().then(result =>
                {
                    console.log(result);
                    res.send(result)
                })
            }
            
        })
})
router.post('/find',(req,res)=>
{
	User.findOne({email1 : req.body.email}).limit().lean().then(result =>
	{
		if(result)
		{	
			res.send(false);
		}
		else
		{
			res.send(true);
		}
	})
})

module.exports = router;
