import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext'; // Adjust the import path as necessary

const ProductDetails = () => {
    const { id } = useParams();
    const { authToken } = useAuth(); // Access authentication token
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [alertMessage, setAlertMessage] = useState(''); // State for alert message

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://auto-spare.onrender.com/parts/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`, // Include token in request headers
                    },
                });

                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();
                setProduct(data);
                setQuantity(1); // Reset quantity when product data is fetched
            } catch (error) {
                console.error('Error fetching product details:', error);
                setAlertMessage('Failed to fetch product details.');
            }
        };

        fetchProduct();
    }, [id, authToken]);

    const handleQuantityChange = (event) => {
        const newQuantity = Number(event.target.value);

        // Validate quantity
        if (newQuantity < 1) {
            setQuantity(1); // Reset to 1 if input is less than 1
        } else if (newQuantity > (product?.stock_quantity || 0)) {
            setQuantity(product?.stock_quantity || 0); // Cap quantity at stock limit
        } else {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = async () => {
        if (quantity <= 0 || quantity > (product?.stock_quantity || 0)) {
            setAlertMessage('Invalid quantity. Please enter a valid quantity.');
            return;
        }
    
        try {
            const response = await fetch('https://auto-spare.onrender.com/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,  // Use auth token from context
                },
                body: JSON.stringify({
                    part_id: product.id,
                    part_name: product.name,
                    quantity: quantity,
                    price: parseFloat(product.price),  // Ensure price is a float
                    image_url: product.image_url // Include image_url if needed
                }),
            });
    
            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }
    
            // Update stock in parts
            const updateResponse = await fetch(`https://auto-spare.onrender.com/parts/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    stock_quantity: product.stock_quantity - quantity, // Correct field name for stock
                }),
            });
    
            if (!updateResponse.ok) {
                throw new Error(`Failed to update stock: ${updateResponse.statusText}`);
            }
    
            const data = await response.json();
            console.log('Product added to cart:', data);
            setAlertMessage('Product successfully added to cart!'); 
        } catch (error) {
            console.error('Error adding product to cart:', error);
            setAlertMessage('Failed to add product to cart.'); // Set error message
        }
    };    

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-details">
            {alertMessage && (
                <div className={`alert ${alertMessage.startsWith('Failed') ? 'alert-error' : 'alert-success'}`}>
                    {alertMessage}
                </div>
            )}
            <h1>{product.name}</h1>
            <img src={product.image_url} alt={product.name} />
            <p>{product.description}</p>
            <p>${product.price}</p>
            <p>Stock: {product.stock_quantity}</p>
            <div>
                <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={product.stock_quantity}
                />
            </div>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductDetails;
