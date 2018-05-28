const express = require ('express');
const path =require('path');
const exphbs = require('express-handlebars');
const methodOverride =require('method-override');
const flash =require('connect-flash');
const session = require('express-session')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


const app = express();
//load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');
//conect the db
mongoose.connect('mongodb://kadrikondi:kadzee222@ds129670.mlab.com:29670/kondidb');




//Connect to mongoose

// handlebars  middleware works
app.engine('handlebars',exphbs({defaultLayout: 'main'
}))
app.set('view engine','handlebars');

//body parser middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
//static  folder
app.use(express.static(path.join(__dirname,'public')))
// method override middlware
app.use(methodOverride('_method'));
// express session midlleware
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
   // cookies:{secure:true}
}))
app.use(flash());
//Global variable to use flash message
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error =req.flash('error');
 next();
});

//index route
 app.get('/', (req,res) =>{
    const title = 'Welcome kondi';
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
   

//use routes
app.use('/ideas', ideas);
app.use('/users', users);
//server
const port = 5000;
app.listen(port, ()=>{
    console.log(`server started at ${port}`)
});
