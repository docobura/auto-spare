import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './pages/SignupPage';
import LoginFormPage from './pages/LoginPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/" element={<LoginFormPage />} />
      </Routes>
    </Router>
  );
};

export default App;