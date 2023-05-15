import { act, renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '../app/store';
import {
  productAnswersData,
  productCartData,
  productDetailsData,
  productQuestionsData,
  productRelatedData,
  productReviewMetadataData,
  productReviewsData,
  productStylesData,
  productsData,
  testAnswerData,
  testCartItemData,
  testQuestionData,
  testReviewData,
} from '../utils/test-data';
import {
  useAddAnswerMutation,
  useAddQuestionMutation,
  useAddReviewMutation,
  useAddToCartMutation,
  useGetAnswersQuery,
  useGetCartQuery,
  useGetProductDetailsQuery,
  useGetProductStylesQuery,
  useGetProductsQuery,
  useGetQuestionsQuery,
  useGetRelatedProductsQuery,
  useGetReviewsMetadataQuery,
  useGetReviewsQuery,
  useMarkAnswerHelpfulMutation,
  useMarkQuestionHelpfulMutation,
  useReportAnswerMutation,
  useReportQuestionMutation,
} from './api';

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('Product Detail API', () => {
  const productId = 37312;
  const questionId = 640799;
  const answerId = 5992076;

  test('useGetProductsQuery hook should return products', async() => {
    const { result } = renderHook(() => useGetProductsQuery({}), { wrapper });

    await waitFor(() => {
      expect(result.current.isFetching).toEqual(false);
    });

    expect(result.current.data).toEqual(productsData);
  });

  test('useGetProductDetailsQuery hook should return product details', async() => {
    const { result } = renderHook(() => useGetProductDetailsQuery(productId), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isFetching).toEqual(false);
    });

    expect(result.current.data).toEqual(productDetailsData);
  });

  test('useGetProductStylesQuery hook should return product styles', async() => {
    const { result } = renderHook(() => useGetProductStylesQuery(productId), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isFetching).toEqual(false);
    });

    expect(result.current.data).toEqual(productStylesData);
  });

  test('useGetRelatedProductsQuery hook should return related products', async() => {
    const { result } = renderHook(() => useGetRelatedProductsQuery(productId), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isFetching).toEqual(false);
    });

    expect(result.current.data).toEqual(productRelatedData);
  });

  test('useGetReviewsQuery hook should return reviews', async() => {
    const { result } = renderHook(
      () => useGetReviewsQuery({ productId: productId }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isFetching).toEqual(false);
    });

    expect(result.current.data).toEqual(productReviewsData);
  });

  test('useGetReviewsMetadataQuery hook should return reviews metadata', async() => {
    const { result } = renderHook(() => useGetReviewsMetadataQuery(productId), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isFetching).toEqual(false);
    });

    expect(result.current.data).toEqual(productReviewMetadataData);
  });

  test('useGetQuestionsQuery hook should return questions', async() => {
    const { result } = renderHook(
      () => useGetQuestionsQuery({ productId: productId }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isFetching).toEqual(false);
    });

    expect(result.current.data).toEqual(productQuestionsData);
  });

  test('useGetAnswersQuery', async() => {
    const { result } = renderHook(
      () => useGetAnswersQuery({ questionId: questionId }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isFetching).toEqual(false);
    });

    expect(result.current.data).toEqual(productAnswersData);
  });

  test('useGetCartQuery', async() => {
    const { result } = renderHook(() => useGetCartQuery(), { wrapper });

    await waitFor(() => {
      expect(result.current.isFetching).toEqual(false);
    });

    expect(result.current.data).toEqual(productCartData);
  });

  test('useAddQuestionMutation should add a question', async() => {
    const { result } = renderHook(() => useAddQuestionMutation(), { wrapper });

    await waitFor(() => {
      expect(result.current[1].isLoading).toEqual(false);
    });

    await act(async() => {
      await result.current[0](testQuestionData);
    });

    expect(result.current[1].data).toEqual({ message: 'Created' });
  });

  test('useAddAnswerMutation should add an answer', async() => {
    const { result } = renderHook(() => useAddAnswerMutation(), { wrapper });

    await waitFor(() => {
      expect(result.current[1].isLoading).toEqual(false);
    });

    await act(async() => {
      await result.current[0](testAnswerData);
    });

    expect(result.current[1].data).toEqual({ message: 'Created' });
  });

  test('useMarkQuestionHelpfulMutation should mark a question as helpful', async() => {
    const { result } = renderHook(() => useMarkQuestionHelpfulMutation(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current[1].isLoading).toEqual(false);
    });

    await act(async() => {
      await result.current[0](questionId);
    });

    expect(result.current[1].data).toBeNull();
  });

  test('useReportQuestionMutation should report a question', async() => {
    const { result } = renderHook(() => useReportQuestionMutation(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current[1].isLoading).toEqual(false);
    });

    await act(async() => {
      await result.current[0](questionId);
    });

    expect(result.current[1].data).toBeNull();
  });

  test('useMarkAnswerHelpfulMutation should mark an answer as helpful', async() => {
    const { result } = renderHook(() => useMarkAnswerHelpfulMutation(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current[1].isLoading).toEqual(false);
    });

    await act(async() => {
      await result.current[0](answerId);
    });

    expect(result.current[1].data).toBeNull();
  });

  test('useReportAnswerMutation should report an answer', async() => {
    const { result } = renderHook(() => useReportAnswerMutation(), { wrapper });

    await waitFor(() => {
      expect(result.current[1].isLoading).toEqual(false);
    });

    await act(async() => {
      await result.current[0](answerId);
    });

    expect(result.current[1].data).toBeNull();
  });

  test('useAddReviewMutation should add a review', async() => {
    const { result } = renderHook(() => useAddReviewMutation(), { wrapper });

    await waitFor(() => {
      expect(result.current[1].isLoading).toEqual(false);
    });

    await act(async() => {
      await result.current[0](testReviewData);
    });

    expect(result.current[1].data).toEqual({ message: 'Created' });
  });

  test('useAddToCartMutation should add an item to the cart', async() => {
    const { result } = renderHook(() => useAddToCartMutation(), { wrapper });

    await waitFor(() => {
      expect(result.current[1].isLoading).toEqual(false);
    });

    await act(async() => {
      await result.current[0](testCartItemData);
    });

    expect(result.current[1].data).toEqual({ message: 'Created' });
  });
});
