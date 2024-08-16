import React, { useEffect, useState } from 'react';
import { Link , useNavigate} from 'react-router-dom'; 
import { useAuth } from '../components/Auth/AuthContext';

const Header = () => {
    const { userRole, logout } = useAuth();
    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
  
    const handleDashboardClick = (e) => {
      e.preventDefault();
      if (userRole === 'Admin') {
        navigate('/admin-dashboard');
      }
    };
  
    const handleLogout = () => {
      logout();
      navigate('/login');
    };
  
    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };
  
    return (
      <header className="fixed top-4 left-0 right-0 z-50 py-2 px-4 w-[90%] mx-auto bg-white rounded-lg shadow-md"> 
        <nav className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-lg text-black">
            <div className="flex shrink-0 w-10 h-10 bg-black rounded-full" />
            <div className="text-lg">AutoSavy</div>
          </Link>
          <div className="flex items-center">
            <div className="px-4">
              <Link to="/shop" className="text-black hover:text-gray-700">Shop</Link>
            </div>
            
            <div className="px-4">
              <Link to="/servicing" className="text-black hover:text-gray-700">Servicing</Link>
            </div>
            <div className="px-4">
              <Link to="/reviews" className="text-black hover:text-gray-700">Reviews</Link>
            </div>
            <div className="px-4">
              <Link to="/cart" className="text-black hover:text-gray-700">Cart</Link>
            </div>
            {userRole === 'Admin' ? (
              <div className="px-1">
                <a href="#" onClick={handleDashboardClick} className="text-black hover:text-gray-700">Dashboard</a>
              </div>
            ) : (
              <div className="relative px-0">
                <button 
                  onClick={toggleDropdown} 
                  className="text-black hover:text-gray-700 bg-transparent border-none cursor-pointer">
                  myAutoSavy
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                    <Link 
                      to="/my-orders" 
                      className="block px-4 py-2 text-sm text-black hover:bg-gray-200">
                      My Orders
                    </Link>
                    <Link 
                      to="/my-reviews" 
                      className="block px-4 py-2 text-sm text-black hover:bg-gray-200">
                      My Reviews
                    </Link>
                  </div>
                )}
              </div>
            )}
            <div className="px-3">
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
                  'Authorization': `Bearer ${authToken}`
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
        <div className="w-screen h-screen bg-zinc-300 pt-16"> 
            <Header />
            <main className="flex flex-col px-8 py-4 bg-zinc-300 h-full max-md:px-5">
                <header className="py-4 px-6 bg-slate-600 rounded-full w-full">
                    <h1 className="text-xl text-white text-center">Cart Items</h1>
                </header>
                <section className="flex flex-col gap-6 mt-8 justify-center items-center h-full">
                    {cartItems.length === 0 ? (
                        <p className="text-black">Your cart is empty.</p>
                    ) : (
                        <ul className="w-full text-black max-w-2xl">
                            {cartItems.map(item => (
                                <li key={item.part_id} className="flex justify-between bg-white shadow-md p-4 rounded-lg mb-4">
                                    <div>
                                        <h2 className="text-black text-lg font-semibold">{item.part_name}</h2>
                                        <p>Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <button 
                                            onClick={() => handleRemoveItem(item.part_id)} 
                                            className="text-red-600 hover:text-red-800 ml-4"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {cartItems.length > 0 && (
                        <button 
                            onClick={handleCheckout} 
                            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-800 mt-4"
                        >
                            Checkout
                        </button>
                    )}
                </section>
            </main>
        </div>
    );
};

export default CartPage;
