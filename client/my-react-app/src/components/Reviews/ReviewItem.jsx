import React from 'react';

const ReviewItem = ({ review }) => (
  <article className="flex flex-col w-full max-w-lg bg-zinc-300 rounded-[71px] p-7 mb-5 text-5xl text-black max-md:text-4xl max-md:mb-4">
    <h2 className="text-4xl max-md:text-3xl">{review.name}</h2>
    <p className="mt-4 text-2xl max-md:text-xl">{review.review}</p>
  </article>
);

export default ReviewItem;
