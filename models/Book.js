const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title:{type:String},
    author:{type:String},
    genre:{type:String},
    description:{type:String}
});


module.exports = mongoose.model('Book', BookSchema)