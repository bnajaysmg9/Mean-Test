const mongoose=require('mongoose');
const config=require('../config/database');
const bcrypt=require('bcryptjs');

const UserSchema=mongoose.Schema({
  name:{
    type: String,
    required:true
  },
  email:{
    type: String,
    required:true
  },
  phone:{
    type: String,
    required:true
  },
  password:{
    type: String,
    required:true
  }
});

const User=module.exports=mongoose.model('User',UserSchema);

module.exports.findUserByID=function(id,callback){
User.findById(id,callback);
}

module.exports.findUserByUsername=function(email,callback){
  const query={email:email};
  User.findOne(query,callback);
}

module.exports.addUser=function(newUser,callback){
  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(newUser.password,salt,(err,hash)=>{
      if(err)
      {
        throw err;
      }
      newUser.password=hash;
      newUser.save(callback);
    });
  });
}

  module.exports.comparePass=function(Pass,hash,callback){
    bcrypt.compare(Pass,hash,(err,isMatch)=>{
      if(err)
      {
      throw err;
    }

      callback(null,isMatch);
    });
  }
