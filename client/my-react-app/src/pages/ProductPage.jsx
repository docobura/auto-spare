import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductDetails from '../components/Products/ProductDetails'; // Ensure the correct path to ProductDetails

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 pr-6 pl-6 w-screen bg-white bg-opacity-50 rounded-full">
      <nav className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-lg text-black">
          <div className="flex shrink-0 w-10 h-10 bg-black rounded-full" />
          <div className="text-lg">AutoSavy</div>
        </Link>
        <div className="flex gap-4 text-sm text-black">
          <Link to="/shop">Shop</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/servicing">Servicing</Link>
          <Link to="/reviews">Reviews</Link>
        </div>
      </nav>
    </header>
  );
};

const ProductImage = ({ image }) => {
  return (
    <img
      loading="lazy"
      src={image}
      alt="Product image"
      className="object-contain w-full aspect-[1.09] rounded-[41px] max-md:mr-1.5 max-md:max-w-full"
    />
  );
};

const ReviewSection = () => {
  const navigate = useNavigate();

  return (
    <section className="mt-10">
      <h2 className="text-4xl text-white">Reviews</h2>
      <p className="mt-11 text-3xl max-md:mt-10 max-md:max-w-full">
        This product doesn't have reviews.
      </p>
      <button 
        className="px-12 py-6 mt-6 text-3xl text-center bg-slate-600 rounded-[29px] max-md:px-5" 
        onClick={() => navigate('/add-review')} // Navigate to review form page
      >
        Add a review
      </button>
    </section>
  );
};

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product details from backend
    fetch(`http://localhost:5000/parts/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        setError('Error fetching product details.');
        console.error('Error fetching product:', error);
      });
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col px-4 pt-14 pb-10 bg-black min-h-screen max-md:px-2 max-md:pb-6 w-screen">
      <Header />
      <div className="self-center mt-10 w-full max-w-[1200px] max-md:mt-6">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-6/12 max-md:w-full">
            <div className="flex flex-col grow text-4xl text-white max-md:mt-6">
              <ProductImage image={product.image_url} />
              <ReviewSection />
            </div>
          </div>
          <div className="flex flex-col w-6/12 max-md:w-full">
            <ProductDetails product={product} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
