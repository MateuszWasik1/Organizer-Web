import { createAction, props } from '@ngrx/store'

export const loadBugs = createAction('[Bugs Page] Load Bugs');
export const loadBugsSuccess = createAction('[Bugs Page] Load Bugs Success', props<{ Bugs: any }>());
export const loadBugsError = createAction('[Bugs Page] Load Bugs Error');

export const loadBug = createAction('[Bugs Page] Load Bug', props<{ bgid: any }>());
export const loadBugSuccess = createAction('[Bugs Page] Load Bug Success', props<{ Bug: any }>());
export const loadBugError = createAction('[Bugs Page] Load Bug Error');

export const loadBugNotes = createAction('[Bugs Page] Load Bug Notes', props<{ bgid: any }>());
export const loadBugNotesSuccess = createAction('[Bugs Page] Load Bug Notes Success', props<{ BugNotes: any }>());
export const loadBugNotesError = createAction('[Bugs Page] Load Bug Notes Error');

export const saveBug = createAction('[Bugs Page] Save Bug', props<{ bug: any }>());
export const saveBugSuccess = createAction('[Bugs Page] Save Bug Success', props<{ bug: any }>());
export const saveBugError = createAction('[Bugs Page] Save Bug Error');

export const changeBugStatus = createAction('[Bugs Page] Change Bug Status', props<{ model: any }>());
export const changeBugStatusSuccess = createAction('[Bugs Page] Change Bug Status Success', props<{ status: any }>());
export const changeBugStatusError = createAction('[Bugs Page] Change Bug Status Error');

// export const changeDateFilter = createAction('[Categories Page] Save Categories Error', props<{ date: any }>());