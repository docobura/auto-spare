import React from 'react';

const ReviewItem = ({ name, description }) => {
  return (
    <article className="flex flex-col items-start p-10 mt-10 bg-zinc-300 rounded-[20px]">
      <h3 className="text-xl">{name}</h3>
      <hr className="self-stretch mt-8 border-black border-solid" />
      <p className="mt-5 text-lg">{description}</p>
    </article>
  );
};

export default ReviewItem;
