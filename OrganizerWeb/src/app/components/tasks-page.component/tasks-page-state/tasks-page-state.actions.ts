import { createAction, props } from '@ngrx/store'

export const loadTask = createAction('[Tasks Page] Load Task', props<{ TGID: any }>());
export const loadTaskSuccess = createAction('[Tasks Page] Load Task Success', props<{ Task: any }>());
export const loadTaskError = createAction('[Tasks Page] Load Task Error', props<{ error: any }>());

export const loadTasks = createAction('[Tasks Page] Load Tasks');
export const loadTasksSuccess = createAction('[Tasks Page] Load Tasks Success', props<{ Tasks: any }>());
export const loadTasksError = createAction('[Tasks Page] Load Tasks Error', props<{ error: any }>());

export const loadTasksNotes = createAction('[Tasks Page] Load Tasks Notes', props<{ TGID: string }>());
export const loadTasksNotesSuccess = createAction('[Tasks Page] Load Tasks Notes Success', props<{ TasksNotes: any }>());
export const loadTasksNotesError = createAction('[Tasks Page] Load Tasks Notes Error', props<{ error: any }>());

export const loadTasksSubTasks = createAction('[Tasks Page] Load Tasks SubTasks', props<{ TGID: string }>());
export const loadTasksSubTasksSuccess = createAction('[Tasks Page] Load Tasks SubTasks Success', props<{ TasksSubTasks: any }>());
export const loadTasksSubTasksError = createAction('[Tasks Page] Load Tasks SubTasks Error', props<{ error: any }>());

export const loadCategories = createAction('[Tasks Page] Load Categories');
export const loadCategoriesSuccess = createAction('[Tasks Page] Load Categories Success', props<{ Categories: any }>());
export const loadCategoriesError = createAction('[Tasks Page] Load Categories Error', props<{ error: any }>());

export const loadCustomTasks = createAction('[Tasks Page] Load Custom Tasks');
export const loadCustomCategories = createAction('[Tasks Page] Load Custom Categories');

export const addTask = createAction('[Tasks Page] Add Task', props<{ Task: any }>());
export const addTaskSuccess = createAction('Tasks Page] Add Task Success');
export const addTaskError = createAction('[Tasks Page] Add Task Error', props<{ error: any }>());

export const updateTask = createAction('[Tasks Page] Update Task', props<{ Task: any }>());
export const updateTaskSuccess = createAction('Tasks Page] Update Task Success');
export const updateTaskError = createAction('[Tasks Page] Update Task Error', props<{ error: any }>());

export const saveTaskNote = createAction('[Tasks Page] Save Task Note', props<{ TNGID: any, TGID: any, TaskNote: any }>());
export const saveTaskNoteSuccess = createAction('Tasks Page] Save Task Note Success', props<{ TaskNote: any }>());
export const saveTaskNoteError = createAction('[Tasks Page] Save Task Note Error', props<{ error: any }>());

export const addTaskSubTask = createAction('[Tasks Page] Add Task SubTask', props<{ SubTask: any }>());
export const addTaskSubTaskSuccess = createAction('Tasks Page] Add Task SubTask Success', props<{ SubTask: any }>());
export const addTaskSubTaskError = createAction('[Tasks Page] Add Task SubTask Error', props<{ error: any }>());

export const taskSubTaskChangeStatus = createAction('[Tasks Page] Task SubTask Change Status', props<{ Model: any }>());
export const taskSubTaskChangeStatusSuccess = createAction('Tasks Page] Task SubTask Change Status Success', props<{ Model: any }>());
export const taskSubTaskChangeStatusError = createAction('[Tasks Page] Task SubTask Change Status Error', props<{ error: any }>());

export const deleteTask = createAction('[Tasks Page] Delete Task', props<{ tgid: any }>());
export const deleteTaskSuccess = createAction('Tasks Page] Delete Task Success', props<{ tgid: any }>());
export const deleteTaskError = createAction('[Tasks Page] Delete Task Error', props<{ error: any }>());

export const deleteTaskNote = createAction('[Tasks Page] Delete Task Note', props<{ TNGID: any }>());
export const deleteTaskNoteSuccess = createAction('Tasks Page] Delete Task Note Success', props<{ TNGID: any }>());
export const deleteTaskNoteError = createAction('[Tasks Page] Delete Task Note Error', props<{ error: any }>());

export const deleteTaskSubTask = createAction('[Tasks Page] Delete Task SubTask', props<{ TSTGID: any }>());
export const deleteTaskSubTaskSuccess = createAction('Tasks Page] Delete Task SubTask Success', props<{ TSTGID: any }>());
export const deleteTaskSubTaskError = createAction('[Tasks Page] Delete Task SubTask Error', props<{ error: any }>());

export const deleteTaskRelatedEntities = createAction('[Tasks Page] Delete Task Related Entities', props<{ Model: any }>());
export const deleteTaskRelatedEntitiesSuccess = createAction('Tasks Page] Delete Task Related Entities Success', props<{ TGID: any }>());
export const deleteTaskRelatedEntitiesError = createAction('[Tasks Page] Delete Task Related Entities Error', props<{ error: any }>());

export const ChangeCategoryFilterValue = createAction('[Tasks Page] Change Category Filter Value', props<{ value: any }>());

export const ChangeStatusFilterValue = createAction('[Tasks Page] Change Status Filter Value', props<{ value: any }>());

export const CalculateCategoryBudget = createAction('[Tasks Page] Calculate Category Budget', props<{ CGID: any, Budget: number }>());

export const updatePaginationDataTasks = createAction('[Tasks Page] Update Pagination Data Tasks', props<{ PaginationData: any }>());
export const updatePaginationDataTasksNotes = createAction('[Tasks Page] Update Pagination Data Tasks Notes', props<{ PaginationData: any }>());
export const updatePaginationDataTasksSubTasks = createAction('[Tasks Page] Update Pagination Data Tasks SubTasks', props<{ PaginationData: any }>());

export const cleanState = createAction('[Tasks Page] Clean State');