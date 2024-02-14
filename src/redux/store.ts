import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './authSlice';

interface RootState {
  auth: ReturnType<typeof authReducer>;
  // other slices...
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    // other slices...
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
