import { FC, useContext, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { ProductContext } from '../context/ProductContext';
import { ProductDetail } from '../ProductDetail/ProductDetail';

export const ProductDetailPage: FC = () => {
  const { productId } = useParams<{ productId: string; }>();
  const { selectedProduct, updateSelectedProduct } = useContext(ProductContext);

  useEffect(() => {
    if (!productId || !updateSelectedProduct) {
      return;
    }

    updateSelectedProduct(productId);
  }, [productId]);

  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <hr></hr>
      </nav>
      {selectedProduct && (
        <ProductDetail />
      )}
    </div>
  );
};
