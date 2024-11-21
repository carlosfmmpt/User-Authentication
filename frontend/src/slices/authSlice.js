import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false, // El estado inicial indica que no hay sesión activa
  user: false,
  token: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated=true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null; // Limpiar error al hacer logout
    },
    logout: (state) => {
      state.isAuthenticated=false;
      state.user = null;
      state.token = null;
      state.error = null; // Limpiar error al hacer logout
    },
    setError: (state, action) => {
      state.error = action.payload; // Establecer el mensaje de error
    },
    
  },
});

export const { loginSuccess, logout, setError } = authSlice.actions;
export default authSlice.reducer;



