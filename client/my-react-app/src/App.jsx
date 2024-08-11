import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext';
import AddProductFormPage from './pages/AddProductPage';
import HomePage from './pages/HomePage';
import OrderListPage from './pages/OrderListPage';
import ProductPage from './pages/ProductPage';
import ReviewPage from './pages/ReviewFormPage';
import ShopPage from './pages/ShopPage';
import LoginFormPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ServiceListContainer from './components/Services/ServiceListContainer';
import ServiceAppointmentPage from './pages/ServiceAppointmentsPage'; 
import UserDashboardPage from './pages/UserDashboardPage';
import AdminDashboard from './pages/AdminDashboardPage';
import CartPage from './pages/CartPage';
import MyReviewsPage from './pages/MyReviewsPage';
import MyOrdersPage from './pages/MyOrdersPage';

const App = () => {
  return (
    <AuthProvider> 
      <Router>
        <Routes>
          <Route path="/add-product" element={<AddProductFormPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/orders" element={<OrderListPage />} />
          <Route path="/parts/:id" element={<ProductPage />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/login" element={<LoginFormPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/servicing" element={<ServiceListContainer />} />
          <Route path="/service-appointment" element={<ServiceAppointmentPage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/my-reviews" element={<MyReviewsPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
