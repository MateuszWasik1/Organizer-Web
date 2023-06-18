import { createAction, props } from '@ngrx/store'

export const loadCategories = createAction('[Categories Page] Load Categories');
export const loadCategoriesSuccess = createAction('Categoriesh Page] Load Categories Success', props<{ Categories: any }>());
export const loadCategoriesError = createAction('[Categories Page] Load Categories Error');