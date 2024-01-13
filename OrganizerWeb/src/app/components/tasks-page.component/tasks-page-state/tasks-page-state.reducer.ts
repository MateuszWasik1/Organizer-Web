import { createReducer, on } from "@ngrx/store";
import * as Actions from "./tasks-page-state.actions"
import { TasksState } from "./tasks-page-state.state";

var initialStateOfTasksPage: TasksState = {
    Filters: {
        Category: '',
        Status: 3,
    },
    Tasks: [],
    Categories: [],
    IsError: {
        IsTasksError: false,
        IsCategoriesError: false,
    }
};

export const TasksReducer = createReducer<TasksState>(
    initialStateOfTasksPage,

    on(Actions.loadTasksSuccess, (state, { Tasks }) => ({
        ...state,
        Tasks: Tasks
    })),

    on(Actions.loadTasksError, state => ({
        ...state,
        IsError: { ...state.IsError, IsTasksError: true },
    })),

    on(Actions.loadCategoriesSuccess, (state, { Categories }) => ({
        ...state,
        Categories: Categories
    })),

    on(Actions.loadCategoriesError, state => ({
        ...state,
        IsError: { ...state.IsError, IsCategoriesError: true },
    })),

    on(Actions.saveTaskSuccess, (state, { Task }) => {
        let newTasks = [...state.Tasks];

        let newModel = {
            "tid": Task.TID,
            "tgid": Task.TGID,
            "tcgid": Task.TCGID,
            "tName": Task.TName,
            "tTime": Task.TTime,
            "tLocalization": Task.TLocalization,
            "tBudget": Task.TBudget,
            "tStatus": Task.TStatus,
        }

        let existingTaskIndex = newTasks.findIndex(x => x.tgid == Task.TGID);

        if(existingTaskIndex != -1)
            newTasks[existingTaskIndex] = newModel
        else
            newTasks.push(newModel)

        return {...state, Tasks: newTasks};
    }),

    on(Actions.deleteTaskSuccess, (state, { tgid }) => {
        let newTasks = [...state.Tasks];
        console.log(newTasks)
        console.log(tgid)
        let taskWithoutDeletedTask = newTasks.filter(x => x.tgid != tgid);
        console.log(taskWithoutDeletedTask)

        return {...state, Tasks: taskWithoutDeletedTask};
    }),

    on(Actions.ChangeCategoryFilterValue, (state, { value }) => ({
        ...state,
        Filters: {
            ...state.Filters,
            Category: value
        }
    })),

    on(Actions.ChangeStatusFilterValue, (state, { value }) => ({
        ...state,
        Filters: {
            ...state.Filters,
            Status: parseInt(value)
        }
    })),
) 