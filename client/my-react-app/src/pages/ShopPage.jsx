import React, { useEffect, useState } from 'react';
import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';

function PartCard({ image, name, price, description }) {
    return (
        <article className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-4xl text-black max-md:mt-10">
                <img
                    loading="lazy"
                    src={image}
                    alt={name}
                    className="object-contain w-full aspect-[0.87] rounded-[41px]"
                />
                <h3 className="self-start mt-2.5">{name}</h3>
                <p className="mt-9 text-3xl">{price}</p>
                <p className="self-stretch mt-8 text-3xl">{description}</p>
                <button className="px-8 py-7 mt-2.5 text-4xl text-center text-white whitespace-nowrap bg-slate-600 rounded-[50px] max-md:px-5">
                    Purchase
                </button>
            </div>
        </article>
    );
}

function RecentParts() {
    const [partsData, setPartsData] = useState([]);

    useEffect(() => {
        const fetchParts = async () => {
            try {
                const response = await fetch('/api/parts'); // Replace with your API endpoint
                const data = await response.json();
                setPartsData(data);
            } catch (error) {
                console.error('Error fetching parts data:', error);
            }
        };

        fetchParts();
    }, []);

    return (
        <main className="flex overflow-hidden flex-col items-end px-16 py-12 bg-zinc-300 max-md:px-5">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/305dc90e13ea87d3b7fc0217ae8045fa3be18a69733889290de02015eacb6c47?apiKey=eae4ee9812704cb2b0639e505caa55af&"
                alt=""
                className="object-contain self-start w-full aspect-[1.56] rounded-[95px] max-md:max-w-full"
            />
            <h2 className="self-start mt-24 ml-24 text-6xl text-black max-md:mt-10 max-md:ml-2.5 max-md:text-4xl">
                Recent Parts
            </h2>
            <section className="mt-11 mr-5 w-full max-w-[1267px] max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                    {partsData.slice(0, 3).map((part, index) => (
                        <PartCard key={index} {...part} />
                    ))}
                </div>
            </section>
            <section className="mt-28 w-full max-w-[1275px] max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                    {partsData.slice(3).map((part, index) => (
                        <PartCard key={index + 3} {...part} />
                    ))}
                </div>
            </section>
        </main>
    );
}

function ShopPage() {
    return (
        <div>
            <Navbar />
            
            <div className="shop-page-content">
                <h1 className="text-5xl font-bold text-center my-8">Shop</h1>
                <RecentParts />
            </div>
            
            <Footer />
        </div>
    );
}

export default ShopPage;
