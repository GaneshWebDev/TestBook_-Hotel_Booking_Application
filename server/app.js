const express=require('express');
const dbConfig=require('./db');
const bodyParser=require('body-parser');
const roomsRoute=require('./routes/roomsRoute');
const userRoute=require('./routes/userRoute');
const bookroomRoute=require('./routes/bookingRoute')
const app=express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(roomsRoute);
app.use(userRoute);
app.use(bookroomRoute);
app.listen(5000,()=>{
    console.log("server listening to port no 5000");
})