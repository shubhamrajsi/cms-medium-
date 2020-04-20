const express = require('express');
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;
const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')
const async = require('async')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/verify')

router.all('*',(req,res,next)=>
{
    next();
})
router.get('/:id',verifyToken,(req,res)=>
{
    Post.findOne({_id : ObjectId(req.params.id)}).populate('user','-password1').populate('cat').limit().lean().then(result=>
    {
        
        if(result)
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
            res.send('working')
        }
        else
        {
            res.send('post not find')
        }
        
        
    })
})

router.get('/new',(req,res)=>
{
    res.sendFile(`${___dirname}/index.html`)
})

router.post('/new',(req,res)=>
{
    var date1 = new Date();
    var newPost = new Post({
        user : ObjectId('5e71db59ceb47d190b75af7d'),
        cat : ObjectId('5e7e4016b17a2a2e1285a936'),
        title : 'third Post',
        date : new Date(),
        head_img : '1.jpg',
        para : ['hello this is my second blog','i believe i can build this website'],
        pics : ['1.jpg','2.jpg']

    })

    newPost.save().then(result=>
    {
        result ? res.send(result) : res.send('not created new post')
    })


})

module.exports = router;

// // {
//     "_id" : ObjectId("5e7e411ddb85002ecc29646a"),
//     "para" : [
//         "hello this is my second blog",
//         "i believe i can build this website"
//     ],
//     "pics" : [
//         "1.jpg",
//         "2.jpg"
//     ],
//     "comment" : [ ],
//     "user" : ObjectId("5e71db59ceb47d190b75af7d"),
//     "cat" : ObjectId("5e7e4016b17a2a2e1285a936"),
//     "title" : "third Post",
//     "date" : "Fri Mar 27 2020 23:38:29 GMT+0530 (India Standard Time)",
//     "head_img" : "1.jpg",
//     "__v" : 0
// }