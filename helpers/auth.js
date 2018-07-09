module.exports ={
    ensureAuthenticated: (req,res,next)=>{
        if(req.isAuthenticated()){
            return next();
        }else{
        req.flash('error_msg','Not Authorized You Need to login ');
        res.redirect('/login');
    }
    }
}