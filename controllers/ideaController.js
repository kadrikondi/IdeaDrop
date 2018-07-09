const mongoose = require('mongoose');
//load idea model formdb
require('../models/Idea');
const Idea = mongoose.model('ideas');



 //idea index page for ideas
exports.ideaHomePage=(req, res)=>{
    //find single user with id
   Idea.find({user:req.user.id}) //to find all ideas =Idea.find({});
    .sort({date:'asc'})
    .then(ideas=>{
const username= req.user.name
    res.render('ideas/index' , {ideas:ideas,username:username
              });
      console.log(username)
   })
}
//add idea form
exports.getAddIdeaPage =(req, res)=>{
    Idea
    res.render('ideas/add',{username:req.user.name})
    };



exports.getIdeaEdit= (req, res)=>{
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
        

        
        }

//process form
exports.postAddIdeaProcess=(req,res)=>{
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
      title:req.body.title,
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
   
   
   };
   

exports.putEditIdea= (req,res)=>{
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
    };


    exports.deleteIdea=(req,res)=>{
        Idea.remove({
           _id:req.params.id
        })
        .then(()=>{
           req.flash('success_msg' ,'You removed one Idea ');
           res.redirect('/ideas');
        });
        };