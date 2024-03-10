const { body, check, param } = require("express-validator");
const Admin = require("../../models/admin");
const Movie = require("../../models/movie");


const loginValidationRules = [
    body('email').isEmail().withMessage('name must be string').custom(async (email) => {
        const checkAdmin = await Admin.countDocuments({
            email
        });
        if (checkAdmin == 0) throw new Error('Admin not exist !!');
        if (checkAdmin > 0) return true;
    }),
    body('password').isStrongPassword().withMessage('password must be string'),
];

const addMovieValidationRules = [
    body('title').isString().withMessage('title must be string').custom(async (title) => {
        const checkMovie = await Movie.countDocuments({
            title
        })

        if (checkMovie !== 0) throw new Error('Movie already exist in the lobby');
        return true
    }),
    body('releaseYear').isInt({ gt: 1000 }).withMessage('release year must be of 4 digit'),
    body('genre').isString().withMessage('genre must be required'),
    body('rating').isFloat().withMessage('rating must be required'),
    body('streamLink').isURL().withMessage('stream Link is required')
];

const updateMovieValidationRules = [
    param('id').isString().withMessage('id must be in string').custom(async (id) => {
        const checkMovie = await Movie.countDocuments({ _id: id })
        console.log(checkMovie);
        if (checkMovie === 1) return true;
        throw new Error('Movie not exist');
    }),
    body('title').optional().isString().withMessage('title must be string').custom(async (title) => {
        const checkMovie = await Movie.countDocuments({
            title
        })

        if (checkMovie !== 0) throw new Error('Movie already exist in the lobby');
        return true
    }),
    body('releaseYear').optional().isInt({ gt: 1000 }).withMessage('release year must be of 4 digit'),
    body('genre').optional().isString().withMessage('genre must be required'),
    body('rating').optional().isFloat().withMessage('rating must be required'),
    body('streamLink').optional().isURL().withMessage('stream Link is required')
];

const deleteMovieValidationRules = [
    param('id').isString().withMessage('id must be string')
]




module.exports = { loginValidationRules, addMovieValidationRules, updateMovieValidationRules, deleteMovieValidationRules }
