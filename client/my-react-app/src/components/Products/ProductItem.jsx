const ProductItem = ({ product }) => {
    return (
        <div className="product-item">
            <Link to={`/products/${product.id}`} className="block">
                <img src={product.image} alt={product.name} className="w-full h-auto" />
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-lg text-gray-700">${product.price}</p>
            </Link>
        </div>
    );
};

export default ProductItem;