const express = require ('express');
const exphbs = require('express-handlebars');

const mongoose = require('mongoose');
const bodyParser = require('body-parser')


const app = express();
//conect the db
mongoose.connect('mongodb://kadrikondi:kadzee222@ds129670.mlab.com:29670/kondidb');
//load idea model formdb
require('./models/Idea');
const Idea = mongoose.model('ideas');




//Connect to mongoose

// handlebars  middleware works
app.engine('handlebars',exphbs({defaultLayout: 'main'
}))
app.set('view engine','handlebars');

//body parser middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


//index route
 app.get('/', (req,res) =>{
    const title = 'welcome kondi';
res.render("index", {title:title
});

 });
 
 // About Route
 app.get('/about' , (req,res)=> {
    res.render('about');
    
     });
     //blog route
     app.get('/contact' ,(req, res)=>{
         res.render('contact');
     });
     //idea index page for ideas
     app.get('/ideas' ,(req, res)=>{
         Idea.find({})
         .sort({date:'desc'})
         .then(ideas=>{

            res.render('ideas/index' , {ideas:ideas
            });
         })
     });
     
//add idea form
app.get ('/ideas/add' , (req, res)=>{
    Idea
    res.render('ideas/add')
});

//Edit Ideas Form
app.get ('/ideas/edit/:id' , (req, res)=>{
    Idea.findOne({
        _id:req.params.id
    })
    .then(idea =>{
    res.render('ideas/edit', {idea:idea})

    })
});

//process form
app.post('/ideas', (req,res)=>{
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
        res.redirect('/ideas');
    })
    
}


});


//server
const port = 5000;
app.listen(port, ()=>{
    console.log(`server started at ${port}`)
});
