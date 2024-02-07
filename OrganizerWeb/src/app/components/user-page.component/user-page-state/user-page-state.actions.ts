import { createAction, props } from '@ngrx/store'

export const loadUser = createAction('[User Page] Load User');
export const loadUserSuccess = createAction('[User Page] Load User Success', props<{ User: any }>());
export const loadUserError = createAction('[User Page] Load User Error');

export const saveUser = createAction('[User Page] Save User', props<{ User: any }>());
export const saveUserSuccess = createAction('[User Page] Save User Success');
export const saveUserError = createAction('[User Page] Save User Error');

export const loadUserByAdmin = createAction('[User Page] Load User By Admin', props<{ ugid: any }>());
export const loadUserByAdminSuccess = createAction('[User Page] Load User ByA dmin  Success', props<{ User: any }>());
export const loadUserByAdminError = createAction('[User Page] Load User By Admin  Error');
