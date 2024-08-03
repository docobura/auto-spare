import React, { useState, useEffect } from 'react';
import PartCard from './PartCard';

function RecentParts() {
    const [partsData, setPartsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch parts data from the backend
        const fetchPartsData = async () => {
            try {
                const response = await fetch('/api/parts');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPartsData(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchPartsData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

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

export default RecentParts;
