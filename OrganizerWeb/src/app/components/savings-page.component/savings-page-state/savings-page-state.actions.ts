import { createAction, props } from '@ngrx/store'

export const loadSavings = createAction('[Savings Page] Load Savings');
export const loadSavingsSuccess = createAction('[Savings Page] Load Savings Success', props<{ savings: any }>());
export const loadSavingsError = createAction('[Savings Page] Load Savings Error', props<{ error: any }>());

export const loadCustomSavings = createAction('[Savings Page] Load Custom Savings');

export const saveSaving = createAction('[Savings Page] Save Savings', props<{ saving: any }>());
export const saveSavingSuccess = createAction('[Savings Page] Save Savings Success', props<{ saving: any }>());
export const saveSavingError = createAction('[Savings Page] Save Savings Error', props<{ error: any }>());

export const deleteSaving = createAction('[Savings Page] Delete Savings', props<{ sGID: any }>());
export const deleteSavingSuccess = createAction('[Savings Page] Delete Savings Success', props<{ sGID: any }>());
export const deleteSavingError = createAction('[Savings Page] Delete Savings Error', props<{ error: any }>());