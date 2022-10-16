
const Food =require("../models/foodModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary=require("cloudinary")

//Create FOOD --hotel

exports.createFood=catchAsyncErrors(async(req,res,next)=>{
    
    req.body.user=req.body.id;
    const { name, description, category,quantity,owner}=req.body;

    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "avatars",
        //will change it to foodimages later
        width: 250,
        crop: "scale",
      });
      
    const food=await Food.create({
        name, description, category,quantity,owner,
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
//    console.log(req)
    // const resultPerPage=5;
    const resultPerPage=25;
    const foodsCount=await Food.countDocuments()
   const apiFeature = new ApiFeatures(Food.find(),req.query).search().filter().pagination(resultPerPage)
    const foods= await apiFeature.query;
     res.status(200).json({success:true,foods,foodsCount});
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

    food = await Food.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false})
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
        
    const isRequested=food.requests.find(rev=> rev.user.toString() == requestId.toString())
        // console.log(rev.user.toString() +"||" + requestId.toString())
        if(isRequested){
        food.requests.forEach((rev)=>{
            if(rev.user.toString() == requestId.toString()){
                rev.status=true;
            }
                
        })
            }
            
    else{
        return next(new ErrorHandler("Request not found",404))
    }
      }

       


    
    await Food.findByIdAndUpdate(req.params.id,{new:true,runValidators:true,useFindAndModify:false})
        res.status(200).json({success:true,
            food
        })
   
});


//add food review

// exports.addfoodRating=catchAsyncErrors(async(req,res,next)=>{
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
