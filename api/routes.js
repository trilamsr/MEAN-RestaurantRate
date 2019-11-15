const controller = require('./controller');
const path = require('path');

module.exports = app => {
    app.get(`/api/restaurants`, controller.allRestaurants),
    app.post(`/api/restaurants`, controller.createRestaurant),

    app.get(`/api/restaurants/:id`, controller.oneRestaurant),
    app.put(`/api/restaurants/:id`, controller.editRestaurant),
    app.delete('/api/restaurants/:id', controller.deleteRestaurant),

    app.post(`/api/restaurants/review/:id`, controller.addReview)

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
}