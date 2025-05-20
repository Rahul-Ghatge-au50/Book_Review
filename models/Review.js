const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    bookId:{type:mongoose.Schema.Types.ObjectId, ref:'Book'},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    rating:{type:Number},
    comment:{type:String}
},{ timestamps: true });   //Automaticlly add manage created and updated fields in documents


module.exports = mongoose.model('Review', ReviewSchema)