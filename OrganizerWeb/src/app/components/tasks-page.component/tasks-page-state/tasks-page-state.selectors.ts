import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TasksState, featureKeyTasksState } from "./tasks-page-state.state";

const selectTasksState = createFeatureSelector<TasksState>(featureKeyTasksState)

export const selectTask = createSelector(selectTasksState, (state: TasksState) => state.Task);

export const selectTasks = createSelector(selectTasksState, (state: TasksState) => state.Tasks);

export const selectTasksNotes = createSelector(selectTasksState, (state: TasksState) => state.TasksNotes);

export const selectTasksSubTasks = createSelector(selectTasksState, (state: TasksState) => state.TasksSubTasks);

export const selectTasksSubTasksProgressBar = createSelector(selectTasksState, (state: TasksState) => state.TasksSubTasksProgressBar);

export const selectCategories = createSelector(selectTasksState, (state: TasksState) => state.Categories);

export const selectFilters = createSelector(selectTasksState, (state: TasksState) => state.Filters);

export const selectFiltersTasksNotes = createSelector(selectTasksState, (state: TasksState) => state.FiltersTasksNotes);

export const selectFiltersTasksSubTasks = createSelector(selectTasksState, (state: TasksState) => state.FiltersTasksSubTasks);

export const selectCount = createSelector(selectTasksState, (state: TasksState) => state.TasksCount);

export const selectCountTasksNotes  = createSelector(selectTasksState, (state: TasksState) => state.TasksNotesCount);

export const selectCountTasksSubTasks = createSelector(selectTasksState, (state: TasksState) => state.TasksSubTasksCount);

export const selectErrors = createSelector(selectTasksState, (state: TasksState) => state.IsError);

export const selectBudgetOverrunMessage = createSelector(selectTasksState, (state: TasksState) => state.BudgetOverrunMessage);

export const selectErrorMessage = createSelector(selectTasksState, (state: TasksState) => state.ErrorMessage);