const express = require("express");
const { getAllFoods,createFood,updateFood,deleteFood,getfoodDetails,createFoodRequest, getAllfoodRequests, deleteRequest, acceptFoodRequest, markPickedFood, getFoodsOfThisMonth, gettotalFoodsOfHotel, getdaysOfAcceptance, totalFoodVolRequested } = require("../controllers/foodControllers");
const { isAuthenticatedUser ,authorizeRoles} = require("../middleware/auth");
const router = express.Router();


router.route("/foods").post(isAuthenticatedUser,authorizeRoles("volunteer"),getAllFoods)
router.route("/hotel/food/new").post(isAuthenticatedUser,authorizeRoles("hotel"),createFood)
router.route("/food/:id").put(isAuthenticatedUser,authorizeRoles("hotel"),updateFood).delete(isAuthenticatedUser,authorizeRoles("hotel"),deleteFood)

router.route("/food/:id").get(getfoodDetails)
router.route("/foods/month").post(isAuthenticatedUser,authorizeRoles("hotel"),getFoodsOfThisMonth)
router.route("/foods/total").post(isAuthenticatedUser,authorizeRoles("hotel"),gettotalFoodsOfHotel)
router.route("/foods/accepted").post(isAuthenticatedUser,authorizeRoles("volunteer"),getdaysOfAcceptance)
router.route("/food/requests/vol").post(isAuthenticatedUser,authorizeRoles("volunteer"),totalFoodVolRequested)

router.route("/request").put(isAuthenticatedUser,authorizeRoles("volunteer"),createFoodRequest)
router.route("/requests").get(getAllfoodRequests).delete(isAuthenticatedUser,deleteRequest)
router.route("/request/accept/:id").put(isAuthenticatedUser,authorizeRoles("hotel"),acceptFoodRequest)
router.route("/food/picked/:id").put(isAuthenticatedUser,authorizeRoles("hotel"),markPickedFood)



module.exports=router;