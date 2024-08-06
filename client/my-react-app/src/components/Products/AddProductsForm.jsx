import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  stock: Yup.number().required('Stock is required').integer('Stock must be an integer'),
  imageUrl: Yup.string().url('Invalid URL').required('Image URL is required'),
});

const FormInput = ({ name, label, type, value, onChange, onBlur, error }) => (
  <div className="mt-12 max-md:mt-10">
    <label htmlFor={name} className="sr-only">{label}</label>
    {type === 'textarea' ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`px-8 py-7 w-[781px] max-w-full text-3xl text-black rounded-3xl bg-zinc-300 max-md:px-5 ${error ? 'border-red-500' : ''}`}
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
        className={`px-8 py-8 w-[781px] max-w-full text-3xl text-black whitespace-nowrap rounded-3xl bg-zinc-300 max-md:px-5 ${error ? 'border-red-500' : ''}`}
        placeholder={label}
      />
    )}
    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
  </div>
);

const AddProductsForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      stock: '',
      imageUrl: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
        className="px-16 py-7 mt-14 ml-10 max-w-full text-3xl text-center text-white bg-slate-600 rounded-[29px] w-[356px] max-md:px-5 max-md:mt-10"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductsForm;
