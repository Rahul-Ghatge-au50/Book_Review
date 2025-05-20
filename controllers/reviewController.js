const Review = require('../models/Review');


const addReview = async (req,res) => {
  try{
      const review = await Review.create({
        bookId: req.query.bookId,
        userId: req.query.userId,
        rating: req.body.rating,
        comment: req.body.comment,
      });

      // Check while adding a Review
      if(!review) return res.status(401).json({message:"Error in add Review"});
      res.status(200).json({message:"Review added successfully"});
  }catch(error){
    res.status(500).json({message:"Internal Server error"});
  }
};

const updateReview = async (req, res) => {
  try{
    // Get a single Review by ID
    const review = await Review.findById(req.params.id);
    
    //Check wether the review is there or check wether the review is created by the logged in user
    if (!review || review.userId.toString() !== req.query.userId){
      return res.status(401).json({ message: 'Unauthorized' });
    };

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();

    res.status(200).json({message:"Review updated successfully"});
  }catch(error){
    res.status(500).json({message:"Internal Server error"});
  }
};
  

const deleteReview = async (req, res) => {
  try{
    // Get a single Review by ID
    const review = await Review.findById(req.params.id);

    //Check wether the review is there or check wether the review is created by the logged in user
    if (!review || review.userId.toString() !== req.query.userId){
      return res.status(403).json({ message: 'Unauthorized' });
    }
  
    await review.deleteOne();
    res.status(200).json({ message: 'Review deleted' });
  }catch(error){
    res.status(500).json({message:"Internal Server error"});
  }
};
  

module.exports = {addReview,updateReview,deleteReview};