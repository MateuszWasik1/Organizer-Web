import { createAction, props } from '@ngrx/store'

export const loadUsers = createAction('[Users Page] Load Users');
export const loadUsersSuccess = createAction('[Users Page] Load Users Success', props<{ Users: any }>());
export const loadUsersError = createAction('[Users Page] Load Users Error', props<{ error: any }>());