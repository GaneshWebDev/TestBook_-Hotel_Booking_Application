const mongoose = require('mongoose');

// Create a Booking schema
const bookingSchema = new mongoose.Schema({
  room:{
    type:String,
    required:true
  },
  roomid:{
    type:String,
    required:true
  },
  userid: {
    type:String,
    required:true
  },
  fromDate: {
    type:Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  },
  total:{
    type:Number,
    required:true
  },
  days:{
    type:Number,
    required:true
  },
  transactionid:{
    type:String,
    required:true
  },
  status:{
    type:String,
    required:true,
    default:'booked'
  }}, {
    timestamps:true
  }
);

// Create the Booking model using the schema
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
