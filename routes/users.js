const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// load user model
require ('../models/User');
const User = mongoose.model('users');

// user login route
router.get('/login', (req,res)=>{
    res.render('users/login');
})
// login form post
router.post('/login', (req,res, next)=>{
passport.authenticate('local',{
    successRedirect:'/ideas',
    failureRedirect:'/users/login',
    failureFlash:true
})(req,res,next);
})
// user register route
router.get('/register', (req,res)=>{
    res.render('users/register');
});
// register form post
router.post('/register', (req,res)=>{
    //validation
    let errors =[];

    if (req.body.password !=req.body.password2){
        errors.push({text:'passwords do not match'
    });
}
if (req.body.password.length< 4){
    errors.push({text:'password must be atleat 4 charaters'});
}  
if (errors.length >0){
    res.render('users/register',{
        errors:errors,
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        password2:req.body.password2
    });
//create a new user
}else{
    User.findOne({email: req.body.email})
    .then(user=>{
        if (user){
            req.flash('error_msg', 'Email already Registered');
            res.redirect('/users/register')
        }else{

            const newUser =  new User({
                name :req.body.name,
                email: req.body.email,
                password:req.body.password
            })
            bcrypt.genSalt(10, (err,salt)=>{
                bcrypt.hash(newUser.password, salt, (err,hash)=>{
                    if (err) throw err;
                    newUser.password =hash;
                    newUser.save()
                    .then(user =>{
                     req.flash('success_msg' ,'You are now registered and can log in') ;
                     res.redirect('/users/login') ;
                    })
                .catch(err=>{
                    console.log(err);
                    return;
                })
                });
            })
        

        }
    });
    
}
})
// logout user
router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login')
})
module.exports = router;