import { createAction, props } from '@ngrx/store'

export const loadUsers = createAction('[Users Page] Load Users');
export const loadUsersSuccess = createAction('[Users Page] Load Users Success', props<{ Users: any }>());
export const loadUsersError = createAction('[Users Page] Load Users Error', props<{ error: any }>());

export const deleteUser = createAction('[Users Page] Delete User', props<{ ugid: string }>());
export const deleteUserSuccess = createAction('[Users Page] Delete User Success', props<{ ugid: string }>());
export const deleteUserError = createAction('[Users Page] Delete User Error', props<{ error: any }>());

export const updatePaginationData = createAction('[Users Page] Update Pagination Data', props<{ PaginationData: any }>());

export const cleanState = createAction('[Users Page] Clean State');