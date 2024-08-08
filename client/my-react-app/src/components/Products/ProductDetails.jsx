import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext'; // Adjust the import path as necessary

const ProductDetails = () => {
    const { id } = useParams();
    const { authToken } = useAuth(); // Access authentication token
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/parts/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`, // Include token in request headers
                    },
                });

                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduct();
    }, [id, authToken]);

    const handleAddToCart = async () => {
        try {
            const response = await fetch(`/api/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`, // Include token in request headers
                },
                body: JSON.stringify({ productId: product.id, quantity: 1 }),
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            console.log('Product added to cart:', data);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-details">
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductDetails;
