const express=require('express');
const Booking=require('../models/booking');
const roomModel=require('../models/room');
const stripe=require('stripe')('sk_test_51NjLFYSGij6lMcouBewTJH11YPR4Ac4lgfGddq7BY4WsVdey2CQoYRw5K6sLcnjkW5Yoje3dlEDVbdKTztWAlR9900MrElmiAc');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const router=express.Router();
router.post('/bookroom', async (req, res) => {
    const {room,userid,fromDate,toDate,total,days,token}=req.body;
    console.log(req.body,'hello');
    try {
        const customer=await stripe.customers.create({
            email:token.email,
            source:token.id
        })
        const payment=await stripe.paymentIntents.create({
            amount:total*100,
            customer:customer.id,
            currency:'inr',
            receipt_email:token.email
        },{
            idempotencyKey:uuidv4()
        });
        if(payment){
            try {
                const parsedFromDate = new Date(fromDate);
                const parsedToDate = new Date(toDate);
                const newBooking=new Booking({
                    room:room.name,
                    roomid:room._id,
                    userid,
                    fromDate:parsedFromDate,
                    toDate:parsedToDate,
                    total,
                    days,
                    transactionid:'1234'
                })
                await newBooking.save();
                const roomTemp = await roomModel.findById(room._id);
                if (!roomTemp) {
                  return res.status(404).json({ error: 'Room not found' });
                }else{
                    roomTemp.currentBookings.push({ 
                        bookingid:newBooking._id,
                        fromDate:moment(parsedFromDate).format('DD-MM-YYYY'), // Format date as DD-MM-YYYY
                        toDate: moment(parsedToDate).format('DD-MM-YYYY'), 
                        userid:userid,
                        status:newBooking.status
                     });
                    await roomTemp.save();
                }
                res.status(201).json({message:'booking successfull'});  
              } catch (error) {
                return res.status(500).json({ message: 'Internal server error' });
              }
        }
    } catch (error) {
        return res.status(401).json({error});
    }
});
router.get('/bookingDetails/:userId', async (req, res) => {
           userid=req.params.userId;
           console.log(userid);
    try {
      const BookingData = await Booking.find({userid});
      console.log(BookingData);
      return res.json(BookingData);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
router.get('/getAllBookingDetails', async (req, res) => {
try {
const BookingData = await Booking.find();
return res.json(BookingData);
} catch (error) {
return res.status(500).json({ message: 'Internal server error' });
}
});
router.get('/cancelBooking/:bookId', async (req, res) => {
          const bookingId = req.params.userId;
  try {
  const BookingData = await Booking.findOne({bookingId});
  const roomId=BookingData.roomid;
  console.log(roomId);
  const deletedDocument = await Booking.deleteOne({bookingId});
  if(deletedDocument){
    const roomDocument= await roomModel.updateOne( { _id: roomId },
      { $set: { currentBookings: [] } }, { setDefaultsOnInsert: true })
    console.log(roomDocument);
  }
  res.status(201).json({message:'successfully updated'});
  } catch (error) {
  return res.status(500).json({ message: 'Internal server error' });
  }
  });

module.exports=router;