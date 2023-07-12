import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TasksState, featureKeyTasksState } from "./tasks-page-state.state";

const selectTasksState = createFeatureSelector<TasksState>(featureKeyTasksState)

export const selectFilters = createSelector(selectTasksState, (state: TasksState) => state.Filters)
export const selectTasks = createSelector(selectTasksState, (state: TasksState) => state.Tasks)
export const selectCategories = createSelector(selectTasksState, (state: TasksState) => state.Categories)