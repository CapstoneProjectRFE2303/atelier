import { NavLink } from 'react-router-dom';
import { ProductDetail } from '../ProductDetail/ProductDetail';

export const ProductDetailPage = () => {
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
