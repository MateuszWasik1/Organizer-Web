import { createAction, props } from '@ngrx/store'

export const loadUsers = createAction('[Users Page] Load Users');
export const loadUsersSuccess = createAction('[Users Page] Load Users Success', props<{ Users: any }>());
export const loadUsersError = createAction('[Users Page] Load Users Error');

export const loadUser = createAction('[Users Page] Load User');
export const loadUserSuccess = createAction('[Users Page] Load User Success', props<{ User: any }>());
export const loadUserError = createAction('[Users Page] Load User Error');