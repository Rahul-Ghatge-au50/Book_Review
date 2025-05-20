const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoute');
const bookRoutes = require('./routes/bookRoute');
const reviewRoutes = require('./routes/reviewRoute');

dotenv.config();

//Connecting to DB
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
    }catch(error){
        console.error("Error connecting MongoDB");
        process.exit(1);
    }
};
connectDB();

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes 
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = 8000;

app.listen(PORT,() => {
    console.log("Listening on the Port number", PORT);
});

