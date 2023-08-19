const express = require ('express');
const path =require('path');
const exphbs = require('express-handlebars');
const methodOverride =require('method-override');
const flash =require('connect-flash');
const Handlebars = require('handlebars');
const session = require('express-session')
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');


const app = express();
//load routes
//const ideas = require('./routes/ideas');
const router = require('./routes/index');
//PASSPORT config
require('./config/passport')(passport);
//db config
const db =require('./config/database');
//conect to config online
mongoose.connect('mongodb+srv://ohonotv:kadri4God222.@cluster0.mowhcx2.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
.then(()=>{
    console.log('database connect')
})
.catch(err =>{
    console.log(err)
})


// //conect the db
// mongoose.connect('mongodb://localhost/ideadrop')||
// mongoose.connect('mongodb://kadrikondi:kadzee222@ds129670.mlab.com:29670/kondidb');



// "mongoose": "^5.1.2",

//Connect to mongoose

// handlebars  middleware works
app.engine('handlebars',exphbs({defaultLayout: 'main',
    // ...implement newly added insecure prototype access
    handlebars: allowInsecurePrototypeAccess(Handlebars)

}),
)
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
}));
//passport middleware
app.use(passport.initialize());
  app.use(passport.session());
//flash midleware
app.use(flash()); 
//Global variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error =req.flash('error');
    res.locals.user =req.user || null;
 next();
});

//index route
 app.get('/', (req,res) =>{
    const title = 'Welcome IdeaDrop';
res.render("index", {title:title
});

 });
 
 // About Route
 app.get('/about' , (req,res)=> {
    res.render('about');
    
     });
     //contact route
     app.get('/contact' ,(req, res)=>{
         res.render('contact');
     });
   

//use routes
//app.use('/ideas', ideas);
app.use('/', router);
//server
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`server started at ${port}`)
});
