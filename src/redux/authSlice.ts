import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem('authToken') || null,
  isLoggedIn: Boolean(localStorage.getItem('authToken')),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('authToken', action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('authToken');
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectIsLoggedIn = (state: { auth: AuthState }) => state.auth.isLoggedIn;
export default authSlice.reducer;
