import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Header from '../components/Header';


// SearchBar Component
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 px-3 py-1 bg-white rounded-lg shadow-md">
      <label htmlFor="search" className="sr-only">Search</label>
      <input
        type="text"
        id="search"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow px-2 py-1 text-sm text-gray-800 bg-transparent border-none outline-none"
      />
      <button type="submit" aria-label="Search" className="flex-shrink-0  hover:bg-orange-700">
        <MagnifyingGlassIcon className="w-5 h-5 text-white" />
      </button>
    </form>
  );
};

// FilterButton Component
const FilterButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="relative">
      <button onClick={toggleFilter} className="flex items-center gap-1 px-3 py-1 text-sm text-black bg-white rounded-full shadow-md border border-black">
        <span className="text-black">Filter</span>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d566aabe00a711f1e4940b7c9c9d088651cfbefc522198eef4d246469c52a455?apiKey=e5e3ebbd91e648f394e04eeba5e829a3&&apiKey=e5e3ebbd91e648f394e04eeba5e829a3"
          alt="Filter icon"
          className="w-3 h-3"
        />
      </button>
      {isOpen && (
        <div className="absolute left-0 z-10 mt-2 p-2 bg-white border border-black rounded-lg shadow-lg">
          <label className="block text-sm text-black">
            <input
              type="radio"
              name="filter"
              value="price"
              checked={filter === 'price'}
              onChange={handleFilterChange}
              className="mr-2"
            />
            Price
          </label>
          <label className="block text-sm text-black">
            <input
              type="radio"
              name="filter"
              value="name"
              checked={filter === 'name'}
              onChange={handleFilterChange}
              className="mr-2"
            />
            Name
          </label>
          <label className="block text-sm text-black">
            <input
              type="radio"
              name="filter"
              value="alphabetical"
              checked={filter === 'alphabetical'}
              onChange={handleFilterChange}
              className="mr-2"
            />
            Alphabetical
          </label>
        </div>
      )}
    </div>
  );
};

// ProductCard Component
const ProductCard = ({ id, name, price, description, image }) => {
  return (
    <article className="flex flex-col w-[25%] max-md:w-full bg-white rounded-lg shadow-md p-4">
      <img loading="lazy" src={image} alt={name} className="object-contain w-full aspect-[0.87] rounded-lg" />
      <h3 className="mt-2 text-xl font-semibold text-black">{name}</h3>
      <p className="mt-1 text-xl text-gray-700">Ksh. {price.toLocaleString()}</p>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <Link to={`/parts/${id}`}>
        <button className="mt-4 px-4 py-2 text-lg text-center w-full  text-white bg-orange-600 rounded-lg shadow-lg">
          Purchase
        </button>
      </Link>
    </article>
  );
};

// ShopPage Component
const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [products, setProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetch('https://auto-spare.onrender.com/parts')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleAddPart = (newPart) => {
    setProducts([...products, newPart]);
  };

  const filteredParts = products.filter((part) =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedParts = filteredParts.sort((a, b) => {
    switch (filter) {
      case 'price':
        return a.price - b.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="w-screen h-screen bg-zinc-300 pt-3">
      <Header />
      <main className="flex flex-col px-8 py-4 bg-zinc-300 max-md:px-5 mt-16">
        <header className="flex items-center justify-between py-4 px-6 bg-black rounded-full w-full max-md:pr-2 ">
          <h1 className="text-xl text-white ">Shop</h1>
          <div className="flex items-center gap-3">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <FilterButton />

          </div>
        </header>
        <section className="flex flex-wrap gap-6 mt-8 justify-center h-full">
          {sortedParts.map((part) => (
            <ProductCard
              key={part.id}
              id={part.id}
              name={part.name}
              price={part.price}
              description={part.description}
              image={part.image_url}
            />
          ))}
        </section>
        {isFormOpen && (
          <AddPartForm
            onClose={() => setIsFormOpen(false)}
            onAddPart={handleAddPart}
          />
        )}
      </main>
    </div>
  );
};

export default ShopPage;
