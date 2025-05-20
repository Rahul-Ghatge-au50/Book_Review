const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req,res) => {
    try{

        //Destructuring the user Data
        const {name,email,password} = req.body;
        const userExists = await User.findOne({email:email});

        //Check wether the user is already register or not
        if(userExists) return res.status(401).json({message:"User already exists"});

        //Hasing password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const user = await User.create({ name, email, password: hashPassword });

        res.status(200).json({
            user:{
                id:user.id,
                name:user.name,
                email:user.email
            }
        });

    }catch(error){
        res.status(500).json({message:"Internal Server error"})
    }
};

const login = async (req,res) => {
    try{
        //Destructuring the user Data
        const {email,password} = req.body;

        //checking for valid user email
        const user = await User.findOne({email:email})
        if(!user) return res.status(400).json({message:"Invalid user or password"});

        //compareing the bcrypt password
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                status: 'fail',
                message:"Password is incorrect"
            })
        };

        //Creating a token for a user to check the authentication
        const token = await jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'1h'})

        res.status(200).json({
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email
            }
        });
    }catch(error){
        res.status(500).json({message:"Internal Server error"})
    }
};

module.exports = {login,register};