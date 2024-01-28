import { createAction, props } from '@ngrx/store'

export const RegisterUser = createAction('[Account Page] Register User', props<{ user: any }>());
export const RegisterUserSuccess = createAction('[Account Page] Register User Success');
export const RegisterUserError = createAction('[Account Page] Register User Error');

export const Login = createAction('[Account Page] Login', props<{ user: any }>());
export const LoginSuccess = createAction('[Account Page] Login Success');
export const LoginError = createAction('[Account Page] Login Error');