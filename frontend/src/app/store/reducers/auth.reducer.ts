import { createReducer, on } from '@ngrx/store';
import {
  registerSuccess,
  loginSuccess,
  loginFailure,
  loadTokenSuccess,
  logout,
} from '../actions/auth.action';

export interface AuthState {
  [x: string]: any;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(registerSuccess, (state, { token }) => ({
    ...state,
    token: token,
  })),
  on(loginSuccess, (state, { token }) => ({ ...state, token, error: null })),
  on(loginFailure, (state, { error }) => ({ ...state, error })),
  on(loadTokenSuccess, (state, { token }) => ({ ...state, token })),
  on(logout, () => initialState)
);
