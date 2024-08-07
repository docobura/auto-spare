import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderListPage from './pages/OrderListPage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrderListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
