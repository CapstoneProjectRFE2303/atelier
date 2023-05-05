import React from 'react';

import { NavLink } from 'react-router-dom';
import ProductDetail from '../ProductDetail/ProductDetail.jsx';

const ProductDetailPage = () => {
  return (
    <div>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <hr></hr>
      </nav>
      <ProductDetail />
    </div>
  );
};

export default ProductDetailPage;
