import { FC } from 'react';

import { ProductOverview } from './ProductOverview/ProductOverview';
import { QuestionsAndAnswers } from './QuestionsAndAnswers/QuestionsAndAnswers';
import { RatingsAndReviews } from './RatingsAndReviews/RatingsAndReviews';
import { RelatedItemsAndOutfitCreation } from './RelatedItemsAndOutfitCreation/RelatedItemsAndOutfitCreation';

export const ProductDetail: FC = () => {
  return (
    <div data-testid='product-detail'>
      <ProductOverview />
      <QuestionsAndAnswers />
      <RatingsAndReviews />
      <RelatedItemsAndOutfitCreation />
    </div>
  );
};
