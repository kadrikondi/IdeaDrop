const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//load idea model formdb
require('../models/Idea');
const Idea = mongoose.model('ideas');

  //idea index page for ideas
  router.get('/' ,(req, res)=>{
    Idea.find({})
    .sort({date:'asc'})
    .then(ideas=>{

       res.render('ideas/index' , {ideas:ideas
       });
    })
});

//add idea form
router.get ('/add' , (req, res)=>{
Idea
res.render('ideas/add')
});

//Edit Ideas Form
router.get ('/edit/:id' , (req, res)=>{
Idea.findOne({
   _id:req.params.id
})
.then(idea =>{
res.render('ideas/edit', {idea:idea})

})
});

//process form
router.post('/', (req,res)=>{
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
const newUser ={
   title:req.body.title,
   details:req.body.details
}
new Idea(newUser).save()
.then(idea =>{
   req.flash('success_msg' ,'future Idea Added');
  
   res.redirect('/ideas');
})

}


});

//edit form process
router.put('/:id', (req,res)=>{
Idea.findOne({
   _id:req.params.id
})
.then(idea =>{
   //new value
   idea.title =req.body.title;
   idea.details = req.body.details;

   idea.save()
   .then(idea=>{
       req.flash('success_msg', 'future idea updated');
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
   req.flash('success_msg' ,'future Idea removed');
   res.redirect('/ideas');
});
});

module.exports=router;