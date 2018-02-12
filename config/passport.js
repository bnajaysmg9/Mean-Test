const jwtstrategy=require('passport-jwt').Strategy;
const extractjwt=require('passport-jwt').ExtractJwt;
const config=require('../config/database');
const user=require('../models/user');

module.exports=function(passport){
  let opts={};
    opts.jwtFromRequest=extractjwt.fromAuthHeaderAsBearerToken();
    opts.jwtFromRequest = extractjwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey= config.secret;

  passport.use(new jwtstrategy(opts,(jwt_payload,done)=>{
  user.findUserByID(jwt_payload.data._id,(err,User)=>{
  if(err)
  return done(err,null);
  if(user)
  return done(null,User);
  else {
    return done(null,false);
  }
});
}));
}
