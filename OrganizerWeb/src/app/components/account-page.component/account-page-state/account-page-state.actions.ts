import { createAction, props } from '@ngrx/store'

export const RegisterUser = createAction('[Account Page] RegisterU ser', props<{ user: any }>());
export const RegisterUserSuccess = createAction('[Account Page] Register User Success');
export const RegisterUserError = createAction('[Account Page] Register User Error');