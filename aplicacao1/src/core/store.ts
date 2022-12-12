import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { layoutReducer } from './reducers/layout.reducer';

export const rootReducer = combineReducers({
  layout: layoutReducer,
});

export function createApplicationStore() {
  return configureStore({
    devTools: { name: 'poc-vite-react-antd-ts' },
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
}

export const store = createApplicationStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
