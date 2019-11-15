const Restaurants = require('./model');

function success(data) {
    return {
        message: 'success',
        data: data
    }
}

function failure(err) {
    return {
        message: 'failure',
        errors: err
    }
}


module.exports = {
    allRestaurants: (req, res) => {
        Restaurants.find().catch(err => res.json(failure(err)))
            .then(data => res.json(success(data)))
    },

    createRestaurant: (req, res) => {
        Restaurants.create(req.body).catch(err => res.json(failure(err)))
            .then(data => res.json(success(data)))
    },
    oneRestaurant: (req, res) => {
        Restaurants.findOne({
                _id: req.params.id
            }).catch(err => res.json(failure(err)))
            .then(data => res.json(success(data)))
    },
    editRestaurant: (req, res) => {
        Restaurants.updateOne({
                _id: req.params.id
            }, req.body, {
                runValidators: true
            }).catch(err => res.json(failure(err)))
            .then(data => res.json(success(data)))
    },
    deleteRestaurant: (req, res) => {
        Restaurants.deleteOne({
                _id: req.params.id
            }).catch(err => res.json(failure(err)))
            .then(data => res.json(success(data)))
    },
    addReview: (req, res) => {
        Restaurants.updateOne({
                _id: req.params.id
            }, {
                $push: {
                    reviews: req.body
                }
            }, {
                runValidators: true
            }).catch(err => res.json(failure(err)))
            .then(data => res.json(success(data)))
    }
}