import { createAction, props } from '@ngrx/store'

export const loadSavingBarChartStats = createAction('[Stats Page] Load Saving Bar Chart Stats');
export const loadTaskSpendedMoneyBarChartStats = createAction('[Stats Page] Load Task Spended Money Bar Chart Stats');
export const loadCategorySpendedMoneyBarChartStats = createAction('[Stats Page] Load Category Spended Money Bar Chart Stats');

export const loadStatsSuccess = createAction('[Stats Page] Load Stats Success', props<{ Result: any }>());
export const loadStatsError = createAction('[Stats Page] Load Stats Error', props<{ error: any }>());

export const loadCategories = createAction('[Stats Page] Load Categories');
export const loadCategoriesSuccess = createAction('[Stats Page] Load Categories Success', props<{ Categories: any }>());
export const loadCategoriesError = createAction('[Stats Page] Load Categories Error', props<{ error: any }>());

export const loadCustomStats = createAction('[Stats Page] Load Custom Stats');

export const changeStartDateFilter = createAction('[Stats Page] Change Start Date Filter', props<{ startDate: any }>());
export const changeEndDateFilter = createAction('[Stats Page] Change End Date Filter', props<{ endDate: any }>());
export const changeDataTypeFilter = createAction('[Stats Page] Change Data Type Filter', props<{ dataType: any }>());
export const changeCategoryFilter = createAction('[Stats Page] Change Category Filter', props<{ category: any }>());