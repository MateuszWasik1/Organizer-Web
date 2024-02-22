import { createAction, props } from '@ngrx/store'

export const loadBugs = createAction('[Bugs Page] Load Bugs');
export const loadBugsSuccess = createAction('[Bugs Page] Load Bugs Success', props<{ Bugs: any }>());
export const loadBugsError = createAction('[Bugs Page] Load Bugs Error');

export const loadBug = createAction('[Bugs Page] Load Bug', props<{ bgid: any }>());
export const loadBugSuccess = createAction('[Bugs Page] Load Bug Success', props<{ Bug: any }>());
export const loadBugError = createAction('[Bugs Page] Load Bug Error');

// export const saveCategory = createAction('[Categories Page] Save Categories', props<{ category: any }>());
// export const saveCategorySuccess = createAction('[Categories Page] Save Categories Success', props<{ category: any }>());
// export const saveCategoryError = createAction('[Categories Page] Save Categories Error');

// export const changeDateFilter = createAction('[Categories Page] Save Categories Error', props<{ date: any }>());