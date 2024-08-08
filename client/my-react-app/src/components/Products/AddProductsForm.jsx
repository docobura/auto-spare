import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../Auth/AuthContext'; // Adjust the import path as necessary

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  stock: Yup.number().required('Stock is required').integer('Stock must be an integer'),
  imageUrl: Yup.string().url('Invalid URL').required('Image URL is required'),
});

const FormInput = ({ name, label, type, value, onChange, onBlur, error }) => (
  <div className="mt-6 max-md:mt-4">
    <label htmlFor={name} className="sr-only">{label}</label>
    {type === 'textarea' ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`px-4 py-3 w-full text-base text-black rounded-lg bg-zinc-300 max-md:px-2 ${error ? 'border-red-500' : ''}`}
        placeholder={label}
        rows="3"
      />
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`px-4 py-3 w-full text-base text-black rounded-lg bg-zinc-300 max-md:px-2 ${error ? 'border-red-500' : ''}`}
        placeholder={label}
      />
    )}
    {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
  </div>
);

const AddProductsForm = () => {
  const { authToken } = useAuth(); // Access authentication token
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      stock: '',
      imageUrl: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('/api/products', {
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

        const data = await response.json();
        console.log('Product added:', data);
      } catch (error) {
        console.error('Error adding product:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      {['name', 'description', 'price', 'stock', 'imageUrl'].map((field, index) => (
        <FormInput
          key={index}
          name={field}
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          type={field === 'description' ? 'textarea' : field === 'price' || field === 'stock' ? 'number' : 'text'}
          value={formik.values[field]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched[field] && formik.errors[field]}
        />
      ))}
      <button
        type="submit"
        className="px-8 py-4 mt-6 mx-auto text-lg text-center text-white bg-slate-600 rounded-lg w-full max-w-xs max-md:px-4 max-md:py-2 max-md:mt-4"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductsForm;
