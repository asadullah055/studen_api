const express = require('express')
const mongoose = require('mongoose');
const router = require('./src/router/api');
const app = express();
const dotenv = require('dotenv')


app.use(express.json());
dotenv.config()
mongoose
  .connect("mongodb://127.0.0.1:27017/School", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successfully"))
  .catch((error => console.log(error)));

// Routing Implement
app.use("/student", router)
app.use("/work", router)

const handleError =(err,req, res, next)=>{
    if(res.headersSent){
        next(err)
    } else{
        res.status(500).json({ error: err });
    }
  }

  
// Undefined Route Implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
})
app.use(handleError)

module.exports = app