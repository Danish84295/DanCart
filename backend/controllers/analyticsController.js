

const orderModel = require('../model/Order');
const userModel =require('../model/User');
const productModel =require('../model/Product');

const getAdminStats =async (req,res)=>{
    try{
        const totalUsers =await userModel.countDocuments({role: 'user'});
        const totalOrders = await orderModel.countDocuments({});
        const totalProducts =await productModel.countDocuments({});

        const orders =await orderModel.find({});

        const totalRevenueData =orders.reduce((acc,order)=> acc+order.totalAmount,0);

        res.json({
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue: totalRevenueData
        });
    }
    catch(error){
        res.status(500).json({message:'Error fetching stats', error});
    }
}

module.exports= {getAdminStats};