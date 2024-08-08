import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useAuth } from '../Auth/AuthContext'; // Adjust the import path as necessary

const ReviewForm = () => {
  const { authToken } = useAuth(); // Access authentication token

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch('http://localhost:5000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`, // Include token in request headers
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Reset form after successful submission
      resetForm();
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review.');
    }
  };

  return (
    <Formik
      initialValues={{ title: '', body: '' }}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange }) => (
        <Form className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch my-auto text-5xl text-black whitespace-nowrap max-md:mt-10 max-md:max-w-full max-md:text-4xl">
            <label htmlFor="title" className="sr-only">Review Title</label>
            <Field
              id="title"
              name="title"
              type="text"
              className="px-8 py-6 rounded-3xl bg-zinc-300 max-md:px-5 max-md:max-w-full max-md:text-4xl"
              placeholder="Title"
            />
            <label htmlFor="body" className="sr-only">Review Body</label>
            <Field
              id="body"
              name="body"
              as="textarea"
              className="px-8 pt-10 pb-40 mt-16 bg-zinc-300 rounded-[36px] max-md:px-5 max-md:pb-28 max-md:mt-10 max-md:max-w-full max-md:text-4xl"
              placeholder="Body"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ReviewForm;
