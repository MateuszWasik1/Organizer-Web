import { createAction, props } from '@ngrx/store'

export const loadTasks = createAction('[Tasks Page] Load Tasks');
export const loadTasksSuccess = createAction('[Tasks Page] Load Tasks Success', props<{ Tasks: any }>());
export const loadTasksError = createAction('[Tasks Page] Load Tasks Error');

export const loadTasksNotes = createAction('[Tasks Page] Load Tasks Notes', props<{ TGID: string }>());
export const loadTasksNotesSuccess = createAction('[Tasks Page] Load Tasks Notes Success', props<{ TasksNotes: any }>());
export const loadTasksNotesError = createAction('[Tasks Page] Load Tasks Notes Error');

export const loadCategories = createAction('[Tasks Page] Load Categories');
export const loadCategoriesSuccess = createAction('[Tasks Page] Load Categories Success', props<{ Categories: any }>());
export const loadCategoriesError = createAction('[Tasks Page] Load Categories Error');

export const loadCustomTasks = createAction('[Tasks Page] Load Custom Tasks');
export const loadCustomCategories = createAction('[Tasks Page] Load Custom Categories');

export const saveTask = createAction('[Tasks Page] Save Task', props<{ Task: any }>());
export const saveTaskSuccess = createAction('Tasks Page] Save Task Success', props<{ Task: any }>());
export const saveTaskError = createAction('[Tasks Page] Save Task Error');

export const deleteTask = createAction('[Tasks Page] Delete Task', props<{ tgid: any }>());
export const deleteTaskSuccess = createAction('Tasks Page] Delete Task Success', props<{ tgid: any }>());
export const deleteTaskError = createAction('[Tasks Page] Delete Task Error');

export const ChangeCategoryFilterValue = createAction('[Tasks Page] Change Category Filter Value', props<{ value: any }>());

export const ChangeStatusFilterValue = createAction('[Tasks Page] Change Status Filter Value', props<{ value: any }>());