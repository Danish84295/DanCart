const userModel =require("../model/User");
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const sendEmail =require('../utils/sendEmail');

const generateToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: '30d'});
};

const registerUser =async (req, res)=>{
    console.log(req.body);

    const {name,email,password}=req.body;
    try{
        const existinguser =await userModel.findOne({email});
        if(existinguser){
            return res.status(400).json({message: 'User already exists'});
        }
        //TODOS : hash the password before save into db
        //TODOs : Implement JWT token gnereation for authentication
        //TODOS : OTP sending and verfication for email confirmantion
        //TODO : Welcome MAil

        const salt =await bcrypt.genSalt(10);   
        const hashedPassword =await bcrypt.hash(password,salt);

        const user =await userModel.create({name,email,password: hashedPassword});
        if(user){
            const otp =Math.floor(100000+Math.random()*900000).toString();

            const message = `Welcome to DanCart, ${name}!
                Thank you for registering with us. We are excited to have you as part of the DanCart community.
                To complete your registration, please verify your email address using the One-Time Password (OTP) provided below.
                Your OTP: ${otp}
                This OTP is valid for 10 minutes.
                For your security, please do not share this OTP with anyone. If you did not create a DanCart account, you can safely ignore this email.

                Happy Shopping!

                Best regards,
                Team DanCart`;
            
            await sendEmail(email,'Welcome to DanCart - Your OTP for Registration', message);
            
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email: user.email,
                role:user.role,
                token:generateToken(user._id)
            });
        }
        else{
            res.status(400).json({message: 'Invalid user data'});
        }

    }catch(error){
        console.log(error);
        res.status(500).json({message:'Server error'});
    }
};

//login user

const loginUser=async (req,res)=>{
    const {email,password}= req.body;
    try{
        const user =await userModel.findOne({email});
        if(user && (await bcrypt.compare(password,user.password))){
            res.json({
                _id:user._id,
                name: user.name,
                email: user.email,
                role : user.role,
                token: generateToken(user._id)
            });
            console.log('User is login ', user);
        }else{
            res.status(400).json({message : 'Invalid email or password'});
        }
    }catch(error){
        res.status(500).json({message : 'Server error'});
    }
};

const getUsers =async (req,res)=>{
    try{
        const users = await userModel.find({}).select('-password');
        res.json(users);
    }
    catch(error){
        res.status(500).json({message: error});
    }
};

module.exports = {registerUser,loginUser,getUsers};