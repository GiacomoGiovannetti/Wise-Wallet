import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    authentication: (state, action) => {
      switch (action.payload.type) {
        case 'LOGIN':
          return { user: action.payload.content };
        case 'LOGOUT':
          return { user: null };
        default:
          return state;
      }
    },
  },
});

export const { authentication } = authSlice.actions;

export const authReducer = authSlice.reducer;
