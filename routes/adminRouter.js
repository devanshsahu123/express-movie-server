const adminController = require('../controllers/adminController')
const authMiddleware = require('../middlewares/authMiddleware')
const handleValidationErrors = require('../validations/handleValidationErrors')
const adminValidationRules = require('../validations/home/adminValidationRules')

const router = require('express').Router()

//signup only for production ;
router.post('/signup', adminController.signup)
//login for Admin
router.post('/login', adminValidationRules.loginValidationRules, handleValidationErrors, adminController.login)

//  both the api can be one ;        //  note  //

//search movies
router.get('/search', adminController.searchMovie) // used adminController
//list movies on lobby;
router.get('/movies', adminController.getMovies); // used adminController

router.use(authMiddleware) //protected routes for admin roles

router.post('/movies', adminValidationRules.addMovieValidationRules, handleValidationErrors, adminController.addMovie)
router.put('/movies/:id', adminValidationRules.updateMovieValidationRules, handleValidationErrors, adminController.updateMovie)
router.delete('/movies/:id', adminValidationRules.deleteMovieValidationRules, handleValidationErrors, adminController.deleteMovie)
module.exports = router