const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');


// load user model
require ('../models/User');
const User = mongoose.model('users');



exports.getloginPage= (req,res)=>{
    res.render('users/login');
 }

exports.postLogin = (req,res, next)=>{
    passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/login',
        failureFlash:true
    })(req,res,next);
    }


exports.getRegisterPage= (req,res)=>{
        res.render('users/register');
    }

exports.postRegisterPage = (req,res)=>{
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
//create a new user     8888
}else{
    User.findOne({email: req.body.email})
    .then(user=>{
        if (user){
            req.flash('error_msg', 'Email already Registered');
            res.redirect('/register')
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
                     res.redirect('/login') ;
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
}

exports.logOutPage=(req,res)=>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login')
}