const express = require("express");
const { getAllFoods,createFood,updateFood,deleteFood,getfoodDetails,createFoodRequest, getAllfoodRequests, deleteRequest, acceptFoodRequest } = require("../controllers/foodControllers");
const { isAuthenticatedUser ,authorizeRoles} = require("../middleware/auth");
const router = express.Router();


router.route("/foods").get(getAllFoods)
router.route("/hotel/food/new").post(isAuthenticatedUser,authorizeRoles("hotel"),createFood)
router.route("/food/:id").put(isAuthenticatedUser,authorizeRoles("hotel"),updateFood).delete(isAuthenticatedUser,authorizeRoles("hotel"),deleteFood)

router.route("/food/:id").get(getfoodDetails)

router.route("/request").put(isAuthenticatedUser,authorizeRoles("volunteer"),createFoodRequest)
router.route("/requests").get(getAllfoodRequests).delete(isAuthenticatedUser,deleteRequest)
router.route("/request/accept/:id").put(isAuthenticatedUser,authorizeRoles("hotel"),acceptFoodRequest)

module.exports=router;