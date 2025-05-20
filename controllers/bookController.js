const Book = require('../models/Book');
const Review = require('../models/Review');
const mongoose = require('mongoose');

const addBook =  async (req,res) => {
    try{
        const book = await Book.create(req.body);

        //Check error while adding Book
        if(!book){
           return res.status(401).json({message:"Internal Server error"})
        }
        
        res.status(200).json({message:"Book Added"})
    }catch(error){
        res.status(500).json({message:"Internal Server error"})
    }
};

const getBooks = async (req,res) => {
    try{

        //Destructure filters and pagination paramter and keep default if not available
        const {author,genre,title, page = 1, limit = 10} = req.query;
        const query = {};

        // if filters are present, add them to query and using RegExp for case-inensitive partial match
        if(author) query.author = new RegExp(author,'i');
        if(genre) query.genre = new RegExp(genre,'i');
        if(title) query.title = new RegExp(title,'i');

        const books = await Book.find(query).skip((page-1)*limit).limit(parseInt(limit));

        const count = await Book.countDocuments(query);

        //+page convert page to number and calculate total pages
        res.json({
            books, 
            total: count, 
            page: +page, 
            pages: Math.ceil(count / limit) 
        });
    }catch(error){
        res.status(500).json({message:"Internal Server error"});
    }
};

const getBook = async (req,res) => {
    try{
        const {id} = req.params;
        const { page = 1, limit = 5} = req.query;

        //Find book by Id
        const book = await Book.findById(id);

        //Return error if no book found
        if(!book) return res.status(401).json({message:"Book not Found"});

        const Reviews = await Review.find({bookId:id}).skip((page-1)*limit).limit(parseInt(limit));

        const totalReview = await Review.countDocuments({bookId:id});

        //aggregate average rating for the Book
        const avgResult = await Review.aggregate([
            {
                $match:{bookId:new mongoose.Types.ObjectId(id)}
            },

            //group by bookId and calculate the avg rating
            {
                $group:{
                    _id:"$bookId",
                    avgRating:{$avg:"$rating"}
                }
            }
        ]);

        // If there is an average rating result, extract it, otherwise set to 0
        const averageRating = avgResult.length > 0 ? avgResult[0].avgRating : 0;

        res.json({
            book,
            averageRating: averageRating.toFixed(2),
            Reviews,
            totalReview,
            page: +page,
            pages: Math.ceil(totalReview / limit),
        });

    }catch(error){
        res.status(500).json({message:"Internal Server error"});
    }
};


module.exports = {addBook,getBooks,getBook};