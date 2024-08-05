import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Adjust this path if needed
import ServiceList from './components/Services/ServiceList';
import ServiceAppointmentPage from './pages/ServiceAppointmentsPage'; // Ensure the correct path

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/servicing" element={<ServiceList />} />
        <Route path="/service-appointment" element={<ServiceAppointmentPage />} />
      </Routes>
    </Router>
  );
};

export default App;
