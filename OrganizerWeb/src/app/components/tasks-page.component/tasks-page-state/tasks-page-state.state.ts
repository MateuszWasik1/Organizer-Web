export const featureKeyTasksState = 'tasks-page-state';

export interface TasksState {
    Filters: {
        Category: string,
        Status: number,
    },
    Tasks: any[],
    Categories: [],
    IsError: {
        IsTasksError: boolean,
        IsCategoriesError: boolean,
    }
}