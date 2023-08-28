const express=require('express');
const room=require('../models/room');
const { ObjectId } = require('mongodb');
const router=express.Router();
router.get('/api/roomsGetRoomById/:roomId', async (req, res) => {
  const objectId = new ObjectId(req.params.roomId);
  try {
    const roomData = await room.findById(objectId);
    if (!roomData) {
      return res.status(404).json({ message: 'Room not found' });
    }
    return res.json(roomData);
  } catch (error) {
    console.error('Error fetching room data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/api/rooms',async (req,res)=>{
    try {
        const rooms=await room.find({});
        return res.json({rooms});
    } catch (error) {
        return res.status(400).json({message:error});
    }
});
router.get('/admin/rooms',async (req,res)=>{
  try {
      const rooms=await room.find({});
      return res.json(rooms);
  } catch (error) {
      return res.status(400).json({message:error});
  }
});
router.post('/roomData',async(req,res)=>{
  try {
      const newRoom=new room({
        name: req.body.name,
      maxCount: req.body.maxCount,
      facilities: ['Parking','Reception','Free Wifi'],
      phoneNumber: req.body.phoneNumber,
      rentPerDay: req.body.rentPerDay,
      imageUrls: [req.body.img1,req.body.img2,req.body.img3],
      currentBookings: [],
      type: req.body.type,
      description: req.body.description
      });
      const savedRoom = await newRoom.save();
    res.status(201).json({ message: 'Room added successfully', room: savedRoom });
  } catch (error) {
     res.status(500).json({message:'failed'})
  }
})

module.exports=router;