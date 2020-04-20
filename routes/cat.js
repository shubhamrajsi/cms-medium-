const express = require('express')
const router = express.Router();
const Category = require('../models/Category');

router.post('/create',(req,res)=>
{
    var cat1 = new Category({
        category : 'Node.js'
    })
    
    cat1.save().then(result=>
    {
        res.send(result)
    })
})
router.get('/',(req,res)=>
{
    Category.find().limit().lean().then(result=>
    {
	if(!result)
	{
	    res.send('no categories found')
	}
	res.send(result);
    })
})

module.exports = router;
