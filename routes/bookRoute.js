const express = require('express');
const {addBook,getBooks,getBook} = require('../controllers/bookController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/',auth,addBook);
router.get('/',getBooks);
router.get('/:id',getBook);

module.exports = router;
