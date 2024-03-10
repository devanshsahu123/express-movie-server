const { genSalt, hash, compare } = require("bcrypt");
const Admin = require("../models/admin");
const { successHandler, errorHandler } = require("../helpers/responseHandler");
const jwt = require('jsonwebtoken');
const Movie = require("../models/movie");
const { ObjectId } = require('mongodb');

//signup only for production
const signup = async (req, res) => {
    try {
        req.body.password = await hash(req.body.password, await genSalt(10));
        const result = await Admin.create(
            req.body
        )
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        const compairPassword = await compare(password, admin.password);

        if (!compairPassword) throw new Error('Invalid Admin !! password');

        const token = await jwt.sign(email, process.env.SECRET_KEY)

        return successHandler(res, "user login successfully", { token })
    } catch (error) {
        return errorHandler(res, error)
    }
}

const searchMovie = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            throw new Error('no search query exist');
            //we can do it , but still perform search opration while fetching allMovie list is good approch 
            // return res.redirect('http://localhost:3003/movies')
        }
        const data = await Movie.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { genre: { $regex: query, $options: 'i' } }
            ]
        })
        return successHandler(res, "movies searched successfully", data);
    } catch (error) {
        console.log(error);
        errorHandler(res, error)
    }
}

const getMovies = async (req, res) => {
    try {
        //use this code for reduce load on the server ;
        // const limit = 10;
        // const skip = 0;
        // const MoviesList = await Movie.find({}).skip(limit * skip).limit(limit);

        const MoviesList = await Movie.find({});
        return successHandler(res, "get movies successfully ", MoviesList)
    } catch (error) {
        return errorHandler(res, error)
    }
}

const addMovie = async (req, res) => {
    try {
        const createMovie = await Movie.create(req.body);
        return successHandler(res, "movie added successfully", createMovie)
    } catch (error) {
        console.log(error);
        return errorHandler(res, error)
    }
}

const updateMovie = async (req, res) => {
    try {
        const update = await Movie.updateOne({ _id: req.params.id }, { $set: req.body });
        return successHandler(res, "movie updated successfully");
    } catch (error) {
        return errorHandler(res, error)
    }
}

const deleteMovie = async (req, res) => {
    try {
        const effected = await Movie.deleteOne({ _id: req.params.id });
        return successHandler(res, "movie deleted successfully", effected)
    } catch (error) {
        return errorHandler(res, error)
    }
}


module.exports = {
    signup,
    login,
    searchMovie,
    getMovies,
    addMovie,
    updateMovie,
    deleteMovie
}