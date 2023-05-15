import { FC } from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { HomePage } from '../components/pages/HomePage';
import { ProductDetailPage } from '../components/pages/ProductDetailPage';
import { store } from './store';

export const App: FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/products/:productId/*'
            element={<ProductDetailPage />}
          />
        </Routes>
      </Router>
    </Provider>
  );
};
