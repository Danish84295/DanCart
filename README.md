<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/3514/3514491.png" alt="DanCart Logo" width="80" />
  <h1>DanCart - Full-Stack MERN E-Commerce App</h1>
  <p>A professionally engineered, full-stack E-commerce platform built using the MERN Stack with React, Express.js, MongoDB, and Node.js.</p>
</div>

---

# 🛠 Tech Stack

- **Frontend:** React.js, Redux Toolkit, Context API, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT Authentication
- **Payments:** Razorpay Integration (Test Mode Supported)
- **Cloud Storage:** Cloudinary Image Uploads
- **Email Service:** Nodemailer
- **State Management:** Redux Toolkit

---

# ✨ Features

- User Authentication (Register & Login)
- Admin Dashboard
- Product Management (CRUD)
- Shopping Cart
- Buy Now & Checkout
- Razorpay Payment Integration
- Order Management
- Order Status Tracking
- Email Notifications after Order Placement
- User Profile
- Responsive UI
- Cloudinary Image Upload

---

# 🚀 Local Development

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Danish84295/DanCart
cd DanCart
```

---

## 2️⃣ Install Dependencies

Install dependencies for both frontend and backend:

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000
NODE_ENV=development

MONGO_URI=mongodb://127.0.0.1:27017/dancart

JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 4️⃣ Seed the Database

Populate the database with demo products.

```bash
npm run seed
```

Example Admin Account:

```
Email: admin@dancart.com
Password: admin@123
```

---

## 5️⃣ Run the Project

Start both frontend and backend together:

```bash
npm run dev
```

Backend:

```
http://localhost:5000
```

Frontend:

```
http://localhost:5173
```

---

# ☁️ Deployment

DanCart can be deployed on platforms such as:

- Render
- Railway
- Vercel (Frontend)
- MongoDB Atlas

For Render deployment:

1. Push the repository to GitHub.
2. Create a new Web Service.
3. Connect your GitHub repository.
4. Add all environment variables.
5. Build Command:

```bash
npm run render-build
```

6. Start Command:

```bash
npm start
```

---

# 📄 API Testing

The project includes a Postman collection for testing API endpoints.

Import:

```
DanCart_Postman_Collection.json
```

into Postman to test authentication, products, orders, payments, and admin routes.

---



# 👨‍💻 Author

**Danish Ahmad**

B.Tech Computer Engineering Student

Built as a portfolio-ready MERN Stack E-Commerce project showcasing full-stack development, authentication, payments, cloud storage, email services, and responsive UI.

---

## ⭐ If you found this project useful, consider giving it a Star on GitHub!