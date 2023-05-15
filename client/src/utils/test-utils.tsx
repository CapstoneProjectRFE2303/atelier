import type { AnyAction, Dispatch, Middleware, PreloadedState } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { api } from '../api/api';
import { RootState } from '../app/store';
import { productDetailSlice } from '../features/productDetail/productDetailSlice';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: ReturnType<typeof configureStore>;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        productDetail: productDetailSlice.reducer,
        [api.reducerPath]: api.reducer,
      },
      preloadedState,
      middleware: (getDefaultMiddleware) =>
        (getDefaultMiddleware() as Middleware<object, unknown, Dispatch<AnyAction>>[]).concat(
          api.middleware as Middleware<object, unknown, Dispatch<AnyAction>>
        ),
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{ children: ReactNode }>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
