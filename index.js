const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const flash = require('connect-flash')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const verifyToken = require('./middleware/verify')
const app = express()


//app uses
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//path and static files
const path = require('path');
app.use(express.static(path.join(__dirname+'/public')));

//passport initialize
app.use(session({
    secret:'nehashubham',
    resave:true,
    saveUnitialized:true
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(email, done) {
    done(null, email.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


// locals 
app.use((req,res,next)=>
{
    res.locals.user = req.user || null;
    next();
})

// mongodb initialization
mongoose.connect('mongodb://localhost:27017/cms1',{useUnifiedTopology:true,useNewUrlParser:true},(err)=>
{
    if(err){
        console.log(err)
    }
    console.log('connected');
})
passport.use(new LocalStrategy({usernameField : 'email'},function(email, password, done) {
    
    User.findOne({email1 : email},function(err,user)
    {
        if(err) {return done(err)}
        if (!user) { return done(null,false)}
        if (user.password1 !=password ) { 
            return done(null,false)   
        }
        return done(null,user);       
    })
}));




// routes  importing
// const home = require('./home')
const user = require('./routes/user');
const post = require('./routes/post')
const comment = require('./routes/comment')
const cat = require('./routes/cat')
const home = require('./routes/home')

// routes declaration
// app.use('/',home);
app.use('/user',user);
app.use('/post',post)
app.use('/comment',comment)
app.use('/cat',cat)
app.use('/home',home)

app.get('/home',(req,res)=>
{
     res.json(req.user);
})



app.get('/login',(req,res)=>
{
    res.send('problem hai boss')
})



app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res)
    {
     jwt.sign({user : req.user},'secretkey',(err,token)=>
     {
        req.token = token;
        console.log(req.user)
        res.json({
            user : req.user,
            token
        })

     })

    
})

app.get('/new',verifyToken,(req,res)=>
{
    console.log(req.user);
    jwt.verify(req.token,'secretkey',(err,authData)=>
    {
        if(err){
            res.sendStatus(403);
        }
        else
        {
            res.json({
                message : 'succesfull',
                authData
            })
        }
    })
    
    	
    
})




app.listen(9998);








