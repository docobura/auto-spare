import React from 'react';

function PartCard({ image, name, price, description }) {
    return (
        <article className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-4xl text-black max-md:mt-10">
                <img loading="lazy" src={image} alt={name} className="object-contain w-full aspect-[0.87] rounded-[41px]" />
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

export default PartCard;
