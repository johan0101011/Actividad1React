import { createAsyncThunk } from '@reduxjs/toolkit';
import { authenticateUser } from '../services/authService';
import { loginStart, loginSuccess, loginFailure } from './authSlice';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(loginStart());
      const user = await authenticateUser(credentials);
      if (user) {
        dispatch(loginSuccess(user));
        return user;
      } else {
        const errorMessage = 'Credenciales inválidas';
        dispatch(loginFailure(errorMessage));
        return rejectWithValue(errorMessage);
      }
    } catch (error) {
      const errorMessage = error.message || 'Error en la autenticación';
      dispatch(loginFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);
