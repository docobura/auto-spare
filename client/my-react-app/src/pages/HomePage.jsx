import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 pr-6 pl-6 w-full bg-white bg-opacity-50 rounded-full">
      <nav className="flex gap-4 justify-center">
        <div className="flex items-center gap-2 text-lg text-black">
          <div className="flex shrink-0 w-10 h-10 bg-black rounded-full" />
          <div className="flex-auto">AutoSavy</div>
        </div>
        <div className="flex items-center gap-4 text-sm text-black">
          <Link to="/">Shop</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/servicing">Servicing</Link>
          <Link to="/reviews">Reviews</Link>
        </div>
      </nav>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="flex flex-col items-center px-10 pt-32 pb-60 w-full bg-black">
      <h1 className="mt-10 text-5xl text-center text-orange-300">Drive Smart</h1>
      <p className="mt-5 text-xl text-center text-white">Your one-stop shop for car parts and servicing needs!</p>
      <Link to="/shop">
        <button className="mt-5 px-5 py-2 text-lg text-white bg-orange-500 rounded-lg">Explore Now</button>
      </Link>
    </section>
  );
};

const UpdateCard = ({ title, date, description, buttonText, buttonLink }) => {
  return (
    <article className="flex flex-col items-start mt-3.5 text-xl text-black">
      <div className="flex shrink-0 self-stretch bg-zinc-300 h-[200px] rounded-[20px]" />
      <h3 className="mt-2.5">{title}</h3>
      <time className="mt-1 text-lg">{date}</time>
      <p className="self-stretch mt-2 text-base">{description}</p>
      <Link to={buttonLink}>
        <button className="px-5 py-2 mt-2 text-center text-white bg-slate-600 rounded-full">{buttonText}</button>
      </Link>
    </article>
  );
};

const Updates = () => {
  const updateData = [
    {
      title: "New Parts Just Arrived!",
      date: "July 30, 2024",
      description: "Check out our latest arrivals and get your ride back on the road!",
      buttonText: "Shop",
      buttonLink: "/shop"
    },
    {
      title: "Service Specials This Month!",
      date: "July 28, 2024",
      description: "Don't miss our exclusive service deals. Your car deserves it!",
      buttonText: "Services",
      buttonLink: "/servicing"
    },
    {
      title: "Customer Reviews Are In!",
      date: "July 28, 2024",
      description: "See what our happy customers are saying about us!",
      buttonText: "Reviews",
      buttonLink: "/reviews"
    }
  ];

  return (
    <section className="flex flex-col px-10 pt-3 pb-24 w-full bg-white">
      <h2 className="self-center text-3xl text-center text-black">Latest Updates & Offers</h2>
      <div className="mt-10 flex gap-5 justify-center">
        {updateData.map((update, index) => (
          <div key={index} className="flex flex-col w-[33%]">
            <UpdateCard {...update} />
          </div>
        ))}
      </div>
    </section>
  );
};

const PartCard = ({ image, title, price, description, link }) => {
  return (
    <article className="flex flex-col items-start self-start mt-4 max-w-[300px]">
      <img loading="lazy" src={image} alt={title} className="object-contain self-stretch w-full h-[200px] rounded-[20px]" />
      <h3 className="mt-2.5 text-2xl">{title}</h3>
      <p className="mt-2 text-lg">Ksh. {price}</p>
      <p className="self-stretch mt-2 text-base">{description}</p>
      <Link to={link}>
        <button className="px-4 py-2 mt-2 text-lg text-center text-white bg-slate-600 rounded-full">Get Yours</button>
      </Link>
    </article>
  );
};

const PartsExplorer = () => {
  const partsData = [
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/a66f3655c5361eb556c7b506744a13848caf8160c571dfca379d13266f8c17bf?apiKey=e5e3ebbd91e648f394e04eeba5e829a3&&apiKey=e5e3ebbd91e648f394e04eeba5e829a3",
      title: "Spark Plug",
      price: "3,000",
      description: "Ignite your ride with our high-efficiency spark plugs!",
      link: "/product/1"
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/25ba8aca5cfc819bf9743e96c8e7727d223a22fcd3cae601c8f9ea4ed83ee55b?apiKey=e5e3ebbd91e648f394e04eeba5e829a3&&apiKey=e5e3ebbd91e648f394e04eeba5e829a3",
      title: "Suspension Kit",
      price: "45,000",
      description: "Transform your ride with our complete suspension kit!",
      link: "/product/2"
    }
  ];

  return (
    <section className="flex flex-col items-center px-10 pt-14 pb-32 w-full text-black bg-gray-50">
      <div className="flex flex-col w-full max-w-[1080px]">
        <h2 className="self-center text-3xl text-center">Explore Our Parts</h2>
        <div className="flex flex-wrap gap-5 justify-between mt-9">
          {partsData.map((part, index) => (
            <PartCard key={index} {...part} />
          ))}
        </div>
      </div>
    </section>
  );
};

const OrangeSection = () => (
  <header className="flex flex-col items-center px-10 pt-14 pb-36 w-full bg-red-200">
    <div className="flex flex-col items-center w-full max-w-[994px]">
      <h1 className="text-3xl text-center text-black">Rev Up Your Ride Today!</h1>
      <h2 className="self-stretch mt-10 text-3xl text-center text-black">Get the best parts and services for your car.</h2>
      <div className="mt-10 w-full flex gap-5 justify-center">
        <Link to="/shop">
          <button className="px-8 py-4 text-lg text-center text-white bg-slate-600 rounded-full">Get parts</button>
        </Link>
        <Link to="/servicing">
          <button className="px-8 py-4 text-lg text-center text-white bg-slate-600 rounded-full">Book servicing</button>
        </Link>
      </div>
    </div>
  </header>
);

const ReviewSection = () => (
  <section className="flex flex-wrap gap-5 px-10 pt-14 pb-32 w-full text-center text-black bg-white">
    <div className="flex flex-col w-full">
      <h2 className="self-center text-3xl">Previous Reviews</h2>
      <article className="flex flex-col items-start p-10 mt-10 bg-zinc-300 rounded-[20px]">
        <h3 className="text-xl">Name</h3>
        <hr className="self-stretch mt-8 border-black border-solid" />
        <p className="mt-5 text-lg">Review description</p>
      </article>
    </div>
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/53a656cc5106c7e2ea155f8a453f8e4e3da373c5cfd4ed6585c5516eecbfa4dc?apiKey=e5e3ebbd91e648f394e04eeba5e829a3&&apiKey=e5e3ebbd91e648f394e04eeba5e829a3"
      alt=""
      className="object-contain my-auto w-6"
    />
  </section>
);

const FAQItem = ({ question }) => (
  <div className="flex flex-wrap gap-5 justify-between items-start px-10 py-8 mt-10 bg-white border border-gray-300 rounded-lg">
    <h3 className="text-2xl">{question}</h3>
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a01c3c8aa5fbcaa6f66f13fd6e9237589b68d93b1e12313cfb0cf12cf62f6b43?apiKey=e5e3ebbd91e648f394e04eeba5e829a3"
      alt=""
      className="object-contain w-6"
    />
  </div>
);

const FAQs = () => (
  <section className="flex flex-col px-10 pt-10 pb-32 w-full text-center text-black bg-gray-50">
    <h2 className="text-3xl">FAQ</h2>
    <FAQItem question="Question" />
  </section>
);

const ContactUs = () => (
  <section className="flex flex-col items-center px-10 pt-10 pb-32 w-full text-center text-black bg-gray-50">
    <div className="flex flex-col w-full max-w-[1080px]">
      <h2 className="self-center text-3xl">Contact Us</h2>
      <div className="flex flex-wrap gap-5 justify-between mt-9">
        <textarea className="w-full py-5 text-lg bg-white border border-gray-300 rounded-md" placeholder="Message" />
        <input type="text" className="w-full py-5 text-lg bg-white border border-gray-300 rounded-md" placeholder="Phone" />
        <button className="w-full px-4 py-2 mt-2 text-lg text-center text-white bg-slate-600 rounded-full">Submit</button>
      </div>
    </div>
  </section>
);

const HomePage = () => (
  <div className="flex flex-col items-center">
    <Header />
    <Hero />
    <Updates />
    <PartsExplorer />
    <OrangeSection />
    <ReviewSection />
    <FAQs />
    <ContactUs />
  </div>
);

export default HomePage;
