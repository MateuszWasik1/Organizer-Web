import { createAction, props } from '@ngrx/store'

export const loadTasks = createAction('[Tasks Page] Load Tasks');
export const loadTasksSuccess = createAction('Tasks Page] Load Tasks Success', props<{ Tasks: any }>());
export const loadTasksError = createAction('[Tasks Page] Load Tasks Error');

export const saveTask = createAction('[Tasks Page] Save Task', props<{ Task: any }>());
export const saveTaskSuccess = createAction('Tasks Page] Save Task Success', props<{ Task: any }>());
export const saveTaskError = createAction('[Tasks Page] Save Task Error');