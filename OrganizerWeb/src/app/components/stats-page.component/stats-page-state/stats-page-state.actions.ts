import { createAction, props } from '@ngrx/store'

export const loadStats = createAction('[Stats Page] Load Stats');
export const loadStatsSuccess = createAction('[Stats Page] Load Stats Success', props<{ Stats: any }>());
export const loadStatsError = createAction('[Stats Page] Load Stats Error');

export const loadCustomStats = createAction('[Categories Page] Load Custom Categories');

export const changeDateFilter = createAction('[Categories Page] Save Categories Error', props<{ date: any }>());