import { createAction, props } from '@ngrx/store'

export const loadCategories = createAction('[Categories Page] Load Categories');
export const loadCategoriesSuccess = createAction('[Categories Page] Load Categories Success', props<{ Categories: any }>());
export const loadCategoriesError = createAction('[Categories Page] Load Categories Error');

export const saveCategory = createAction('[Categories Page] Save Categories', props<{ category: any }>());
export const saveCategorySuccess = createAction('Categoriesh Page] Save Categories Success', props<{ category: any }>());
export const saveCategoryError = createAction('[Categories Page] Save Categories Error');

export const changeDateFilter = createAction('[Categories Page] Save Categories Error', props<{ date: any }>());