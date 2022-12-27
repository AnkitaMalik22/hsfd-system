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

   
   quantity:{
        // type:Number,
        type:String,
        required:[true,"please Enter Food Quantity"],
        // maxLength:[4,"Stock can not exceed 4 characters"],
        // default:1
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
    
   
    accepted:{
        type:Boolean,
        required:true,
        default:false
    },
    picked:{
        type:Boolean,
        required:true,
        default:false
    },
    pickedBy:{
        type:String,
       
    }, 
    acceptedDate:{
        type:Date,
        default:Date.now
    }, 
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Food",foodSchema)