import { addCartItem, productDetailSlice, setSelectedProductId, setSelectedQuantity, setSelectedSize, setSelectedStyleId } from './productDetailSlice';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ productId: '37312' }),
  useLocation: () => ({
    pathname: '/products/37312',
    search: '',
    hash: '',
    state: null,
    key: 'test',
  }),
}));

describe('productDetailSlice', () => {
  test('addCartItem should update userCart state', () => {
    const initialState = {
      userCart: {},
      selectedProductId: 0,
      selectedStyleId: 0,
      selectedQuantity: 0,
      selectedSize: '',
    };
    const payload = 12345;
    const nextState = productDetailSlice.reducer(initialState, addCartItem(payload));
    expect(nextState.userCart).toEqual({ 12345: 1 });
  });

  test('setSelectedProductId should update selectedProductId state', () => {
    const initialState = {
      userCart: {},
      selectedProductId: 0,
      selectedStyleId: 0,
      selectedQuantity: 0,
      selectedSize: '',
    };
    const payload = 12345;
    const nextState = productDetailSlice.reducer(initialState, setSelectedProductId(payload));
    expect(nextState.selectedProductId).toEqual(payload);
  });

  test('setSelectedStyleId should update selectedStyleId state', () => {
    const initialState = {
      userCart: {},
      selectedProductId: 0,
      selectedStyleId: 0,
      selectedQuantity: 0,
      selectedSize: '',
    };
    const payload = 12345;
    const nextState = productDetailSlice.reducer(initialState, setSelectedStyleId(payload));
    expect(nextState.selectedStyleId).toEqual(payload);
  });

  test('setSelectedQuantity should update selectedQuantity state', () => {
    const initialState = {
      userCart: {},
      selectedProductId: 0,
      selectedStyleId: 0,
      selectedQuantity: 0,
      selectedSize: '',
    };
    const payload = 12345;
    const nextState = productDetailSlice.reducer(initialState, setSelectedQuantity(payload));
    expect(nextState.selectedQuantity).toEqual(payload);
  });

  test('setSelectedSize should update selectedSize state', () => {
    const initialState = {
      userCart: {},
      selectedProductId: 0,
      selectedStyleId: 0,
      selectedQuantity: 0,
      selectedSize: '',
    };
    const payload = 'L';
    const nextState = productDetailSlice.reducer(initialState, setSelectedSize(payload));
    expect(nextState.selectedSize).toEqual(payload);
  });
});
