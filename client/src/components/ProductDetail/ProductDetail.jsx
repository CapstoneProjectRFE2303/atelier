import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import ProductOverview from './ProductOverview/ProductOverview.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
import RelatedItemsAndOutfitCreation from './RelatedItemsAndOutfitCreation/RelatedItemsAndOutfitCreation.jsx';

const ProductDetail = () => {
  const location = useLocation();
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

  const renderSection = () => {
    const { pathname } = location;
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
        default:
          return 'product-overview';
      }
    }

    return 'product-overview';
  };

  useEffect(() => {
    switch (renderSection()) {
      case 'questions-and-answers':
        questionsAndAnswersRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'ratings-and-reviews':
        ratingsAndReviewsRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'related-items-and-outfit-creation':
        relatedItemsAndOutfitCreationRef.current.scrollIntoView({
          behavior: 'smooth',
        });
        break;
      default:
        productOverviewRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  }, []);

  return (
    <>
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
    </>
  );
};

export default ProductDetail;
