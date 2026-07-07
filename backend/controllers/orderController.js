const orderModel = require('../model/Order');
const productModel = require('../model/Product');
const sendEmail =require('../utils/sendEmail');

//create order
const createOrder = async (req,res)=>{
    try{
        const {items,totalAmount,address,paymentId}=req.body;
        if(!items || items.length===0 || !totalAmount || !address){
            return res.status(400).json({message:'Invalid order data'});
        }
        
        else{
            const order =new  orderModel({
                user:req.user._id,
                items,
                totalAmount,
                address,
                paymentId
            });
            await order.save();

            for(const item of items){
                const product =await productModel.findById(item.productId);

                if(!product){
                    return res.status(404).json({
                        message:"Product not found"
                    });
                }

                if(product.stock<item.qty){
                    return res.status(400).json({
                        message: `${product.name} is out of stock`
                    });
                }
                product.stock-=item.qty;
                await product.save();
            }

            const message = `Dear ${req.user.name},
            Thank you for shopping with DanCart!
            We are pleased to inform you that your order has been successfully placed and is now being processed.
            📦 Order Details
            --------------------------------
            Order ID: ${order._id}
            Total Amount: ₹${order.totalAmount}
            Payment Method: ${order.paymentId}
            Order Status: ${order.status}
            --------------------------------

            Our team will begin preparing your order shortly. You will receive another email once your order has been shipped, along with the tracking details.
            If you have any questions or need assistance, feel free to contact our support team.
            Thank you for choosing DanCart. We appreciate your trust and look forward to serving you again!

            Best Regards,
            Team DanCart
            🌐 Happy Shopping!
            `;

            await sendEmail(req.user.email, 'Order Created', message);
            res.status(201).json({message:'Order created successfully',order});
        }
    }
    catch(error){
        console.error("created order error: ", error);
        res.status(500).json({message:'Error creating order',error});
    }
};

const myOrders = async (req,res) => {
    try{
        const orders = await orderModel.find({user:req.user._id}).populate('items.productId','name price');
        res.json(orders);
    }catch(error){
        res.status(500).json({message: 'Error fetching orders',error});
    }
};

const getOrders =async (req,res)=>{
    try{
        const orders = await orderModel.find({}).populate('user', 'name email');
        res.json(orders);
    }catch(error){
        res.status(500).json({message : 'Error fetching orders', error});
    }
};

const updateOrderStatus =async(req,res)=>{
    try{
        const {status} =req.body;
        const order = await orderModel.findById(req.params.id);
        if(order){
            order.status=status;
            await order.save();
            res.json({message: 'Order status updated', order});
        }
        else{
            res.status(404).json({message: 'Order not found'});
        }
    }catch(error){
        res.status(500).json({message: 'Error updating order status',error});
    }
};


module.exports = {
    createOrder,
    myOrders,
    getOrders,
    updateOrderStatus
};