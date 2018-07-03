const express = require('express');
const router = express.Router();
const userController= require('../controllers/userController');
const ideaController =require('../controllers/ideaController');
const {ensureAuthenticated}= require('../helpers/auth');



// users routes
router.get('/login',userController.getloginPage)
// login form post
router.post('/login',userController.postLogin)
// user register route
router.get('/register',userController.getRegisterPage)
// register form post
router.post('/register',userController.postRegisterPage)
// logout user
router.get('/logout',userController.logOutPage)


//idea routes




 
router.get('/ideas',ensureAuthenticated,ideaController.ideaHomePage)

//add idea form
router.get ('/add',ensureAuthenticated,ideaController.getAddIdeaPage)

//Edit Ideas Form
router.get ('/edit/:id',ensureAuthenticated,ideaController.getIdeaEdit)



//process form
router.post('/ideas',ensureAuthenticated,ideaController.postAddIdeaProcess)
//edit form process
router.put('/:id',ensureAuthenticated,ideaController.putEditIdea)
//delete idea
router.delete('/:id',ideaController.deleteIdea)

module.exports = router;