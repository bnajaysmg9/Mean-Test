const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const bodyParser=require("body-parser");
const path=require("path");
const passport=require("passport");
const config=require("./config/database");

mongoose.connect(config.database);

mongoose.connection.on('connected',()=>
{
  console.log("connected to MongoDB");
});
mongoose.connection.on('error',(err)=>
{
  console.log("Error to connect mongo "+err);
});
const app=express();

const port=3000;

const users=require('./routes/users');

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());

app.use('/users',users);

app.get('/',(req,res)=>{
  res.send('invalid endpoint');
});

app.listen(port,()=>{
  console.log('server connected on port '+port);
});
