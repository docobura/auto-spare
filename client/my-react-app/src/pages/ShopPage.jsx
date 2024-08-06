import React, { useState } from 'react';
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
    <article className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col text-4xl text-black max-md:mt-10">
        <img loading="lazy" src={image} alt={name} className="object-contain w-full aspect-[0.87] rounded-[41px]" />
        <h3 className="self-start mt-2.5">{name}</h3>
        <p className="mt-12 text-3xl max-md:mt-10">Ksh. {price.toLocaleString()}</p>
        <p className="self-stretch mt-8 text-3xl">{description}</p>
        <Link to={`/products/${id}`}>
          <button className="px-8 py-7 mt-2.5 text-4xl text-center text-white whitespace-nowrap bg-slate-600 rounded-[50px] max-md:px-5">
            Purchase
          </button>
        </Link>
      </div>
    </article>
  );
};

// ShopPage Component
const ShopPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');

  const recentParts = [
    {
      id: 1,
      name: 'Spark Plug',
      price: 3000,
      description: 'Ignite your ride with our high-efficiency spark plugs!',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c5ac9e4c7d88ad591614ac1aa3b03992fb6dd38d764043bf010eab9f028f2146?apiKey=e5e3ebbd91e648f394e04eeba5e829a3&&apiKey=e5e3ebbd91e648f394e04eeba5e829a3'
    },
    {
      id: 2,
      name: 'Suspension Kit',
      price: 45000,
      description: 'Transform your ride with our complete suspension kit!',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/be2ce556cdb48035e1b88d8af009770a754f166529f5873dc02137d7cdac33ca?apiKey=e5e3ebbd91e648f394e04eeba5e829a3&&apiKey=e5e3ebbd91e648f394e04eeba5e829a3'
    },
    {
      id: 3,
      name: 'Brake Pads',
      price: 9000,
      description: 'Stop on a dime with our premium brake pads!',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ad282f379a8c2ea89eb42780b7e7c9c54002500999fd632986c2bb146d560c3e?apiKey=e5e3ebbd91e648f394e04eeba5e829a3&&apiKey=e5e3ebbd91e648f394e04eeba5e829a3'
    },
    {
      id: 4,
      name: 'Oil Filter',
      price: 4500,
      description: 'Keep your engine clean with our top-notch oil filter!',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/de2676dc6779312954a91ee66c40182c7eb50a71f0f915d30788d8aba36cc15d?apiKey=e5e3ebbd91e648f394e04eeba5e829a3&&apiKey=e5e3ebbd91e648f394e04eeba5e829a3'
    },
    {
      id: 5,
      name: 'Battery',
      price: 14000,
      description: 'Never get stranded again with our reliable car battery!',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/cc80a22e6714c3fa4df1b760785acd06824363410721db0fc771b9719c8b9748?apiKey=e5e3ebbd91e648f394e04eeba5e829a3&&apiKey=e5e3ebbd91e648f394e04eeba5e829a3'
    },
    {
      id: 6,
      name: 'Turbo Charger',
      price: 56000,
      description: 'Boost your engine\'s power with our high-performance turbocharger!',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f5d2fab851f9efab4f7b2c72f3f0dcb8efe572e3ac2c247f2691ed6acba913d4?apiKey=e5e3ebbd91e648f394e04eeba5e829a3&&apiKey=e5e3ebbd91e648f394e04eeba5e829a3'
    },
  ];
  // Filter products based on search term
  const filteredParts = recentParts.filter(part =>
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
    <main className="flex overflow-hidden flex-col px-16 py-12 bg-zinc-300 max-md:px-5">
      <header className="self-center py-6 pr-8 pl-4 max-w-full bg-slate-600 rounded-[31px] w-[1223px] max-md:pr-5">
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
      <section className="flex flex-wrap gap-10 mt-12 justify-center">
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
  );
};

export default ShopPage;