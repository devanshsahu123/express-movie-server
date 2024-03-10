const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    releaseYear: {
        type: String,
        require: true,
    },
    genre: {
        type: String,
        require: true,
    },
    rating: {
        type: Number,
        require: true,
    },
    streamLink: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;