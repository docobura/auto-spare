import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-7 pr-20 pl-10 w-full bg-white bg-opacity-50 rounded-[81px] max-md:px-5 max-md:max-w-full">
      <nav className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[27%] max-md:ml-0 max-md:w-full">
          <div className="flex grow gap-2 text-3xl text-black whitespace-nowrap max-md:mt-10">
            <div className="flex shrink-0 w-24 bg-black h-[58px] rounded-[29px]" />
            <div className="flex-auto my-auto">AutoSavy</div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[73%] max-md:ml-0 max-md:w-full">
          <div className="flex gap-5 self-stretch my-auto text-3xl text-center text-black whitespace-nowrap max-md:mt-10 max-md:max-w-full">
            <div>Shop</div>
            <div className="flex-auto">Dashboard</div>
            <div className="flex-auto">Servicing</div>
            <div className="flex-auto">Reviews</div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="flex overflow-hidden flex-col items-center px-16 pt-32 pb-60 w-full bg-black max-md:px-5 max-md:pb-24 max-md:max-w-full">
      <h1 className="mt-28 text-8xl text-center text-orange-300 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
        Drive Smart
      </h1>
      <p className="mt-11 text-3xl text-center text-white max-md:mt-10 max-md:max-w-full">
        Your one-stop shop for car parts and servicing needs!
      </p>
      <button className="flex flex-col justify-center px-1 py-0.5 mt-10 mb-0 max-w-full text-4xl text-center text-white bg-white rounded-[65px] w-[343px] max-md:mb-2.5">
        <div className="px-16 py-11 bg-black rounded-[65px] max-md:px-5">
          Explore Now
        </div>
      </button>
    </section>
  );
};

const UpdateCard = ({ title, date, description, buttonText }) => {
  return (
    <article className="flex flex-col items-start mt-3.5 text-4xl text-black max-md:mt-10">
      <div className="flex shrink-0 self-stretch bg-zinc-300 h-[393px] rounded-[41px]" />
      <h3 className="mt-2.5">{title}</h3>
      <time className="mt-5 text-3xl">{date}</time>
      <p className="self-stretch mt-3.5 text-3xl max-md:mr-2.5">{description}</p>
      <button className="px-16 py-6 mt-2.5 text-center text-white whitespace-nowrap bg-slate-600 rounded-[50px] max-md:px-5">
        {buttonText}
      </button>
    </article>
  );
};

const Updates = () => {
  const updateData = [
    {
      title: "New Parts Just Arrived!",
      date: "July 30, 2024",
      description: "Check out our latest arrivals and get your ride back on the road!",
      buttonText: "Shop"
    },
    {
      title: "Service Specials This Month!",
      date: "July 28, 2024",
      description: "Don't miss our exclusive service deals. Your car deserves it!",
      buttonText: "Services"
    },
    {
      title: "Customer Reviews Are In!",
      date: "July 28, 2024",
      description: "See what our happy customers are saying about us!",
      buttonText: "Reviews"
    }
  ];

  return (
    <section className="flex overflow-hidden flex-col px-20 pt-3 pb-24 w-full bg-white max-md:px-5 max-md:max-w-full">
      <h2 className="self-center text-5xl text-center text-black max-md:max-w-full max-md:text-4xl">
        Latest Updates & Offers
      </h2>
      <div className="mt-20 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          {updateData.map((update, index) => (
            <div key={index} className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
              <UpdateCard {...update} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PartCard = ({ image, title, price, description }) => {
  return (
    <article className="flex flex-col items-start self-start mt-4 max-w-[300px] max-md:max-w-full">
      <img loading="lazy" src={image} alt={title} className="object-contain self-stretch w-full aspect-[1.19] rounded-[41px] max-md:max-w-full" />
      <h3 className="mt-2.5 text-2xl">{title}</h3>
      <p className="mt-4 text-xl">Ksh. {price}</p>
      <p className="self-stretch mt-3 text-lg max-md:mr-2.5">{description}</p>
      <button className="px-8 py-4 mt-4 text-xl text-center text-white bg-slate-600 rounded-[50px] max-md:px-5">
        Get Yours
      </button>
    </article>
  );
};

const PartsExplorer = () => {
  const partsData = [
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/a66f3655c5361eb556c7b506744a13848caf8160c571dfca379d13266f8c17bf?apiKey=e5e3ebbd91e648f394e04eeba5e829a3&&apiKey=e5e3ebbd91e648f394e04eeba5e829a3",
      title: "Spark Plug",
      price: "3,000",
      description: "Ignite your ride with our high-efficiency spark plugs!"
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/25ba8aca5cfc819bf9743e96c8e7727d223a22fcd3cae601c8f9ea4ed83ee55b?apiKey=e5e3ebbd91e648f394e04eeba5e829a3&&apiKey=e5e3ebbd91e648f394e04eeba5e829a3",
      title: "Suspension Kit",
      price: "45,000",
      description: "Transform your ride with our complete suspension kit!"
    }
  ];

  return (
    <section className="flex overflow-hidden flex-col items-center px-20 pt-14 pb-32 w-full text-black max-md:px-5 max-md:pb-24 max-md:max-w-full">
      <div className="flex flex-col mb-0 w-full max-w-[1080px] max-md:mb-2.5 max-md:max-w-full">
        <h2 className="self-center text-5xl text-center max-md:max-w-full max-md:text-4xl">
          Explore Our Parts
        </h2>
        <div className="flex flex-wrap gap-5 justify-between mt-9 max-md:max-w-full">
          {partsData.map((part, index) => (
            <PartCard key={index} {...part} />
          ))}
        </div>
      </div>
    </section>
  );
};

const OrangeSection = () => (
    <header className="flex overflow-hidden flex-col items-center px-20 pt-14 pb-36 w-full bg-red-500 max-md:px-5 max-md:pb-24 max-md:max-w-full">
      <div className="flex flex-col items-center -mb-7 w-full max-w-[994px] max-md:mb-2.5 max-md:max-w-full">
        <h1 className="ml-4 text-5xl text-center text-black max-md:max-w-full max-md:text-4xl">
          Rev Up Your Ride Today!
        </h1>
        <h2 className="self-stretch mt-20 text-5xl text-center text-black max-md:mt-10 max-md:max-w-full max-md:text-4xl">
          Get the best parts and services for your car.
        </h2>
        <div className="mt-20 ml-4 max-w-full w-[798px] max-md:mt-10">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <button className="grow px-16 pt-10 pb-7 w-full text-4xl text-center text-white bg-slate-600 rounded-[50px] max-md:px-5 max-md:mt-10">
                Get parts
              </button>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <button className="grow px-11 py-8 w-full text-4xl text-center text-white bg-slate-600 rounded-[50px] max-md:px-5 max-md:mt-10">
                Book servicing
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
  
  const ReviewSection = () => (
    <section className="flex overflow-hidden flex-wrap gap-5 px-20 pt-14 pb-32 w-full text-center text-black bg-white max-md:px-5 max-md:pb-24 max-md:max-w-full">
      <div className="flex flex-col max-md:max-w-full">
        <h2 className="self-center text-5xl max-md:text-4xl">Previous Reviews</h2>
        <article className="flex flex-col items-start pt-14 pr-2 pb-80 pl-0.5 mt-11 bg-zinc-300 rounded-[39px] max-md:pb-24 max-md:mt-10 max-md:max-w-full">
          <h3 className="ml-8 text-2xl max-md:ml-2.5">Name</h3>
          <hr className="shrink-0 self-stretch mt-8 border border-black border-solid h-[3px] max-md:max-w-full" />
          <p className="mt-11 mb-0 ml-8 text-5xl max-md:mt-10 max-md:mb-2.5 max-md:max-w-full max-md:text-4xl">
            Review description
          </p>
        </article>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/53a656cc5106c7e2ea155f8a453f8e4e3da373c5cfd4ed6585c5516eecbfa4dc?apiKey=e5e3ebbd91e648f394e04eeba5e829a3&&apiKey=e5e3ebbd91e648f394e04eeba5e829a3"
        alt=""
        className="object-contain shrink-0 my-auto w-7 aspect-[0.6]"
      />
    </section>
  );
  
  const FAQItem = ({ question }) => (
    <div className="flex flex-wrap gap-5 justify-between items-start px-10 py-8 mt-16 bg-white rounded-[37px] max-md:px-5 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
      <div className="mt-3 max-md:max-w-full max-md:text-4xl">{question}</div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f01bd62142ea8d982c2082a5312c1f2e81f062248cbfe2016a640c40287c592d?apiKey=e5e3ebbd91e648f394e04eeba5e829a3&&apiKey=e5e3ebbd91e648f394e04eeba5e829a3"
        alt=""
        className="object-contain shrink-0 aspect-[1.04] w-[52px]"
      />
    </div>
  );
  
  const FAQSection = () => {
    const faqItems = [
      "How do I order car parts?",
      "Can I book a service online?",
      "What if I need to cancel?",
      "How do I track my order?",
      "Do you offer warranties on parts?",
    ];
  
    return (
      <section className="flex overflow-hidden flex-col justify-center items-center px-20 py-24 w-full text-5xl text-black bg-rose-50 max-md:px-5 max-md:max-w-full max-md:text-4xl">
        <div className="flex flex-col w-full max-w-[1038px] max-md:max-w-full max-md:text-4xl">
          <h2 className="text-7xl text-center max-md:mr-2 max-md:max-w-full max-md:text-4xl">
            Frequently asked questions
          </h2>
          {faqItems.map((question, index) => (
            <FAQItem key={index} question={question} />
          ))}
        </div>
      </section>
    );
  };
  
  const ContactForm = () => (
    <section className="flex overflow-hidden flex-col items-center pt-7 pr-2.5 pb-20 pl-14 w-full bg-rose-50 max-md:pl-5 max-md:max-w-full">
      <h2 className="text-7xl text-center text-black max-md:max-w-full max-md:text-4xl">
        Get in Touch!
      </h2>
      <form className="w-full max-w-[1347px]">
        <div className="flex flex-wrap gap-3.5 self-start mt-10 text-4xl text-center whitespace-nowrap text-zinc-400 max-md:max-w-full">
          <input
            type="text"
            placeholder="Name"
            className="grow px-10 py-8 bg-white rounded-[76px] w-fit max-md:px-5 max-md:max-w-full"
            aria-label="Name"
          />
          <input
            type="email"
            placeholder="Email"
            className="grow px-16 py-8 bg-white rounded-[76px] w-fit max-md:px-5 max-md:max-w-full"
            aria-label="Email"
          />
        </div>
        <input
          type="tel"
          placeholder="Phone"
          className="self-stretch px-10 py-8 mt-8 text-4xl text-center whitespace-nowrap bg-white rounded-[76px] text-zinc-400 max-md:px-5 max-md:max-w-full"
          aria-label="Phone"
        />
        <textarea
          placeholder="Message"
          className="self-start px-6 pt-8 pb-16 mt-5 max-w-full text-4xl text-center whitespace-nowrap bg-white rounded-[53px] text-zinc-400 w-full max-md:px-5"
          aria-label="Message"
        ></textarea>
        <button
          type="submit"
          className="px-16 py-6 mt-14 ml-2.5 text-3xl text-center text-white bg-slate-600 rounded-[40px] max-md:px-5 max-md:mt-10"
        >
          Send It!
        </button>
      </form>
    </section>
  );
  
  const ContactInfoItem = ({ title, content }) => (
    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow items-start px-20 py-12 w-full text-black whitespace-nowrap bg-white rounded-[51px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <h3 className="text-6xl text-center max-md:text-4xl">{title}</h3>
        <p className="mt-16 text-3xl max-md:mt-10">{content}</p>
      </div>
    </div>
  );
  
  const ContactInfo = () => (
    <section className="mt-16 text-6xl text-center text-black max-md:mt-10 max-md:text-4xl">
      <h2>Contact Us</h2>
      <div className="mt-10 w-full max-w-[1141px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <ContactInfoItem title="Phone" content="07000000" />
          <ContactInfoItem title="Email" content="info.autosavy@gmail.com" />
        </div>
      </div>
      <div className="mt-16 w-full max-w-[1138px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <ContactInfoItem title="Address" content="Nairobi Kenya" />
          <ContactInfoItem title="Working Hours" content="Mon-Fri: 9am - 6pm" />
        </div>
      </div>
    </section>
  );
  
  const Footer = () => {
    const navItems = ['Home', 'Products', 'Services', 'Contact'];
  
    return (
      <footer className="flex overflow-hidden flex-col px-20 pt-36 pb-20 w-full text-white bg-black max-md:px-5 max-md:pt-24 max-md:max-w-full">
        <nav className="flex gap-5 self-end w-full text-5xl whitespace-nowrap max-w-[1270px] max-md:max-w-full max-md:text-4xl">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="flex-auto max-md:text-4xl"
            >
              {item}
            </a>
          ))}
        </nav>
        <p className="self-center mt-24 text-3xl max-md:mt-10 max-md:max-w-full">
          2024 AutoSavy. All rights reserved.
        </p>
      </footer>
    );
  };
  

const HomePage = () => {
  return (
    <main className="flex flex-col">
      <Header />
      <Hero />
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/370d7268f4aa1c834336593319b3703ad5e03721d70931ac7a3b1c2b33da20a3?apiKey=e5e3ebbd91e648f394e04eeba5e829a3&&apiKey=e5e3ebbd91e648f394e04eeba5e829a3" alt="" className="object-contain mt-8 w-full aspect-[3.6] max-md:max-w-full" />
      <Updates />
      <PartsExplorer />
      <OrangeSection />
      <ReviewSection />
      <FAQSection />
      <ContactForm />
      <ContactInfo />
      <Footer />
    </main>
  );
};

export default HomePage;




