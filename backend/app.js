const express =require("express");
const app=express();
const cookieParser=require("cookie-parser")
const errorMiddleware = require("./middleware/error.js")
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Route imports

const user =require('./routes/userRoutes');
const food = require("./routes/foodRoutes.js");



app.use('/api/v1',food)
app.use('/api/v1',user)


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//middleware for error
app.use(errorMiddleware)

module.exports=app;