const userModel =require("../model/User");
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');

const generateToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: '30d'});
};

const registerUser =async (req, res)=>{
    // console.log(req.body);

    const {name,email,password}=req.body;
    try{
        const existinguser =await userModel.findOne({email});
        if(existinguser){
            return res.status(400).json({message: 'User already exists'});
        }
        //TODOS : hash the password before save into db
        //TODOs : Implement JWT token gnereation for authentication
        

        const salt =await bcrypt.genSalt(10);   
        const hashedPassword =await bcrypt.hash(password,salt);

        const user =await userModel.create({name,email,password: hashedPassword});
        
    }catch(error){
        console.error(error);
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
            // console.log('User is login ', user);
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