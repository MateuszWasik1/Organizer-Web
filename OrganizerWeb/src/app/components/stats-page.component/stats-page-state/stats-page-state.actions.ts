import { createAction, props } from '@ngrx/store'

export const loadSavingBarChartStats = createAction('[Stats Page] Load Saving Bar Chart Stats');
export const loadTaskSpendedMoneyBarChartStats = createAction('[Stats Page] Load Task Spended Money Bar Chart Stats');

export const loadStatsSuccess = createAction('[Stats Page] Load Stats Success', props<{ Result: any }>());
export const loadStatsError = createAction('[Stats Page] Load Stats Error');

export const loadCustomStats = createAction('[Stats Page] Load Custom Stats');

export const changeStartDateFilter = createAction('[Stats Page] Change Start Date Filter', props<{ startDate: any }>());
export const changeEndDateFilter = createAction('[Stats Page] Change End Date Filter', props<{ endDate: any }>());
export const changeDataTypeFilter = createAction('[Stats Page] Change Data Typ eFilter', props<{ dataType: any }>());