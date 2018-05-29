const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated}= require('../helpers/auth')

//load idea model formdb
require('../models/Idea');
const Idea = mongoose.model('ideas');

  //idea index page for ideas
  router.get('/' , ensureAuthenticated,(req, res)=>{
    Idea.find({user:req.user.id}) //find single user with id
    .sort({date:'asc'})
    .then(ideas=>{

       res.render('ideas/index' , {ideas:ideas
       });
    })
});

//add idea form
router.get ('/add' , ensureAuthenticated,(req, res)=>{
Idea
res.render('ideas/add')
});

//Edit Ideas Form
router.get ('/edit/:id' , ensureAuthenticated, (req, res)=>{
Idea.findOne({
   _id:req.params.id
})
.then(idea =>{
    if(idea.user != req.user.id){// authenticate that only your own idea you can edit
        req.flash('error_msg', 'Not authorized');
        res.redirect('/ideas');


    }else{res.render('ideas/edit', {idea:idea})
}

})


});

//process form
router.post('/', ensureAuthenticated,(req,res)=>{
 //validation
    let errors =[];

if(!req.body.title){
errors.push({text:`please add some title`});
}
if(!req.body.details){
errors.push({text:`please add some details`});
}
if (errors.length > 0){
res.render('ideas/add', {
   errors:errors,
   title:req.body.tile,
   details:req.body.details
});
}else{
const newIdea ={
   title:req.body.title,
   details:req.body.details,
   user:req.user.id
}
new Idea(newIdea).save()
.then(idea =>{
   req.flash('success_msg' ,'Your Idea Added');
  
   res.redirect('/ideas');
})

}


});

//edit form process
router.put('/:id',ensureAuthenticated, (req,res)=>{
Idea.findOne({
   _id:req.params.id
})
.then(idea =>{
   //new value
   idea.title =req.body.title;
   idea.details = req.body.details;

   idea.save()
   .then(idea=>{
       req.flash('success_msg', 'Your Idea is updated');
       res.redirect('/ideas');
   })

});
});
//delete idea
router.delete('/:id' , (req,res)=>{
Idea.remove({
   _id:req.params.id
})
.then(()=>{
   req.flash('success_msg' ,'You removed one Idea ');
   res.redirect('/ideas');
});
});

module.exports=router;