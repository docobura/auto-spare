import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/Auth/AuthContext'; // Adjust the import path as necessary
import { Link } from 'react-router-dom'; // Make sure you have react-router-dom installed

const Header = () => {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 py-3 pr-6 pl-6 w-screen bg-white bg-opacity-50 rounded-full">
        <nav className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-lg text-black">
            <div className="flex shrink-0 w-10 h-10 bg-black rounded-full" />
            <div className="text-lg">AutoSavy</div>
          </Link>
          <div className="flex gap-4 text-sm">
            <Link to="/shop" className="text-black hover:text-gray-700">Shop</Link>
            <Link to="/dashboard" className="text-black hover:text-gray-700">Dashboard</Link>
            <Link to="/servicing" className="text-black hover:text-gray-700">Servicing</Link>
            <Link to="/reviews" className="text-black hover:text-gray-700">Reviews</Link>
            <Link to="/cart" className="text-black hover:text-gray-700">Cart</Link>
          </div>
        </nav>
      </header>
    );
};

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authToken } = useAuth();

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
                console.log('Fetched data:', data);
                setCartItems(data.items || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [authToken]);

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

            setCartItems(prevItems => prevItems.filter(item => item.part_id !== part_id));
        } catch (err) {
            setError(err.message);
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
                </section>
            </main>
        </div>
    );
};

export default CartPage;
