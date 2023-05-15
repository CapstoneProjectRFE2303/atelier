import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ProductDetailState {
  userCart: Record<string, number>;
  selectedProductId: number;
  selectedStyleId: number;
  selectedQuantity: number;
  selectedSize: string;
}

export const productDetailInitialState: ProductDetailState = {
  userCart: {},
  selectedProductId: 0,
  selectedStyleId: 0,
  selectedQuantity: 0,
  selectedSize: '',
};

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: productDetailInitialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<number>) => {
      const skuId = action.payload.toString();
      state.userCart = {
        ...state.userCart,
        [skuId]: (state.userCart[skuId] || 0) + 1,
      };
    },

    setSelectedProductId: (state, action: PayloadAction<number>) => {
      state.selectedProductId = action.payload;
    },

    setSelectedStyleId: (state, action: PayloadAction<number>) => {
      state.selectedStyleId = action.payload;
    },

    setSelectedQuantity: (state, action: PayloadAction<number>) => {
      state.selectedQuantity = action.payload;
    },

    setSelectedSize: (state, action: PayloadAction<string>) => {
      state.selectedSize = action.payload;
    },
  },
});

export const {
  addCartItem,
  setSelectedProductId,
  setSelectedStyleId,
  setSelectedQuantity,
  setSelectedSize,
} = productDetailSlice.actions;
