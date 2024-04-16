import { TaskEnum } from "src/app/enums/TaskEnum";

export const featureKeyTasksState = 'tasks-page-state';

export interface TasksState {
    Tasks: any[],
    Task: {
        TGID: string,
        TCGID: string,
        TName: string,
        TLocalization: string,
        TTime: Date,
        TBudget: number,
        TStatus: TaskEnum,
    },
    TasksNotes: any[],
    TasksSubTasks: any[],
    Categories: any[],
    TasksSubTasksProgressBar: {
        percent: number,
        class: string,
    },
    Filters: {
        Category: string,
        Status: number,
        Skip: number,
        Take: number,
    },
    FiltersTasksNotes: {
        Skip: number,
        Take: number,
    },
    FiltersTasksSubTasks: {
        Skip: number,
        Take: number,
    },
    TasksCount: number,
    TasksNotesCount: number,
    TasksSubTasksCount: number,
    IsError: {
        IsTasksError: boolean,
        IsTasksNotesError: boolean,
        IsCategoriesError: boolean,
    },
    BudgetOverrunMessage: string,
    ErrorMessage: string,
}