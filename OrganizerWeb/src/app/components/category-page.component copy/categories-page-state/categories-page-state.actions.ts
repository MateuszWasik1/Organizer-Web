import { createAction, props } from '@ngrx/store'

export const loadCategories = createAction('[Categories Page] Load Categories');
export const loadCategoriesSuccess = createAction('[Categories Page] Load Categories Success', props<{ Categories: any }>());
export const loadCategoriesError = createAction('[Categories Page] Load Categories Error');

export const saveCategory = createAction('[Categories Page] Save Categories', props<{ category: any }>());
export const saveCategorySuccess = createAction('[Categories Page] Save Categories Success', props<{ category: any }>());
export const saveCategoryError = createAction('[Categories Page] Save Categories Error');

export const deleteCategory = createAction('[Categories Page] Delete Categories', props<{ cGID: any }>());
export const deleteCategorySuccess = createAction('[Categories Page] Delete Categories Success', props<{ cGID: any }>());
export const deleteCategoryError = createAction('[Categories Page] Delete Categories Error');

export const changeDateFilter = createAction('[Categories Page] Save Categories Error', props<{ date: any }>());