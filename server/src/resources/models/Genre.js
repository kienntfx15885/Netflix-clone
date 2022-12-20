const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema(
    {
        name: { type: String, required: true },
        movies: { type: [mongoose.Schema.Types.ObjectId] },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.modedl('Genre', GenreSchema);
