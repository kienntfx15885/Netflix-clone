const Movie = require('../../resources/models/Movie');

const MovieController = {
    // [POST] /api/movies/create
    // @desc Create new movie
    create: async function (req, res) {
        if (req.user.isAdmin) {
            try {
                const newMovie = new Movie(req.body);

                await newMovie.save();

                res.json({ success: true, message: 'Create new movie', newMovie });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        } else {
            return res.status(403).json({ success: false, message: 'You are not allowed' });
        }
    },

    // [PUT] /api/movies/:_id
    // @desc Update movie
    update: async function (req, res) {
        if (req.user.isAdmin) {
            try {
                const movieUpdated = await Movie.findByIdAndUpdate(req.params._id, req.body);

                if (!movieUpdated) {
                    return res.status(400).json({ success: false, message: 'Have no movie' });
                }

                return res.json({ success: true, message: 'Update movie', movieUpdated });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        } else {
            return res.status(403).json({ success: false, message: 'You are not allowed' });
        }
    },

    // [DELETE] /api/movies/:_id
    // @desc Delete movie
    delete: async function (req, res) {
        if (req.user.isAdmin) {
            try {
                const movieDeleted = await Movie.findByIdAndDelete(req.params._id);

                return res.json({ success: true, message: 'Delete movie', movieDeleted });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
        } else {
            return res.status(403).json({ success: false, message: 'You are not allowed' });
        }
    },

    // [GET] /api/movies/:slug
    // @desc Get detail movie
    show: async function (req, res) {
        try {
            const movie = await Movie.find({ slug: req.params.slug });

            return res.json({ success: true, message: 'Find movie', movie });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    // [GET] /api/movies/random
    // @desc Get random movie
    random: async function (req, res) {
        const type = req.query.type;
        let movie;
        try {
            if (type === 'series') {
                movie = await Movie.aggregate([{ $match: { isSeries: true } }, { $sample: { size: 1 } }]);
            } else {
                movie = await Movie.aggregate([{ $match: { isSeries: false } }, { $sample: { size: 1 } }]);
            }
            return res.json({ success: true, message: 'Random movie', movie });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },


    // [GET] /api/movies/
    // @desc Show all
    showAll: async function (req, res) {
        try {
            const movies = await Movie.find({})
            return res.json({ success: true, message: 'All movie', movies: movies.reverse() });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },
};

module.exports = MovieController;
