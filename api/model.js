const mongoose = require('mongoose');
const reviewSchema = mongoose.Schema({
    reviewerName: {
        type: String,
        required: true,
        minlength: 3
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    content: {
        type: String,
        required: false,
        minlength: 3
    }
})

const restaurantSchema = mongoose.Schema({
    restaurantName: {
        type: String,
        required: true,
        minlength: 3
    },
    cuisine: {
        type: String,
        required: true,
        minlength: 3
    },
    reviews: {
        type: [reviewSchema],
        default: [],
    }
}, {
    timestamps: true,
    versionKey: false
})


module.exports = mongoose.model('restaurant', restaurantSchema);