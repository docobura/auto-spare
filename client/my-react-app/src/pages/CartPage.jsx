import React, { useEffect, useState } from 'react';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch('http://localhost:5000/cart', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
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
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching cart items: {error}</div>;

    return (
        <div>
            <h1>Cart Items</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.part_id}>
                            <h2>{item.part_name}</h2>
                            <p>Quantity: {item.quantity}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CartPage;
