import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/products/:productId/*'
            element={<ProductDetailPage />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
