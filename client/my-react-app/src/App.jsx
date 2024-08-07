import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProductFormPage from './pages/AddProductPage';
import HomePage from './pages/HomePage';
import OrderListPage from './pages/OrderListPage';
import ProductPage from './pages/ProductPage';
import ReviewPage from './pages/ReviewFormPage';
import ReviewListPage from './pages/ReviewListPage';
import ShopPage from './pages/ShopPage';
import LoginFormPage from './pages/LoginPage';
import ServiceList from './components/Services/ServiceList';
import ServiceAppointmentPage from './pages/ServiceAppointmentsPage'; // Ensure the correct path
import UserDashboardPage from './pages/UserDashboardPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/add-product" element={<AddProductFormPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/orders" element={<OrderListPage />} />
        <Route path="/product-name" element={<ProductPage />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/all-reviews" element={<ReviewListPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/login" element={<LoginFormPage />} />
        <Route path="/servicing" element={<ServiceList />} />
        <Route path="/service-appointment" element={<ServiceAppointmentPage />} />
        <Route path='dashboard' element={<UserDashboardPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;