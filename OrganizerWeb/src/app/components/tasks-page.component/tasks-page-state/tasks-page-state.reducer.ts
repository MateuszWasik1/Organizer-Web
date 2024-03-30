import { createReducer, on } from "@ngrx/store";
import * as Actions from "./tasks-page-state.actions"
import { TasksState } from "./tasks-page-state.state";
import { TaskEnum } from "src/app/enums/TaskEnum";

var initialStateOfTasksPage: TasksState = {
    Filters: {
        Category: '',
        Status: 3,
    },
    Tasks: [],
    Task: {
        TGID: "",
        TCGID: "",
        TName: "",
        TLocalization: "",
        TTime: new Date(),
        TBudget: 0,
        TStatus: TaskEnum.NotStarted,
    },
    TasksNotes: [],
    TasksSubTasks: [],
    Categories: [],
    IsError: {
        IsTasksError: false,
        IsTasksNotesError: false,
        IsCategoriesError: false,
    },
    BudgetOverrunMessage: "",
    ErrorMessage: "",
};

export const TasksReducer = createReducer<TasksState>(
    initialStateOfTasksPage,

    //Load Task
    on(Actions.loadTaskSuccess, (state, { Task }) => ({
        ...state,
        Task: {
            TGID: Task.tgid,
            TCGID: Task.tcgid,
            TName: Task.tName,
            TLocalization: Task.tLocalization,
            TTime: Task.tTime,
            TBudget: Task.tBudget,
            TStatus: Task.tStatus,
        },
    })),
    
    on(Actions.loadTaskError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    //Load Tasks
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
    on(Actions.addTaskSuccess, (state) => ({
        ...state,
    })),

    on(Actions.addTaskError, (state, { error }) => ({
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

    //Update Task 
    on(Actions.updateTaskSuccess, (state) => ({
        ...state,
    })),
    
    on(Actions.updateTaskError, (state, { error }) => ({
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
        Task: {
            TGID: "",
            TCGID: "",
            TName: "",
            TLocalization: "",
            TTime: new Date(),
            TBudget: 0,
            TStatus: TaskEnum.NotStarted,
        },
        TasksNotes: [],
        TasksSubTasks: [],
        Categories: [],
        IsError: {
            IsTasksError: false,
            IsTasksNotesError: false,
            IsCategoriesError: false,
        },
        BudgetOverrunMessage: "",
        ErrorMessage: "",
    })),

    //Calculations
    on(Actions.CalculateCategoryBudget, (state, { CGID, Budget }) => {
        let category = state.Categories.find((x: any) => x.cgid == CGID);
        
        if(category.cBudget < category.cBudgetCount + Budget)
            return {
                ...state, 
                BudgetOverrunMessage: `W obecnej kategorii zaplanowany budżet to ${category.cBudget}, przekraczasz budżet kategorii o ${(category.cBudgetCount + Budget) - category.cBudget} !`
            };
        else
            return {
                ...state, 
                BudgetOverrunMessage: ""
            };
    }),
) 