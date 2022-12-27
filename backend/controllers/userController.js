const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail=require("../utils/sendEmail");
const cloudinary=require("cloudinary")
const crypto=require("crypto");
const { send } = require("process");

// import ErrorHandler from "../utils/errorhandler";
// import catchAsyncErrors from "../middleware/catchAsyncErrors";
// import User from "../models/userModel";
// import sendToken from "../utils/jwtToken";
// import sendEmail from"../utils/sendEmail";
// import cloudinary from "cloudinary"
// import crypto from"crypto";
// import { send } from "process";

//Register User
exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
  
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
    
    const {role,name,email,password,country,state,district}=req.body;
    console.log({
        role,
        name,
        email,
        password,
  country,state,district,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        })
    const user= await User.create({
        role,
        name,
        email,
        password,
  country,state,district,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        });
    
    sendToken(user,201,res)
})


//LOGIN USER

exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    // const {role,email,password}=req.body;
    const {email,password}=req.body;

    //checking if user has given password and email both

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400))
    }

    const user = await User.findOne({email}).select("+password");
    
    if(!user){
        return next(new ErrorHandler("Invalid Email Or Password",401))
    }
    // const isRoleMatched= await user.compareRole(role);
    const isPasswordMatched= await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email Or Password",401))
    }
    // if(!isRoleMatched){
    //     return next(new ErrorHandler("Invalid Role",401))
    // }

//  const token =  user.getJWTToken();

   sendToken(user,200,res)

})

//LOG OUT USER
 exports.logoutUser=catchAsyncErrors(async(req,res,next)=>{

res.cookie("token",null,{
    expires: new Date(Date.now()),
httpOnly:true
})
    res.status(200).json({
        success:true,
        message:"Logged out",
    })
 })

 // Forgot Password

 exports.forgotPassword=catchAsyncErrors(async(req,res,next)=>{
const user= await User.findOne({email : req.body.email})

if(!user){
    return next(new ErrorHandler("user not found",404))
}

//get password token

const resetToken =user.getResetPasswordToken();
await user.save({validateBeforeSave:false})

const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
const message = `Your password reset token is :-\n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it.`
try {
    await sendEmail({
      email: user.email,
      subject:"Ecommerce Password Recovery",
      message,
    })
    res.status(200).json({success:true,message:`Email sent to ${user.email} successfully!`})
    
} catch (error) {
    user.resetPasswordToken=undefined
    user.resetPasswordExpire=undefined
    await user.save({validateBeforeSave:false})
    return next(new ErrorHandler(error.message,500))
}
 })


//Reset Password

exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{
    //creating token hash
const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

const user= await User.findOne({
    resetPasswordToken,
    resetPasswordExpire :{$gt : Date.now() },
})
if(!user){
    return next(new ErrorHandler("Reset password is invalid or has been expired",400))
}
if(req.body.password != req.body.confirmPassword){
    return next(new ErrorHandler("Password does not match",400))
}

user.password = req.body.password;
user.resetPasswordToken=undefined;
user.resetPasswordExpire=undefined;

await user.save();

sendToken(user,200,res)

})


//Get User Details

exports.getUserDetails =catchAsyncErrors(async(req,res,next)=>{
    
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })

})

// update user password

exports.updatePassword =catchAsyncErrors(async(req,res,next)=>{
    
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is Incorrect",400))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400))
    }

    user.password=req.body.newPassword;
    // console.log(req.body.newPassword,req.body.oldPassword,req.body.confirmPassword);

    await user.save()

    sendToken(user,200,res)

})

// ___________________________________ Update User Profile _________________________________


exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{

    const newUserData={
        name: req.body.name,
        email: req.body.email,
    }

   
    //we will add cloudinary later

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({success:true})

})


// ________________________________________ All Volunteer _____________________________________


exports.getAllVolunteers = catchAsyncErrors(async(req,res,next)=>{

    const volunteers = await User.find({role : "volunteer"});
    console.log(volunteers)

    res.status(200).json({
        success:true,
        volunteers
    })


})



// ________________________________________ All Hotel//11-12-2022 _________________________________

exports.getAllHotels = catchAsyncErrors(async(req,res,next)=>{

const hotels = await User.find({role : "hotel"});

    res.status(200).json({
        success:true,
      hotels
    })


})