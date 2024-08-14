import React, { useEffect, useState } from 'react';
import { Link , useNavigate} from 'react-router-dom'; 
import { useAuth } from '../components/Auth/AuthContext';

const Header = () => {
    const { userRole, logout } = useAuth();
    const navigate = useNavigate();
  
    const handleDashboardClick = (e) => {
      e.preventDefault();
      if (userRole === 'Admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    };
    
    const handleLogout = () => {
      logout();
      navigate('/login'); 
    };
  
    return (
      <header className="fixed top-0 left-0 right-0 z-50 py-3 pr-6 pl-6 w-screen bg-white rounded-full shadow-md">
        <nav className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-lg text-black">
            <div className="flex shrink-0 w-10 h-10 bg-black rounded-full" />
            <div className="text-lg">AutoSavy</div>
          </Link>
          <div className="flex gap-4 text-sm items-center">
            <Link to="/shop" className="text-black hover:text-gray-700">Shop</Link>
            <a href="#" onClick={handleDashboardClick} className="text-black hover:text-gray-700">Dashboard</a>
            <Link to="/servicing" className="text-black hover:text-gray-700">Servicing</Link>
            <Link to="/reviews" className="text-black hover:text-gray-700">Reviews</Link>
            <Link to="/cart" className="text-black hover:text-gray-700">Cart</Link>
            {userRole ? (
              <button 
                onClick={handleLogout} 
                className="text-black hover:text-gray-700 bg-transparent border-none cursor-pointer">
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-black hover:text-gray-700">Login</Link>
            )}
          </div>
        </nav>
      </header>
    );
  };

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const { authToken, userId } = useAuth(); // Use userId and authToken from context

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch('http://localhost:5000/cart', {
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
                
                console.log('Fetched cart items:', items); // Verify data structure
                localStorage.setItem('cartItems', JSON.stringify(items));
                setCartItems(items);
                setTotalAmount(amount); // Set total amount from backend
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        const fetchUserEmail = async () => {
            try {
                const userResponse = await fetch(`http://localhost:5000/users/${userId}`, {
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
            const response = await fetch(`http://localhost:5000/cart/${part_id}`, {
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
        console.log('Checkout data:', {
            user_id: userId, 
            cart_items: cartItems
        });
    
        try {
            // Post cart data to your order endpoint
            const orderResponse = await fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    user_id: userId, 
                    cart_items: cartItems
                })
            });
    
            if (!orderResponse.ok) {
                const errorData = await orderResponse.json();
                console.error('Error during order creation:', errorData);
                throw new Error(errorData.error || 'Unknown error');
            }
    
            const orderResult = await orderResponse.json();
            console.log('Order created successfully:', orderResult);
    
            // Now proceed with payment
            const paymentResponse = await fetch('http://localhost:5000/create-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone_number: phoneNumber, // Use phoneNumber state
                    email: userEmail, // Use userEmail state
                    amount: totalAmount // Use totalAmount from the state
                })
            });
    
            if (!paymentResponse.ok) {
                const errorData = await paymentResponse.json();
                console.error('Error during checkout creation:', errorData);
                throw new Error(errorData.error || 'Unknown error');
            }
    
            const paymentResult = await paymentResponse.json();
            console.log('Checkout created successfully:', paymentResult);
    
            // Redirect user to the payment URL
            window.location.href = paymentResult.payment_url;
    
            // Clear cart items
            localStorage.removeItem('cartItems');
            setCartItems([]);
    
        } catch (error) {
            console.error('Error during checkout:', error.message);
        }
    };
    
    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen">Error fetching cart items: {error}</div>;

    return (
        <div className="w-screen h-screen bg-zinc-300 pt-16"> 
            <Header />
            <main className="flex flex-col px-8 py-4 bg-zinc-300 h-full max-md:px-5">
                <header className="py-4 px-6 bg-slate-600 rounded-full w-full">
                    <h1 className="text-xl text-white text-center">Cart Items</h1>
                </header>
                <section className="flex flex-col gap-6 mt-8 justify-center items-center h-full">
                    {cartItems.length === 0 ? (
                        <p className="text-white">Your cart is empty.</p>
                    ) : (
                        <ul className="w-full max-w-2xl">
                            {cartItems.map(item => (
                                <li key={item.part_id} className="flex justify-between items-center p-4 mb-4 bg-white rounded-lg shadow-md">
                                    {item.image_url && (
                                        <img 
                                            src={item.image_url} 
                                            alt={item.part_name} 
                                            className="w-16 h-16 object-cover rounded-md mr-4"
                                        />
                                    )}
                                    <div className="flex-grow">
                                        <h2 className="text-lg font-semibold text-black">{item.part_name}</h2>
                                        <p className="text-sm text-gray-700">Quantity: {item.quantity}</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(item.part_id)}
                                        className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    {cartItems.length > 0 && (
                        <>
                            <input
                                type="text"
                                placeholder="Enter your phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="px-4 py-2 mt-4 w-full max-w-lg text-white rounded-lg"
                            />
                            <button
                                onClick={handleCheckout}
                                className="px-8 py-3 mt-6 text-xl text-white bg-green-600 rounded-lg"
                            >
                                Checkout
                            </button>
                        </>
                    )}
                </section>
            </main>
        </div>
    );
};

export default CartPage;
