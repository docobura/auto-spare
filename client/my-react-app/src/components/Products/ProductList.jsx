import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import { useAuth } from '../Auth/AuthContext'; // Adjust the import path as necessary

const ProductList = () => {
    const { authToken } = useAuth(); // Access authentication token
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/parts', {
                    headers: {
                        'Authorization': `Bearer ${authToken}`, // Include token in request headers
                    },
                });

                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [authToken]); // Include authToken as a dependency

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductItem key={product.id} {...product} />
            ))}
        </div>
    );
};

export default ProductList;
