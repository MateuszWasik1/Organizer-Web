import { TaskEnum } from "src/app/enums/TaskEnum";

export const featureKeyTasksState = 'tasks-page-state';

export interface TasksState {
    Filters: {
        Category: string,
        Status: number,
    },
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
    Categories: any[],
    IsError: {
        IsTasksError: boolean,
        IsTasksNotesError: boolean,
        IsCategoriesError: boolean,
    },
    ErrorMessage: string,
}