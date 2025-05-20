const express = require('express');
const {addReview,updateReview,deleteReview} = require('../controllers/reviewController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/',auth,addReview)
router.put('/:id',auth,updateReview)
router.delete('/:id',auth,deleteReview)

module.exports = router;