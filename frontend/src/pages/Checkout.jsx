import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate,useLocation  } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const reduxCartItems =useSelector((state)=> state.cart.cartItems);
  const cartItems = 
    location.state?.items?.length>0 ? location.state.items: reduxCartItems;
  

  const [address, setAddress] = useState({
    fullName: '', street: '', city: '', postalCode: '', country: ''
  });

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const orderRes = await fetch('/api/payment/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice })
      });
      const orderData = await orderRes.json();
      // console.log(orderData);
      // console.log(orderRes.status);
      if (!orderRes.ok) {
        // Razorpay unconfigured exception handler
        const fallback = window.confirm("Razorpay keys unconfigured on backend. Use Student Bypass Mode to place test order?");
        if (fallback) {
          return bypassPayment();
        } else {
          return alert("Payment failed to initialize");
        }
      }

      const options = {
        key: 'rzp_test_dummykey123', // Student dummy fallback
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ShopNest',
        description: 'Test Transaction',
        order_id: orderData.id,
        handler: async function (response) {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          });
          if (verifyRes.ok) {
            const saveOrderRes = await fetch('/api/orders', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
              body: JSON.stringify({
                items: cartItems  ,
                totalAmount: totalPrice,
                address,
                paymentId: response.razorpay_payment_id
              })
            });

            if (saveOrderRes.ok) {
              if(!location.state?.items){
                dispatch(clearCart());
              }
              navigate('/ordersuccess');
            } else {
              alert('Order saving failed');
            }
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: '9999999999'
        },
        theme: {
          color: '#f97316'
        }
      };
      
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const bypassPayment = async () => {
    setLoading(true);
  try {
//     console.log("Inside bypassPayment");
//     console.log("token",user.token);
//     console.log(
//   JSON.stringify(
//     {
//       items: cartItems,
//       totalAmount: totalPrice,
//       address,
//       paymentId: "bypass_txn_" + Date.now(),
//     },
//     null,
//     2
//   )
// );
    const saveOrderRes = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount: totalPrice,
        address,
        paymentId: 'bypass_txn_' + Date.now()
      })
    });

    // console.log("Status:", saveOrderRes.status);

    const data = await saveOrderRes.json();
    // console.log("Response:", data);

    if (saveOrderRes.ok) {
      if(!location.state?.items){
        dispatch(clearCart());
      }
      navigate('/ordersuccess');
    } else {
      console.log("errored",data.error);
      alert(data.message || "Order saving failed");
    }
  } catch (err) {
    setLoading(false);
    console.error(err);
    alert("Something went wrong");
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first");
      navigate('/login');
      return;
    }
    handlePayment();
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="shipping-form">
          <h3>Shipping Address</h3>
          <input type="text" placeholder="Full Name" required value={address.fullName} onChange={(e) => setAddress({...address, fullName: e.target.value})} />
          <input type="text" placeholder="Street" required value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} />
          <input type="text" placeholder="City" required value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} />
          <input type="text" placeholder="Postal Code" required value={address.postalCode} onChange={(e) => setAddress({...address, postalCode: e.target.value})} />
          <input type="text" placeholder="Country" required value={address.country} onChange={(e) => setAddress({...address, country: e.target.value})} />
          <div className="checkout-summary">
            <h4>Total to Pay: ₹{totalPrice.toFixed(2)}</h4>
            <button 
                type="submit" 
                className="btn" 
                disabled={loading} 
                style={{
                  opacity:loading?0.7:1,
                  cursor: loading? "not-allowed" : "pointer",
                }}
            > 
              {loading ? "Placing Order..." : "Pay Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;