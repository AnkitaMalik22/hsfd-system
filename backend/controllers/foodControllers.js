
const Food =require("../models/foodModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary=require("cloudinary")
// import Food from '../models/foodModel.js';
// import ErrorHandler from "../utils/errorhandler";
// import catchAsyncErrors from "../middleware/catchAsyncErrors";
// import ApiFeatures from "../utils/apifeatures";
// import cloudinary from 'cloudinary';


//Create FOOD --hotel

exports.createFood=catchAsyncErrors(async(req,res,next)=>{
    
    req.body.user=req.body.owner;

    const { name, description, category,quantity,owner,country,state,district}=req.body;
    console.log(req.body.user ,req.body.id)

    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "avatars",
        //will change it to foodimages later
        width: 250,
        crop: "scale",
      });
      console.log({
        name, description, category,quantity,owner,country,state,district,
        image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    })

    const food=await Food.create({
        name, description, category,quantity,owner,country,state,district,
        image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    }
        );


    res.status(201).json({
        success:true,
       food
    }) ;
}) ;

//GET ALL FOODS

exports.getAllFoods=catchAsyncErrors(async(req,res)=>{
    
    const {country,state,district}=req.body;
    // const resultPerPage=5;
    const resultPerPage=25;
  
    // console.log(req.body)
    // const foodsCount=await Food.countDocuments()
//    const apiFeature = new ApiFeatures(Food.find(),req.query).search().filter().pagination(resultPerPage)
  
//    ----------------------------------------- 
//Foods.status != true && food .picked !=true 


   const totalFoods= await Food.find();
   //  total Donations By This Hotel
   const foods = totalFoods.filter((food)=> food.accepted == false && food.country === country  && food.district === district && food.state === state)
// const foods = totalFoods.filter((food)=> console.log( food.country , country ,"||",food.district, district ,"||",food.state ,state))

  
//    -----------------------------------------
//    const foods= await apiFeature.query;
    //  res.status(200).json({success:true,foods,foodsCount});
         res.status(200).json({success:true,foods});

 }) ;


//GET food DETAILS

exports.getfoodDetails=catchAsyncErrors(async(req,res,next)=>{

    let food =await Food.findById(req.params.id);

    if(!food){
    return next(new ErrorHandler("food Not Found",404))
    }
 

    res.status(200).json({
        success:true,
        food
    })
 });

 
//UPDATE food-ONLY HOTEL

exports.updateFood=catchAsyncErrors(async(req,res,next)=>{
    
    let food = Food.findById(req.params.id);

    if(!food){
        return next(new ErrorHandler("food Not Found",404))
    }

    food = await Food.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:true})
    res.status(200).json({
        success:true,
        food
    })
});


//DELETE food-ONLY HOTEL

exports.deleteFood=catchAsyncErrors(async(req,res,next)=>{
    const food= await Food.findById(req.params.id)
    
    if(!food){
        return res.status(500).json({
              success:false,
              message:"food not found"
          })
      }
      await food.remove();

      res.status(200).json({
        success:true,
        message:"food deleted successfully"
    })
});

//CREATE NEW REQUEST OR UPDATE THE REQUEST--not for hotel

exports.createFoodRequest=catchAsyncErrors(async(req,res,next)=>{
    const {comment,foodId }=req.body;
    const request = {
        user:req.user._id,
        name:req.user.name,
        comment,
    }
    const food= await Food.findById(foodId)

    const isRequested=food.requests.find(rev=>rev.user.toString() == req.user._id.toString())

    if(isRequested){
        // food.requests.forEach((rev)=>{
        //     if(rev.user.toString() == req.user._id.toString())(rev.rating=rating),(rev.comment=comment)
        // })
        return next(new ErrorHandler("Already requested",401))
    }
    else{
        food.requests.push(request)
        food.numOfRequests =food.requests.length
       
    }

    await food.save({validateBeforeSave:false});
    res.status(200).json({success:true})
})

//ACCEPT food REQUEST -ONLY HOTEL
exports.acceptFoodRequest=catchAsyncErrors(async(req,res,next)=>{

    const food= await Food.findById(req.params.id)

    const {requestId }=req.body;

 if(!food){
        return res.status(500).json({
              success:false,
              message:"food not found"
          })
      }else{
      
        const isAccepted=food.accepted == true ? true : false ;
    const isRequested=food.requests.find(rev=> rev.user.toString() == requestId.toString())
        // console.log(rev.user.toString() +"||" + requestId.toString())
        if(!isAccepted && isRequested){
        food.requests.forEach((rev)=>{
            if(rev.user.toString() == requestId.toString()){
                rev.status=true;
            }
            
            food.accepted=true; 
            food.pickedBy=rev.user.toString(); 
            food.acceptedDate=Date.now();
         
        })
            }
            
    else{
        return next(new ErrorHandler("Request not found OR Already Accepted ",404))
    }
      }
// BUG : hotels able to accept multiple request   --solved

//---------------------------------------

    // await Food.findByIdAndUpdate(req.params.id,{new:true,runValidators:true,useFindAndModify:false})
    await Food.findByIdAndUpdate(req.params.id,{accepted :food.accepted,acceptedDate:food.acceptedDate,pickedBy:food.pickedBy,requests: food.requests}, {new:true, runValidators:true})

        res.status(200).json({success:true,
            food
        })
   
});


//Mark as Picked food  -ONLY HOTEL

exports.markPickedFood=catchAsyncErrors(async(req,res,next)=>{

    const food = await Food.findById(req.params.id)

 if(!food){
        return res.status(500).json({
              success:false,
              message:"food not found"
          })
      }else{
           
    const isPicked=(food.picked === true ? true : false) ;
        if(!isPicked){
     food.picked=true;
        }
            
    else{
        return next(new ErrorHandler("Already Picked",404))
    }
      }
      
    await Food.findByIdAndUpdate(req.params.id,{picked :food.picked}, {new:true, runValidators:true})

        res.status(200).json({success:true,
            food
        })
   
});


//add food review

// export constaddfoodRating=catchAsyncErrors(async(req,res,next)=>{
//     const { rating,foodtId }=req.body;
//     const food= await FoodfindById(foodId)
   
//     product.ratings=avg/product.reviews.length ;

//     await Foodsave({validateBeforeSave:false});
//     res.status(200).json({success:true})
// })

//GET ALL REQUESTS

exports.getAllfoodRequests = catchAsyncErrors(async(req,res,next)=>{
    const food= await Food.findById(req.query.id)

    if(!food){
        return next(new ErrorHandler("food Not Found",404))
    }

    res.status(200).json({
        success:true,
        requests:food.requests,
    })

})




//GET ALL REQUESTS OF A PARTICULAR HOTEL /HOTEL INCOMMING REQS

// export constgetfoodRequests = catchAsyncErrors(async(req,res,next)=>{
//     const {userId}=req.body;
//     const foods= await Food.find();
// //  total Donations By This Hotel
// const userFoods = foods.filter((food)=>food.owner == userId)
//     const food= await Food.findById(req.query.id)

//     if(!food){
//         return next(new ErrorHandler("food Not Found",404))
//     }

//     res.status(200).json({
//         success:true,
//         requests:food.requests,
//     })

// })




//DELETE REQUEST

exports.deleteRequest = catchAsyncErrors(async(req,res,next)=>{
    const food= await Food.findById(req.query.foodId)

    if(!food){
        return next(new ErrorHandler("food Not Found",404))
    }

    const requests =food.requests.filter((rev)=>rev._id.toString() != req.query.id.toString())

    // let avg=0;
    //  reviews.forEach(rev=>{
    //       avg += rev.rating ;
    //   })

//   const  ratings=avg/reviews.length ;
 const numOfRequests = requests.length;
 
await Food.findByIdAndUpdate(req.query.foodId,{
   requests,
   numOfRequests,

 },
 {new:true,runValidators:true,useFindAndModify:false})


 res.status(200).json({
    success:true,
})

})


// ________________________________________ Hotel Dashboard //19-12-2022 _________________________________

exports.getFoodsOfThisMonth=catchAsyncErrors(async(req,res,next)=>{
    //  the food.owner=userId
    const {userId}=req.body;
    const foods= await Food.find();
//  total Donations By This Hotel
const totalDonations = foods.filter((food)=>food.owner == userId)

    const today =new Date();
  
    let foodDetails=[]
    
  totalDonations.forEach((food) => 
  {
    
   let year = food.createdAt.toString().substring(11, 15);
   let day= food.createdAt.toString().substring(8, 10);
   let month= food.createdAt.toString().substring(4, 7);
//    console.log(food.createdAt.toString(),"-------" ,today)


//    `${day}/${month}/${year}`
// console.log(year , today.getFullYear())
   
if( today.getFullYear() == year)
  {
    foodDetails.push({foodCreatedDate : `${day}/${month}/${year}` ,foodName : food.name, day: day ,month :month,year:year})
  }

  })
//   console.log(foodDetails ,today)
    res.status(200).json({
        success:true,
       foodDetails,
  
    })
 });
 
 //---------------------------------------------------------------------------------------------------------------------------------


// ________________________________________ Hotel Dashboard //19-12-2022 _________________________________

exports.getdaysOfAcceptance=catchAsyncErrors(async(req,res,next)=>{
    //  the food.owner=userId
    const {userId}=req.body;
    const totalPickedFoods= await Food.find({picked : true,pickedBy:userId.toString()});
    const totalAcceptedFoods= await Food.find({accepted : true,pickedBy:userId.toString()});
//Find the request dates accepted by hotel

//=> Food Actions & controller => update accpted date and accepted
//=> send from frontend the date using date.now()




//  total Donations By This Hotel
// const totalAcceptedFoods = foods.filter((food)=> food.pickedBy == userId.toString())

    const today =new Date();
  
    let acceptedFoodDetails=[]
    
    totalAcceptedFoods.forEach((food) => 
  {
    
   let year = food.acceptedDate.toString().substring(11, 15);
   let day= food.acceptedDate.toString().substring(8, 10);
   let month= food.acceptedDate.toString().substring(4, 7);
//    console.log(food.createdAt.toString(),"-------" ,today)


//    `${day}/${month}/${year}`

if( today.getFullYear() == year)
  {
    acceptedFoodDetails.push({foodAcceptedDate : `${day}/${month}/${year}` ,foodName : food.name, day: day ,month :month,year:year})
  }

  })
const foodDetails ={ acceptedFoodDetails,
    totalAcceptedFoods,
    totalPickedFoods,
}

//   console.log(foodDetails ,today)
    res.status(200).json({
        success:true,
      foodDetails
  
    })
 });
 
 //---------------------------------------------------------------------------------------------------------------------------------

//Total Foods that a Volunteer requested -- accept => false  | accept => true 

exports.totalFoodVolRequested=catchAsyncErrors(async(req,res,next)=>{
    const  { userId} =req.body;
    const foods=await Food.find({accepted:false});

  let totalFoods=[]
  
   foods.forEach(food => {
    food.requests.forEach((rev)=>{
        if(rev.user.toString() == userId.toString()){
            totalFoods.push({foodId:food._id,comment:rev.comment})
        }
   });
})

   res.status(200).json({
    success:true,
totalFoods
})


})



 //---------------------------------------------------------------------------------------------------------------------------------

 exports.gettotalFoodsOfHotel=catchAsyncErrors(async(req,res,next)=>{
    //  the food.owner=userId
    const {userId}=req.body;
    const foods= await Food.find();
//  total Donations By This Hotel
const totalFoods = foods.filter((food)=>food.owner == userId)

   

    res.status(200).json({
        success:true,
       totalFoods,
  
    })
 });