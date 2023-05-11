import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { ProductDetail } from '../ProductDetail/ProductDetail';

export const ProductDetailPage: FC = () => {
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
