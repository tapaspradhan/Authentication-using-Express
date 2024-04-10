const userModel = require("../model/userSchema");
const emailValidator=require("email-validator")
const bcrypt=require("bcrypt")

const signup=async (req,res,next)=>{
    const {name, email, password, confirmPassword,bio,username}=req.body;
    console.log(name, email, password, confirmPassword,bio,username);

    if(!name || !email || !password || !confirmPassword){
        return res.status(400).json({
            success:false,
            message:"All field are required"
        })
    }

    const validEmail=emailValidator.validate(email)
    if(!validEmail){
        return res.status(400).json({
            success:false,
            message:"Email field is required"
        })
    }

    if(password !== confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password shoud be same"
        })
    }

    try {
        const userInfo=userModel(req.body)
        const result=await userInfo.save()

        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (e) {
        if (e.code===11000) {
            return res.status(400).json({
                success:false,
                messaage:"Email account already exists"
            })
        }
        return res.status(400).json({
            success:false,
            messaage:e.messaage
        })
    }
}

const signin=async (req,res,next)=>{
    const {email,password}=req.body
    try {
    
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All field are required"
            })
        }
    
        const user=await userModel.findOne({email})
                                  .select("+password")
        
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(400).json({
                success:false,
                message:"Invalid Password"
            })
        }
    
        const token= user.jwtToken()
        console.log("Token Generate",token);
        user.password=undefined
        const cookieOption={
            maxAge:24*60*60*1000,
            httpOnly:true
        }
    
        res.cookie("token",token,cookieOption)
        res.status(200).json({
            success:true,
            data:user,
            // token
        })
        
    } catch (e) {
        res.status(400).json({
            success:false,
            message:e.message
        })
    }
}

const getUser=async (req,res,next)=>{
    const userId=req.user.id
    try {
        const user=await userModel.findById(userId)
        res.status(200).json({
            success:true,
            data:user
        })
    } catch (e) {
        return res.status(200).json({
            success:false,
            message:e.messaage
        })
    }
}

const logout=(req,res,next)=>{
    try {
        
        const cookieOption={
            expries:new Date(),
            httpOnly:true
        }
        res.cookie("token",null,cookieOption)
        res.status(200).json({
            success:true,
            messaage:"Logout Successfully"
        })
    } catch (e) {
        res.status(400).json({
            success:false,
            messaage:e.messaage
        })
    }
}

module.exports={
    signup,
    signin,
    getUser,
    logout
}