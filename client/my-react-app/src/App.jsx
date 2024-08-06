import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProductFormPage from './pages/AddProductPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddProductFormPage />} />
      </Routes>
    </Router>
  );
};

export default App;
