const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true,
})
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    const saltRounds = 10;
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      next();
    } catch (error) {
      return next(error);
    }
  });
const userModel=mongoose.model('user',userSchema);
module.exports=userModel;