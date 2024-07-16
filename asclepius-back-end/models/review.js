const mongoose = require('mongoose');
const User = require('./user')
const Practitioner = require('./practitioner')

const replySchema = new mongoose.Schema({
    content: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
    { timestamps: true },
)

const reviewSchema = new mongoose.Schema({
    content: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    practitioner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Practitioner',
    },
    replies: [replySchema],
},
    { timestamps: true },
)


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;