import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// SearchBar Component
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-wrap flex-auto gap-5 justify-between self-start px-7 py-4 whitespace-nowrap bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
      <label htmlFor="search" className="sr-only">Search</label>
      <input
        type="text"
        id="search"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="text-2xl text-black bg-transparent outline-none"
      />
      <button type="submit" aria-label="Search">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/28c28185b988418194d9d7b6dc8e6fdf545b466f08ec5d4343a77721ae3346d7?apiKey=e5e3ebbd91e648f394e04eeba5e829a3&&apiKey=e5e3ebbd91e648f394e04eeba5e829a3" alt="Search icon" className="object-contain shrink-0 self-start w-6 aspect-square" />
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
    console.log('Filter by:', e.target.value);
  };

  return (
    <div className="flex flex-col justify-center px-2 py-1.5 bg-black">
      <button onClick={toggleFilter} className="flex gap-5 justify-between px-5 py-3.5 bg-white">
        <span>Filter by</span>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d566aabe00a711f1e4940b7c9c9d088651cfbefc522198eef4d246469c52a455?apiKey=e5e3ebbd91e648f394e04eeba5e829a3&&apiKey=e5e3ebbd91e648f394e04eeba5e829a3" alt="Filter icon" className="object-contain shrink-0 self-start aspect-square w-[21px]" />
      </button>
      {isOpen && (
        <div className="mt-2 p-4 bg-white">
          <label className="block">
            <input
              type="radio"
              name="filter"
              value="price"
              checked={filter === 'price'}
              onChange={handleFilterChange}
            />
            Price
          </label>
          <label className="block">
            <input
              type="radio"
              name="filter"
              value="name"
              checked={filter === 'name'}
              onChange={handleFilterChange}
            />
            Name
          </label>
          <label className="block">
            <input
              type="radio"
              name="filter"
              value="alphabetical"
              checked={filter === 'alphabetical'}
              onChange={handleFilterChange}
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
        <button className="mt-4 px-4 py-2 text-lg text-center text-white bg-slate-600 rounded-lg w-full">
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

  useEffect(() => {
    // Fetch products from backend
    fetch('http://localhost:5000/parts')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Filter products based on search term
  const filteredParts = products.filter(part =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort products based on selected filter
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
    <div className="w-screen bg-black">
      <main className="flex flex-col px-16 py-12 bg-zinc-300 h-full max-md:px-5">
        <header className="self-center py-6 pr-8 pl-4 max-w-full bg-slate-600 rounded-[31px] w-full max-md:pr-5">
          <nav className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[16%] max-md:ml-0 max-md:w-full">
              <div className="flex grow gap-3 text-xl text-black whitespace-nowrap max-md:mt-10">
                <div className="flex shrink-0 bg-black h-[69px] rounded-[42px] w-[81px]" />
                <h1 className="my-auto text-xl">Shop</h1>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[84%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-wrap gap-5 mt-1.5 text-2xl text-black max-md:mt-10">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <FilterButton />
              </div>
            </div>
          </nav>
        </header>
        <section className="flex flex-wrap gap-6 mt-12 justify-center">
          {sortedParts.map(part => (
            <ProductCard
              key={part.id}
              id={part.id}
              name={part.name}
              price={part.price}
              description={part.description}
              image={part.image}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default ShopPage;
