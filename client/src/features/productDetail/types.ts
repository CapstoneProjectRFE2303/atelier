export interface Review {
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
  markedHelpful: boolean;
}

export interface Answer {
  id: number;
  body: string;
  date: string;
  answerer_name: string;
  helpfulness: number;
  photos: { id: number; url: string }[];
  reported: boolean;
  markedHelpful: boolean;
}

export interface Question {
  question_id: number;
  question_body: string;
  question_date: string;
  asker_name: string;
  question_helpfulness: number;
  reported: boolean;
  answers: { [answer_id: number]: Answer };
  markedHelpful: boolean;
}

export interface Style {
  style_id: number;
  name: string;
  original_price: string;
  sale_price: string;
  'default?': boolean;
  photos: { thumbnail_url: string; url: string }[];
  skus: { [skuId: string]: { quantity: number; size: string } };
}

export interface CartItem {
  [sku_id: number]: number;
}

export interface ReviewsMetadata {
  ratings: {
    [rating: number]: number;
  };
  recommended: {
    [recommend: number]: number;
  };
  characteristics: {
    [characteristic: string]: { id: number; value: string; };
  };
}

export interface Product {
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
  reviewMetadata: ReviewsMetadata;
  questions: Question[];
}
