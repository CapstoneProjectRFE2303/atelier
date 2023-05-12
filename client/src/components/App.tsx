import { FC } from 'react';
import { Route, BrowserRouter as Router, Routes, useParams } from 'react-router-dom';

import { ProductProvider } from './context/ProductContext';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';

export const App: FC = () => {
  const { productId } = useParams<{ productId: string }>();

  return (
    <div>
      <Router>
        <ProductProvider productId={productId || ''}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route
              path='/products/:productId/*'
              element={<ProductDetailPage />}
            />
          </Routes>
        </ProductProvider>
      </Router>
    </div>
  );
};
