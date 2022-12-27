const mongoose = require('mongoose');

connectDatabase=()=>{
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((data)=>{console.log(`Mongodb Connected with the server : ${data.connection.host}`);})

}
// DB_URI='mongodb://127.0.0.1:27017/HotelSurplus'

module.exports = connectDatabase