import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/Auth/AuthContext';
import Header from '../components/Header';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const { authToken, userId } = useAuth();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('https://auto-spare.onrender.com/cart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const items = data.items || [];
        const amount = data.total_amount || 0;

        console.log('Fetched cart items:', items);
        localStorage.setItem('cartItems', JSON.stringify(items));
        setCartItems(items);
        setTotalAmount(amount);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserEmail = async () => {
      try {
        const userResponse = await fetch(`https://auto-spare.onrender.com/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user details');
        }

        const userData = await userResponse.json();
        setUserEmail(userData.email);
      } catch (error) {
        console.error('Error fetching user email:', error.message);
      }
    };

    fetchCartItems();
    fetchUserEmail();
  }, [authToken, userId]);

  const handleRemoveItem = async (part_id) => {
    try {
      const response = await fetch(`https://auto-spare.onrender.com/cart/${part_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete item. Status: ${response.status}`);
      }

      const updatedItems = cartItems.filter(item => item.part_id !== part_id);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      setCartItems(updatedItems);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('authToken');
    console.log('Checkout data:', {
      user_id: userId,
      cart_items: cartItems
    });

    try {
      // Create order
      const orderResponse = await fetch('https://auto-spare.onrender.com/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: userId,
          cart_items: cartItems
        })
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(`Order creation failed: ${errorData.error || 'Unknown error'}`);
      }

      const orderResult = await orderResponse.json();
      console.log('Order created successfully:', orderResult);

      // Send email
      const emailResponse = await fetch('https://auto-spare.onrender.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: userEmail,
          cartItems,
          totalAmount,
          mpesaNumber: '123456'
        })
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        throw new Error(`Email sending failed: ${errorData.error || 'Unknown error'}`);
      }

      console.log('Email sent successfully');

      localStorage.removeItem('cartItems');
      setCartItems([]);

    } catch (error) {
      console.error('Error during checkout:', error.message);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error fetching cart items: {error}</div>;

  return (
    <div className="w-screen h-screen bg-white pt-16">
      <Header />
      <main className="flex flex-col px-8 py-4 bg-white h-full max-md:px-5">
        <header className="py-4 px-6 rounded-full w-full bg-black">
          <h1 className="text-xl text-white text-center bg-black">Cart Items</h1>
        </header>
        <section className="flex flex-col gap-6 mt-8 justify-center items-center h-full">
          {cartItems.length === 0 ? (
            <p className="text-black">Your cart is empty.</p>
          ) : (
            <div className="flex-col gap-6 mt-8 justify-center items-center h-full">
              {cartItems.map(item => (
                <div key={item.part_id} className="flex items-center justify-between p-4 gap-10 mt-10 bg-white shadow-md rounded-lg">
                  <div className="flex items-center">
                    <img src={item.image_url} alt={item.part_name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="ml-4 text-black">
                      <h2 className="text-lg font-semibold">{item.part_name}</h2>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.part_id)}
                    className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-500">
                    Remove
                  </button>
                </div>
              ))}
              <div className="mt-6 text-black">
                <h2 className="text-xl font-bold">Total Amount: ${totalAmount.toFixed(2)}</h2>
                <button
                  onClick={handleCheckout}
                  className="bg-orange-600 text-white py-2 px-6 rounded hover:bg-orange-500 mt-4">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CartPage;
