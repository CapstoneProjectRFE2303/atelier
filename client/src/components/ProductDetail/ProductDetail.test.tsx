import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { ProductDetail, renderSection } from './ProductDetail';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ productId: '1' }),
  useLocation: () => ({
    pathname: '/products/1',
    search: '',
    hash: '',
    state: null,
    key: 'test',
  }),
}));

describe('ProductDetail', () => {
  let productOverviewRef;
  let questionsAndAnswersRef;
  let ratingsAndReviewsRef;
  let relatedItemsAndOutfitCreationRef;

  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    productOverviewRef = { current: { scrollIntoView: jest.fn() } };
    questionsAndAnswersRef = { current: { scrollIntoView: jest.fn() } };
    ratingsAndReviewsRef = { current: { scrollIntoView: jest.fn() } };
    relatedItemsAndOutfitCreationRef = { current: { scrollIntoView: jest.fn() } };

    jest.spyOn(React, 'useRef').mockReturnValueOnce(productOverviewRef);
    jest.spyOn(React, 'useRef').mockReturnValueOnce(questionsAndAnswersRef);
    jest.spyOn(React, 'useRef').mockReturnValueOnce(ratingsAndReviewsRef);
    jest.spyOn(React, 'useRef').mockReturnValueOnce(relatedItemsAndOutfitCreationRef);
  });

  test('renders product detail component', async() => {
    await act(async() => {
      render(<ProductDetail />);
    });

    expect(screen.getByTestId('product-detail')).toBeInTheDocument();
  });

  test('returns correct section for given pathname', () => {
    expect(renderSection('/products/1/questions-and-answers')).toEqual('questions-and-answers');
    expect(renderSection('/products/1/ratings-and-reviews')).toEqual('ratings-and-reviews');
    expect(renderSection('/products/1/related-items-and-outfit-creation')).toEqual('related-items-and-outfit-creation');
    expect(renderSection('/products/2')).toEqual('product-overview');
    expect(renderSection('/products')).toEqual('product-overview');
    expect(renderSection('/')).toEqual('product-overview');
  });

  test('scrolls into view when clicking the overview button', async() => {
    await act(async() => {
      render(<ProductDetail />);
    });

    await act(async() => {
      fireEvent.click(screen.getByText('Product Overview'));
    });

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  test('scrolls into view when clicking the questions and answers button', async() => {
    await act(async() => {
      render(<ProductDetail />);
    });

    await act(async() => {
      fireEvent.click(screen.getByText('Questions and Answers'));
    });

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  test('scrolls into view when clicking the ratings and reviews button', async() => {
    await act(async() => {
      render(<ProductDetail />);
    });

    await act(async() => {
      fireEvent.click(screen.getByText('Ratings and Reviews'));
    });

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  test('scrolls into view when clicking the related items and outfit creation button', async() => {
    await act(async() => {
      render(<ProductDetail />);
    });

    await act(async() => {
      fireEvent.click(
        screen.getByText('Related Items and Outfit Creation')
      );
    });

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });
});
