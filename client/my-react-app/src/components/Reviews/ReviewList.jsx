import React from 'react';
import ReviewItem from './ReviewItem';

const ReviewList = ({ reviews }) => {
  return (
    <section className="flex flex-col items-center gap-5">
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))
      ) : (
        <p className="text-white">No reviews available.</p>
      )}
    </section>
  );
};

export default ReviewList;
