const express = require('express');
const mongoose = require('mongoose')
const app = express();
const PORT = 5000;


// Settings
app.use(express.urlencoded({extended: true}));
app.use(express.json())
mongoose.connect('mongodb://localhost/belt_exam', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.use(express.static(__dirname + '/public/dist/public'));
const routes = require('./api/routes')(app);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})