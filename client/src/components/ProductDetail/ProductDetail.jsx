import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import ProductOverview from './ProductOverview/ProductOverview';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews';
import RelatedItemsAndOutfitCreation from './RelatedItemsAndOutfitCreation/RelatedItemsAndOutfitCreation';

export const renderSection = (pathname) => {
  const match = pathname.match(/\/products\/\d+\/(.+)/);

  if (match) {
    const section = match[1];

    switch (section) {
      case 'questions-and-answers':
        return 'questions-and-answers';
      case 'ratings-and-reviews':
        return 'ratings-and-reviews';
      case 'related-items-and-outfit-creation':
        return 'related-items-and-outfit-creation';
    }
  }

  return 'product-overview';
};

export const ProductDetail = () => {
  const { productId } = useParams();

  const productOverviewRef = useRef(null);
  const questionsAndAnswersRef = useRef(null);
  const ratingsAndReviewsRef = useRef(null);
  const relatedItemsAndOutfitCreationRef = useRef(null);

  const handleLinkClick = (event, ref) => {
    event.preventDefault();
    const path = event.target.href;
    window.history.pushState(null, '', path);
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div data-testid='product-detail'>
      <nav>
        <ul>
          <li>
            <a
              href={`/products/${productId}/product-overview`}
              onClick={(event) => handleLinkClick(event, productOverviewRef)}
            >
              Product Overview
            </a>
          </li>
          <li>
            <a
              href={`/products/${productId}/questions-and-answers`}
              onClick={(event) =>
                handleLinkClick(event, questionsAndAnswersRef)
              }
            >
              Questions and Answers
            </a>
          </li>
          <li>
            <a
              href={`/products/${productId}/ratings-and-reviews`}
              onClick={(event) => handleLinkClick(event, ratingsAndReviewsRef)}
            >
              Ratings and Reviews
            </a>
          </li>
          <li>
            <a
              href={`/products/${productId}/related-items-and-outfit-creation`}
              onClick={(event) =>
                handleLinkClick(event, relatedItemsAndOutfitCreationRef)
              }
            >
              Related Items and Outfit Creation
            </a>
          </li>
        </ul>
      </nav>

      <div>
        <div ref={productOverviewRef}>
          <ProductOverview />
        </div>
        <div ref={questionsAndAnswersRef}>
          <QuestionsAndAnswers />
        </div>
        <div ref={ratingsAndReviewsRef}>
          <RatingsAndReviews />
        </div>
        <div ref={relatedItemsAndOutfitCreationRef}>
          <RelatedItemsAndOutfitCreation />
        </div>
      </div>
    </div>
  );
};
