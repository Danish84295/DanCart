const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");


const connectDB = require("./config/db");
const User = require("./model/User");
const Product = require("./model/Product");
const Order = require("./model/Order");

dotenv.config();

const importData = async () => {
    try {
        // Connect Database
        await connectDB();

        // Clear Existing Data
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        // Hash Passwords
        const adminPassword = await bcrypt.hash("admin@123", 10);
        const userPassword = await bcrypt.hash("user@123", 10);

        // Create Users
        const users = await User.insertMany([
            {
                name: "Danish Ahmad",
                email: "admin@dancart.com",
                password: adminPassword,
                role: "admin",
                verified: true,
            },
            {
                name: "Rahul Sharma",
                email: "rahul@gmail.com",
                password: userPassword,
                role: "user",
                verified: true,
            },
        ]);

        // Create Products
        const products = await Product.insertMany([
            {
                name: "Apple iPhone 16 Pro",
                description: "Latest Apple flagship smartphone with A18 Pro chip.",
                price: 129999,
                category: "Mobiles",
                stock: 20,
                imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                rating: 4.9,
                numReviews: 215,
            },
            {
                name: "Samsung Galaxy S25 Ultra",
                description: "Premium Android smartphone with 200MP camera.",
                price: 119999,
                category: "Mobiles",
                stock: 15,
                imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',                rating: 4.8,
                numReviews: 185,
            },
            {
                name: "MacBook Air M4",
                description: "Apple MacBook Air powered by M4 chip.",
                price: 149999,
                category: "Laptops",
                stock: 10,
                imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                rating: 4.9,
                numReviews: 130,
            },
            {
                name: "Dell XPS 15",
                description: "Powerful Windows laptop for professionals.",
                price: 134999,
                category: "Laptops",
                stock: 8,
                imageUrl: "https://via.placeholder.com/300",
                rating: 4.7,
                numReviews: 98,
            },
            {
                name: "Sony WH-1000XM6",
                description: "Industry-leading noise cancelling headphones.",
                price: 29999,
                category: "Accessories",
                stock: 30,
                imageUrl: "https://via.placeholder.com/300",
                rating: 4.8,
                numReviews: 276,
            },
            {
                name: "Apple Watch Series 10",
                description: "Advanced health and fitness smartwatch.",
                price: 45999,
                category: "Wearables",
                stock: 18,
                imageUrl: "https://via.placeholder.com/300",
                rating: 4.7,
                numReviews: 143,
            },
            {
                name: "Samsung 27-inch 4K Monitor",
                description: "Ultra HD IPS Monitor with HDR support.",
                price: 27999,
                category: "Monitors",
                stock: 12,
                imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                rating: 4.6,
                numReviews: 81,
            },
            {
                name: "Logitech MX Master 3S",
                description: "Wireless productivity mouse with ergonomic design.",
                price: 8999,
                category: "Accessories",
                stock: 40,
                imageUrl: "https://via.placeholder.com/300",
                rating: 4.9,
                numReviews: 342,
            }
            
        ]);
        await Order.insertMany([
  {
    user: users[1]._id,
    items: [
      {
        productId: products[0]._id,
        qty: 1,
        price: products[0].price,
      },
      {
        productId: products[1]._id,
        qty: 2,
        price: products[1].price,
      },
    ],
    totalAmount: products[0].price + products[1].price * 2,
    address: {
      fullName: "Rahul Sharma",
      street: "Sector 62",
      city: "Noida",
      postalCode: "201301",
      country: "India",
    },
    paymentId: "pay_demo_001",
    status: "Pending",
  },
  {
    user: users[0]._id,
    items: [
      {
        productId: products[2]._id,
        qty: 1,
        price: products[2].price,
      },
    ],
    totalAmount: products[2].price,
    address: {
      fullName: "Danish Ahmad",
      street: "Civil Lines",
      city: "Aligarh",
      postalCode: "202001",
      country: "India",
    },
    paymentId: "pay_demo_002",
    status: "Shipped",
  },
  {
    user: users[1]._id,
    items: [
      {
        productId: products[3]._id,
        qty: 1,
        price: products[3].price,
      },
      {
        productId: products[5]._id,
        qty: 1,
        price: products[5].price,
      },
    ],
    totalAmount: products[3].price + products[5].price,
    address: {
      fullName: "Rahul Sharma",
      street: "Laxmi Nagar",
      city: "Delhi",
      postalCode: "110092",
      country: "India",
    },
    paymentId: "pay_demo_003",
    status: "Delivered",
  },
]);

        console.log("✅ Seed Data Imported Successfully");
        process.exit();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();

        await Order.deleteMany();
await User.deleteMany();
await Product.deleteMany();

        console.log("🗑️ Data Destroyed Successfully");
        process.exit();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}