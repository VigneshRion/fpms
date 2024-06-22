import { createAction, props } from '@ngrx/store';

export const register = createAction(
  '[Auth] Register',
  props<{ email: string; password: string }>()
);
export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ token: string }>()
);

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const loadToken = createAction('[Auth] Load Token');
export const loadTokenSuccess = createAction(
  '[Auth] Load Token Success',
  props<{ token: string }>()
);

export const logout = createAction('[Auth] Logout');
