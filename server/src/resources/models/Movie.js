const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const MovieSchema = new Schema(
    {
        title: {type: String, required: true},
        description: {type: String},
        overview: {type: String},
        genre: {type: Array},
        popularity: {type: Number},
        media_type: {type: String},
        release: {type: Date},
        video: {type: String},
        poster: {type: String},
        language: {type: String},
        vote_average: {type: Number},
        vote_count: {type: Number},
        adult: {type: Boolean, default: false},
        backdrop: {type: String},
        slug: {type: String, slug: 'title', unique: true}
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Movie', MovieSchema);
