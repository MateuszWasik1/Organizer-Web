import { createReducer, on } from "@ngrx/store";
import * as Actions from "./tasks-page-state.actions"
import { TasksState } from "./tasks-page-state.state";

var initialStateOfTasksPage: TasksState = {
    Filters: {
        Category: '',
        Status: 3,
    },
    Tasks: [],
    TasksNotes: [],
    Categories: [],
    IsError: {
        IsTasksError: false,
        IsTasksNotesError: false,
        IsCategoriesError: false,
    },
    ErrorMessage: "",
};

export const TasksReducer = createReducer<TasksState>(
    initialStateOfTasksPage,

    //Load Task
    on(Actions.loadTasksSuccess, (state, { Tasks }) => ({
        ...state,
        Tasks: Tasks
    })),

    on(Actions.loadTasksError, (state, { error }) => ({
        ...state,
        IsError: { ...state.IsError, IsTasksError: true },
        ErrorMessage: error
    })),

    //Load Task Notes
    on(Actions.loadTasksNotesSuccess, (state, { TasksNotes }) => ({
        ...state,
        TasksNotes: TasksNotes
    })),

    on(Actions.loadTasksNotesError, (state, { error }) => ({
        ...state,
        IsError: { ...state.IsError, IsTasksNotesError: true },
        ErrorMessage: error
    })),

    //Load Categories
    on(Actions.loadCategoriesSuccess, (state, { Categories }) => ({
        ...state,
        Categories: Categories
    })),

    on(Actions.loadCategoriesError, (state, { error }) => ({
        ...state,
        IsError: { ...state.IsError, IsCategoriesError: true },
        ErrorMessage: error
    })),

    //Save Task 
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

    on(Actions.saveTaskError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Save Task Note
    on(Actions.saveTaskNoteSuccess, (state, { TaskNote }) => {
        let newTaskNotes = [...state.TasksNotes];

        let newModel = {
            "tngid": TaskNote.TNGID,
            "tnDate": new Date(),
            "tnNote": TaskNote.TaskNote,
        }

        newTaskNotes.push(newModel)

        return {...state, TasksNotes: newTaskNotes};
    }),

    on(Actions.saveTaskNoteError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Delete Task
    on(Actions.deleteTaskSuccess, (state, { tgid }) => {
        let newTasks = [...state.Tasks];

        let taskWithoutDeletedTask = newTasks.filter(x => x.tgid != tgid);

        return {...state, Tasks: taskWithoutDeletedTask};
    }),

    on(Actions.deleteTaskError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Delete Task Notes
    on(Actions.deleteTaskNoteSuccess, (state, { TNGID }) => {
        let newTaskNotes = [...state.TasksNotes];

        let taskNotesWithoutDeletedTask = newTaskNotes.filter(x => x.tngid != TNGID);

        return {...state, TasksNotes: taskNotesWithoutDeletedTask};
    }),

    on(Actions.deleteTaskNoteError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Filters
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

    on(Actions.cleanState, (state) => ({
        ...state,
        Filters: {
            Category: '',
            Status: 3,
        },
        Tasks: [],
        TasksNotes: [],
        Categories: [],
        IsError: {
            IsTasksError: false,
            IsTasksNotesError: false,
            IsCategoriesError: false,
        },
        ErrorMessage: "",
    })),
) 