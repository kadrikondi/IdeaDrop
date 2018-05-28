const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');



// user login route
router.get('/login', (req,res)=>{
    res.render('users/login');
})
// user register route
router.get('/register', (req,res)=>{
    res.render('users/register');
});
module.exports = router;