const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment')
var ObjectId = require('mongodb').ObjectId;
const User = require('../models/User')
const async = require('async')
const Post = require('../models/Post')

router.all('*',(req,res,next)=>
{
    next();
})

router.post('/new',(req,res)=>
{
    var newComment = new Comment({
        post : ObjectId('5e7e411ddb85002ecc29646a'),
        user : ObjectId('5e71db59ceb47d190b75af7d'),
        body : ' second Comment '
    })


    newComment.save().then(result =>
    {
        console.log(result)
        
        // Post.findOne({_id : ObjectId(result.post)}).limit().lean().then(post=>
        // {
        //     console.log(result._id);
        //     console.log(post)
        //     post.comment.push(ObjectId(result._id))
        //     post.markModified('comment');
            
        //     post.save().then(abc=>
        //     {
        //         console.log(abc)
        //     });
        //     res.send('comment posted')
        // })
        res.send('comment posted');
        
    })

})
router.get('/:postid',(req,res)=>
{
    const obj1= []
    Comment.find({post :ObjectId(req.params.postid)}).populate('user').limit().lean().then(result2 =>
    {
        
        
        if(result2)
        {
            console.log(result2)
            res.send(result2)
             // var a = result2.length;
            
            
            // var i = 0
            // async.each(result2, (rec, callback) => {
                
            //     User.findOne({_id : ObjectId(rec.user)}).limit().lean().then(result3=>
            //     {
            //         i=i+1 
            //         let user1 = 
            //         {
            //             name : result3.user1,
            //             email : result3.email1,
            //             photos : result3.photos1
            //         }
                    
            //         obj1.push({
            //             comment : rec.body,
            //             user:user1
            //         });
            //         if(i==a)
            //         {
            //             console.log(obj1)
            //             res.send(obj1)

            //         } 
                    

                    
                    
                    
                    
                        
                            
            //     })
            // })
            
            
            
            
            
              
            
            
        }
        else
        {
            res.send('not found')
        }   
    })
        
})

module.exports = router;
