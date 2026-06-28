const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express =require('express');
const cors =require("cors");
const dotenv=require("dotenv");
const connectDB =require('./config/db');
dotenv.config();
connectDB();
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("DanCart backend is working");
});

app.use('/api/auth',require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders',require('./routes/orderRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/analytics',require('./routes/analyticsRoutes'));


const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});