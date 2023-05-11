import { FC } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';

export const App: FC = () => {
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
