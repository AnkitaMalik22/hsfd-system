const mongoose = require('mongoose');

const foodSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Food Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter Food Description"]
    },
   
    ratings:{
        type:Number,
        default:0
    },
    image:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
            
        }
    ],
    category:{
    type:String,
    required:[true,"Please Enter Food Category"],
    },

   
   Quantity:{
        type:Number,
        required:[true,"please Enter Product Stock"],
        maxLength:[4,"Stock can not exceed 4 characters"],
        default:1
    },
    numOfRequests:{
        type:Number,
        required:true,
        default:0
    },
    requests:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
            },
            name:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            },
            status:{
                type:Boolean,
                required:true,
                default:false
            }
        }
    ],
    owner:{
        type:String,
        required:[true,"Please Enter Your Hotel Name"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Food",foodSchema)