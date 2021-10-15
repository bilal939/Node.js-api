const express = require("express");
const connectDB = require("./database/connect");
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const UserData= require("./routes/user")
const port = process.env.PORT || 2000;
app.use(express.json());
const productroutes=require("./routes/product")

connectDB();


app.use("/api/user" ,UserData);
app.use("/api/product",productroutes)
app.listen(port , () => {
    console.log(port)
})



