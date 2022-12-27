const express =require("express");
const app=express();
const cookieParser=require("cookie-parser")
const errorMiddleware = require("./middleware/error.js")
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
// const path = require("path");

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Route imports
// const product =require('./routes/productRoute')
const user =require('./routes/userRoutes');
const food = require("./routes/foodRoutes.js");
// const order =require('./routes/orderRoute')


app.use('/api/v1',food)
app.use('/api/v1',user)
// app.use('/api/v1',order)

//middleware for error
app.use(errorMiddleware)

module.exports=app;