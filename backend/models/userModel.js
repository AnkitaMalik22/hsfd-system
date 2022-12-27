const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema =  new mongoose.Schema({
name:{
    type:String,
    required:[true,"Please Enter Your Name"],
    maxLength:[30,"Name can not exceed 30 characters"],
    minLength:[4,"Name Should Have More Than 4 Characters"]

},
role:{
    type:String,
    required:[true,"Please Select Your Role"],
    default:"user"
},

email:{
    type:String,
    required:[true,"Please Enter Your Email"],
    unique:true,
    validate:[validator.isEmail,"Please enter a valid email"]
},


   country:{
        type:String,
        required:[true,"Please Enter Your Country"],
    },
    state:{
        type:String,
        required:[true,"Please Enter Your State"],
    },
    
    district:{
        type:String,
        required:[true,"Please Enter Your district"],
    },



password:{
    type:String,
    required:[true,"Please Enter Your Password"],
    maxLength:[8,"Password should be greater than 8 characters"],
    select:false,

},

avatar:{
      public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }     
},



resetPasswordToken:String,

resetPasswordExpire:Date,

});

userSchema.pre("save",async function(next) {
    if (!this.isModified("password")) {
   next();     
    }

    this.password =await bcrypt.hash(this.password,10)
})

//JWT TOKEN

userSchema.methods.getJWTToken=function () {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}

//compare password

userSchema.methods.comparePassword = async function (enterdPassword) {
    return await bcrypt.compare(enterdPassword,this.password)
}

//compare role

userSchema.methods.compareRole = async function (enteredRole) {
    return await enteredRole===this.role;
}
//Generating password reset token

userSchema.methods.getResetPasswordToken=function () {
    //Generating token
    const resetToken=crypto.randomBytes(20).toString("hex");

    //Hashing and adding resetpasswordToken to user schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire =Date.now() + 15*60*1000;

    return resetToken;
}

module.exports = mongoose.model("User",userSchema)