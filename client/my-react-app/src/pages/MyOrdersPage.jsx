import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/Auth/AuthContext';
import { Link } from 'react-router-dom';

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

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { authToken } = useAuth();

        useEffect(() => {
            const fetchOrders = async () => {
                try {
                    const response = await fetch('http://localhost:5000/orders', {
                        method: 'GET',
                        headers: { 
                            'Authorization': `Bearer ${authToken}`,
                            'Content-Type': 'application/json' 
                        },
                    });
        
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.msg || 'Failed to fetch orders');
                    }
        
                    const data = await response.json();
                    console.log('Fetched Orders:', data);  // Log the response data
                    setOrders(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
        
            fetchOrders();
        }, [authToken]);
        

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString();
    };

    return (
        <div className="h-screen w-screen flex flex-col bg-gray-300">
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-black">My Orders</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="mt-4 text-red-600">{error}</p>
                ) : orders.length > 0 ? (
                    <div className="w-full max-w-md mx-auto">
                        {orders.map(order => (
                            <div key={order.id} className="bg-white p-4 mb-4 rounded-lg shadow-md text-black">
                                <p>Status: {order.status}</p>
                                <p>Total Amount: ${order.total_amount}</p>
                                <p>Ordered on: {formatDate(order.created_at)}</p>
                                <p>Items:</p>
                                {(order.items && order.items.length > 0) ? (
                                    order.items.map((item, index) => (
                                        <div key={index} className="border-t border-gray-300 mt-2 pt-2">
                                            <p>Part Name: {item.part_name}</p>
                                            <p>Quantity: {item.quantity}</p>
                                            {item.image_url && <img src={item.image_url} alt={item.part_name} className="w-16 h-16" />}
                                        </div>
                                    ))
                                ) : (
                                    <p>No items found for this order.</p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-black">You have no orders.</p>
                )}
            </main>
        </div>
    );
};

export default MyOrdersPage;
