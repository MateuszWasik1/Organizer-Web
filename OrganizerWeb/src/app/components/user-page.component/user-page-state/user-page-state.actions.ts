import { createAction, props } from '@ngrx/store'

export const loadUser = createAction('[User Page] Load User');
export const loadUserSuccess = createAction('[User Page] Load User Success', props<{ Categories: any }>());
export const loadUserError = createAction('[User Page] Load User Error');

export const saveUser = createAction('[User Page] Save User', props<{ category: any }>());
export const saveUserSuccess = createAction('[User Page] Save User Success', props<{ category: any }>());
export const saveUserError = createAction('[User Page] Save User Error');