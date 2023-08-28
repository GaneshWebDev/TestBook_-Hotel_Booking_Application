const mongoose=require('mongoose');
const url='mongodb+srv://ganesh:node123@cluster0.pscivit.mongodb.net/hotel_room';
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});
var connection=mongoose.connection;
connection.on('error',()=>{
    console.log("database not connected");
});
connection.on('connected',()=>{
    console.log('database connected');
});