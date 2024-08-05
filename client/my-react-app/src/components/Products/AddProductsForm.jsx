import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './AddProductForm.css';

const AddProductForm = () => {
    const initialValues = {
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        created_at: new Date().toISOString()
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        price: Yup.number().required('Required').positive('Price must be a positive number'),
        stock_quantity: Yup.number().required('Required').positive('Quantity must be a positive number')
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        // Submit form data to the API
        fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(response => response.json())
          .then(data => {
              // Handle success or error
              setSubmitting(false);
              resetForm();
          });
    };

    return (
        <div className="add-product-form">
            <h1>Add Product</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <label htmlFor="name">Name:</label>
                        <Field type="text" name="name" />
                        <ErrorMessage name="name" component="div" className="error" />

                        <label htmlFor="description">Description:</label>
                        <Field as="textarea" name="description" />
                        <ErrorMessage name="description" component="div" className="error" />

                        <label htmlFor="price">Price:</label>
                        <Field type="number" name="price" />
                        <ErrorMessage name="price" component="div" className="error" />

                        <label htmlFor="stock_quantity">Stock Quantity:</label>
                        <Field type="number" name="stock_quantity" />
                        <ErrorMessage name="stock_quantity" component="div" className="error" />

                        <button type="submit" disabled={isSubmitting}>Add Product</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddProductForm;
