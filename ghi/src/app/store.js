import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import searchReducer from './searchSlice';
import { movieApi } from './apiSlice';


export const store = configureStore({
  reducer: {
    search: searchReducer,
    [movieApi.reducerPath]: movieApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieApi.middleware)
})

setupListeners(store.dispatch)