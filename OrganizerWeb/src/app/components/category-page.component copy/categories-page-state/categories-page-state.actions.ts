import { createAction, props } from '@ngrx/store'

export const loadCategory = createAction('[Categories Page] Load Category', props<{ CGID: any }>());
export const loadCategorySuccess = createAction('[Categories Page] Load Category Success', props<{ Category: any }>());
export const loadCategoryError = createAction('[Categories Page] Load Categoys Error', props<{ error: any }>());

export const loadCategories = createAction('[Categories Page] Load Categories');
export const loadCategoriesSuccess = createAction('[Categories Page] Load Categories Success', props<{ Categories: any }>());
export const loadCategoriesError = createAction('[Categories Page] Load Categories Error', props<{ error: any }>());

export const loadCustomCategories = createAction('[Categories Page] Load Custom Categories');

export const addCategory = createAction('[Categories Page] Add Categories', props<{ Category: any }>());
export const addCategorySuccess = createAction('[Categories Page] Add Categories Success');
export const addCategoryError = createAction('[Categories Page] Add Categories Error', props<{ error: any }>());

export const updateCategory = createAction('[Categories Page] Update Categories', props<{ Category: any }>());
export const updateCategorySuccess = createAction('[Categories Page] Update Categories Success');
export const updateCategoryError = createAction('[Categories Page] Update Categories Error', props<{ error: any }>());

export const deleteCategory = createAction('[Categories Page] Delete Categories', props<{ cGID: any }>());
export const deleteCategorySuccess = createAction('[Categories Page] Delete Categories Success', props<{ cGID: any }>());
export const deleteCategoryError = createAction('[Categories Page] Delete Categories Error', props<{ error: any }>());

export const changeDateFilter = createAction('[Categories Page] Save Categories Error', props<{ date: any }>());

export const cleanState = createAction('[Categories Page] Clean State');