import { createSlice } from '@reduxjs/toolkit';

// Check if there's a saved state in the session storage
const savedAuthState = JSON.parse(sessionStorage.getItem('authState'));

const authSlice = createSlice({
  name: 'auth',
  initialState: savedAuthState || {
    isAuthenticated: false,
    id: null,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.id = action.payload.id;
      state.user = action.payload.user;

      // Save the authentication state in session storage
      sessionStorage.setItem('authState', JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.id= null;
      state.user = null;

      // Clear the authentication state from session storage
      sessionStorage.removeItem('authState');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
