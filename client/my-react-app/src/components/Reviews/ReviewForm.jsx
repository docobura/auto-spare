import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useAuth } from '../Auth/AuthContext';

const ReviewForm = () => {
  const { authToken } = useAuth();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch('http://localhost:5000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          title: values.title,
          body: values.body,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();  // Capture error response
        throw new Error(errorData.message || 'Network response was not ok');
      }

      resetForm();
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review: ' + error.message);
    }
  };

  return (
    <Formik
      initialValues={{ title: '', body: '' }}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange }) => (
        <Form className="flex flex-col w-11/12 max-w-lg mx-auto">
          <div className="flex flex-col gap-4 text-sm text-black max-md:mt-4">
            <label htmlFor="title" className="sr-only">Review Title</label>
            <Field
              id="title"
              name="title"
              type="text"
              className="px-4 py-2 rounded-md bg-zinc-300 text-sm max-md:px-3 max-md:py-1"
              placeholder="Title"
            />
            <label htmlFor="body" className="sr-only">Review Body</label>
            <Field
              id="body"
              name="body"
              as="textarea"
              className="px-4 py-2 rounded-md bg-zinc-300 text-sm max-md:px-3 max-md:py-1"
              placeholder="Body"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-2 text-lg text-white bg-slate-600 rounded-md hover:bg-slate-700"
          >
            Submit Review
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ReviewForm;
