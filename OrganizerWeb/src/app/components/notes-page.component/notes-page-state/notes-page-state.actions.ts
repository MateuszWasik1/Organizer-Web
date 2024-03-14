import { createAction, props } from '@ngrx/store'

export const loadNote = createAction('[Notes Page] Load Note', props<{ NGID: any }>());
export const loadNoteSuccess = createAction('[Notes Page] Load Note Success', props<{ Note: any }>());
export const loadNoteError = createAction('[Notes Page] Load Note Error', props<{ error: any }>());

export const loadNotes = createAction('[Notes Page] Load Notes');
export const loadNotesSuccess = createAction('[Notes Page] Load Notes Success', props<{ Notes: any }>());
export const loadNotesError = createAction('[Notes Page] Load Notes Error', props<{ error: any }>());

export const addNote = createAction('[Notes Page] Add Note', props<{ Note: any }>());
export const addNoteSuccess = createAction('[Notes Page] Add Note Success');
export const addNoteError = createAction('[Notes Page] Add Note Error', props<{ error: any }>());

export const updateNote = createAction('[Notes Page] Update Note', props<{ Note: any }>());
export const updateNoteSuccess = createAction('[Notes Page] Update Note Success');
export const updateNoteError = createAction('[Notes Page] Update Note Error', props<{ error: any }>());

export const deleteNote = createAction('[Notes Page] Delete Note', props<{ NGID: any }>());
export const deleteNoteSuccess = createAction('[Notes Page] Delete Note Success', props<{ NGID: any }>());
export const deleteNoteError = createAction('[Notes Page] Delete Note Error', props<{ error: any }>());

export const cleanState = createAction('[Notes Page] Clean State');