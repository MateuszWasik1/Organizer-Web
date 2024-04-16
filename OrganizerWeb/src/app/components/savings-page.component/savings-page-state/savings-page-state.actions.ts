import { createAction, props } from '@ngrx/store'

export const loadSaving = createAction('[Savings Page] Load Saving', props<{ SGID: any }>());
export const loadSavingSuccess = createAction('[Savings Page] Load Saving Success', props<{ Saving: any }>());
export const loadSavingError = createAction('[Savings Page] Load Saving Error', props<{ error: any }>());

export const loadSavings = createAction('[Savings Page] Load Savings');
export const loadSavingsSuccess = createAction('[Savings Page] Load Savings Success', props<{ Savings: any }>());
export const loadSavingsError = createAction('[Savings Page] Load Savings Error', props<{ error: any }>());

export const loadCustomSavings = createAction('[Savings Page] Load Custom Savings');

export const addSaving = createAction('[Savings Page] Add Savings', props<{ Saving: any }>());
export const addSavingSuccess = createAction('[Savings Page] Add Savings Success', props<{ Saving: any }>());
export const addSavingError = createAction('[Savings Page] Add Savings Error', props<{ error: any }>());

export const updateSaving = createAction('[Savings Page] Update Savings', props<{ Saving: any }>());
export const updateSavingSuccess = createAction('[Savings Page] Update Savings Success', props<{ Saving: any }>());
export const updateSavingError = createAction('[Savings Page] Update Savings Error', props<{ error: any }>());

export const deleteSaving = createAction('[Savings Page] Delete Savings', props<{ SGID: any }>());
export const deleteSavingSuccess = createAction('[Savings Page] Delete Savings Success', props<{ SGID: any }>());
export const deleteSavingError = createAction('[Savings Page] Delete Savings Error', props<{ error: any }>());

export const updatePaginationData = createAction('[Savings Page] Update Pagination Data', props<{ PaginationData: any }>());

export const cleanState = createAction('[Savings Page] Clean State');