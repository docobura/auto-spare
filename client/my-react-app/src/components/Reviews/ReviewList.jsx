import React from 'react';
import ReviewItem from './ReviewItem'; // Adjust the import path as needed

const ReviewList = ({ reviews }) => {
  return (
    <div className="flex flex-col w-full">
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <ReviewItem
            key={index}
            name={review.name}
            description={review.description}
          />
        ))
      ) : (
        <p className="text-lg text-center">No reviews available.</p>
      )}
    </div>
  );
};

export default ReviewList;
