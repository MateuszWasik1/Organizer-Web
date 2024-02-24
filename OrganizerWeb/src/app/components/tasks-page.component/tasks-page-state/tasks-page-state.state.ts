export const featureKeyTasksState = 'tasks-page-state';

export interface TasksState {
    Filters: {
        Category: string,
        Status: number,
    },
    Tasks: any[],
    TasksNotes: any[],
    Categories: [],
    IsError: {
        IsTasksError: boolean,
        IsTasksNotesError: boolean,
        IsCategoriesError: boolean,
    },
    ErrorMessage: string,
}