import { FC, ReactNode, createContext, useEffect, useState } from 'react';

import { validateImages } from '../../utils/validateImages';

interface Style {
  style_id: number;
  name: string;
  original_price: string;
  sale_price: string;
  default?: boolean;
  photos: { thumbnail_url: string; url: string }[];
  skus: { [skuId: string]: { quantity: number; size: string } };
}

interface Review {
  review_id: number;
  rating: number;
  summary: string;
  recommend: boolean;
  response: string | null;
  body: string;
  date: string;
  reviewer_name: string;
  helpfulness: number;
  photos: { id: number; url: string }[];
}

interface Answer {
  id: number;
  body: string;
  date: string;
  answerer_name: string;
  helpfulness: number;
  photos: { id: number; url: string }[];
}

interface Question {
  question_id: number;
  question_body: string;
  question_date: string;
  asker_name: string;
  question_helpfulness: number;
  reported: boolean;
  answers: { [answer_id: number]: Answer };
}

interface Product {
  id: number;
  campus: string;
  name: string;
  slogan: string;
  description: string;
  category: string;
  default_price: string;
  features: { feature: string; value: string | null }[];
  styles: Style[];
  relatedProducts: number[];
  reviews: Review[];
  reviewMetadata: {
    ratings: { [rating: number]: number };
    recommended: { [recommend: number]: number };
    characteristics: {
      [characteristic: string]: { id: number; value: string };
    };
  };
  questions: Question[];
}

interface ProductContextProps {
  productId: string;
  selectedProduct: Product | null;
  updateSelectedProduct?: (productId: string) => Promise<void>;
}

export const ProductContext = createContext<ProductContextProps>({
  productId: '',
  selectedProduct: null,
});

const fetchAllReviews = async(productId: string): Promise<Review[]> => {
  const allReviews: Review[] = [];

  let page = 1;
  const count = 150;

  const reviewIterator = async function* (): AsyncGenerator<Review[]> {
    while (true) {
      const response = await fetch(
        `/api/reviews?product_id=${productId}&page=${page}&count=${count}`);

      if (response.status !== 200) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
      const reviews = data.results;

      if (reviews.length === 0) {
        return;
      }

      yield reviews;

      page++;
    }
  };

  for await (const reviews of reviewIterator()) {
    allReviews.push(...reviews);
  }

  return allReviews;
};

const fetchAllQuestions = async(productId: string): Promise<Question[]> => {
  const allQuestions: Question[] = [];

  let page = 1;
  const count = 150;

  const questionIterator = async function* (): AsyncGenerator<Question[]> {
    while (true) {
      const response = await fetch(
        `/api/qa/questions?product_id=${productId}&page=${page}&count=${count}`);

      if (response.status !== 200) {
        throw new Error('Failed to fetch questions');
      }

      const data = await response.json();
      const questions = data.results;

      if (questions.length === 0) {
        return;
      }

      yield questions;

      page++;
    }
  };

  for await (const questions of questionIterator()) {
    allQuestions.push(...questions);
  }

  return allQuestions;
};

const fetchProductDetails = async(productId: string): Promise<Product> => {
  try {
    const productDetailsResponse = await fetch(
      `/api/products/${productId}`);
    const productDetailsData = await productDetailsResponse.json();

    const stylesResponse = await fetch(
      `/api/products/${productId}/styles`);
    const stylesData = await stylesResponse.json();
    stylesData.results = await Promise.all(
      stylesData.results.map(async(style: Style) => {
        const filteredPhotos = await validateImages(style.photos);
        return { ...style, photos: filteredPhotos };
      })
    );

    const relatedProductsResponse = await fetch(
      `/api/products/${productId}/related`);
    const relatedProductsData = await relatedProductsResponse.json();

    const reviewsData = await fetchAllReviews(productId);

    const reviewsMetadataResponse = await fetch(
      `/api/reviews/meta?product_id=${productId}`);
    let reviewsMetadataData = await reviewsMetadataResponse.json();

    reviewsMetadataData = {
      ratings: reviewsMetadataData.ratings,
      recommended: reviewsMetadataData.recommended,
      characteristics: reviewsMetadataData.characteristics,
    };

    const filteredPhotosReviews = await Promise.all(
      reviewsData.map(async(review: Review) => {
        const filteredPhotos = await validateImages(review.photos);
        return { ...review, photos: filteredPhotos };
      })
    );

    const questionsData = await fetchAllQuestions(productId);

    const filteredPhotosQuestions = await Promise.all(
      questionsData.map(async(question: Question) => {
        const filteredPhotosAnswers = await Promise.all(
          Object.values(question.answers).map(async(answer: Answer) => {
            const filteredPhotos = await validateImages(answer.photos);
            return { ...answer, photos: filteredPhotos };
          })
        );
        return { ...question, answers: filteredPhotosAnswers };
      })
    );

    const product: Product = {
      ...productDetailsData,
      styles: stylesData.results,
      relatedProducts: Array.from(new Set(relatedProductsData)),
      reviews: filteredPhotosReviews,
      reviewMetadata: reviewsMetadataData,
      questions: filteredPhotosQuestions,
    };

    return product;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw new Error('Failed to fetch product details');
  }
};

export const ProductProvider: FC<{
  productId: string;
  children: ReactNode;
}> = ({ productId, children }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const updateSelectedProduct = async(productId: string) => {
    if (!productId) {
      return;
    }

    try {
      const product = await fetchProductDetails(productId);
      setSelectedProduct(product);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  useEffect(() => {
    if (!productId) {
      return;
    }
    updateSelectedProduct(productId);
  }, [productId]);

  return (
    <ProductContext.Provider
      value={{
        productId,
        selectedProduct,
        updateSelectedProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
