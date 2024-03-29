import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TasksState, featureKeyTasksState } from "./tasks-page-state.state";

const selectTasksState = createFeatureSelector<TasksState>(featureKeyTasksState)

export const selectFilters = createSelector(selectTasksState, (state: TasksState) => state.Filters)

export const selectTask = createSelector(selectTasksState, (state: TasksState) => state.Task)

export const selectTasks = createSelector(selectTasksState, (state: TasksState) => state.Tasks)

export const selectTasksNotes = createSelector(selectTasksState, (state: TasksState) => state.TasksNotes)

export const selectCategories = createSelector(selectTasksState, (state: TasksState) => state.Categories)

export const selectErrors = createSelector(selectTasksState, (state: TasksState) => state.IsError)

export const selectBudgetOverrunMessage = createSelector(selectTasksState, (state: TasksState) => state.BudgetOverrunMessage)

export const selectErrorMessage = createSelector(selectTasksState, (state: TasksState) => state.ErrorMessage)