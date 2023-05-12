import { act, render, screen } from '@testing-library/react';

import { ProductDetail } from './ProductDetail';

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
  test('renders product detail component', async() => {
    await act(async() => {
      render(<ProductDetail />);
    });

    expect(screen.getByTestId('product-detail')).toBeInTheDocument();
  });

  test('renders product overview component', async() => {
    await act(async() => {
      render(<ProductDetail />);
    });

    expect(screen.getByTestId('product-overview')).toBeInTheDocument();
  });

  test('renders questions and answers component', async() => {
    await act(async() => {
      render(<ProductDetail />);
    });

    expect(screen.getByTestId('questions-and-answers')).toBeInTheDocument();
  });

  test('renders ratings and reviews component', async() => {
    await act(async() => {
      render(<ProductDetail />);
    });

    expect(screen.getByTestId('ratings-and-reviews')).toBeInTheDocument();
  });

  test('renders related items and outfit creation component', async() => {
    await act(async() => {
      render(<ProductDetail />);
    });

    expect(screen.getByTestId('related-items-and-outfit-creation')).toBeInTheDocument();
  });
});
