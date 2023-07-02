import { createReducer, on } from "@ngrx/store";
import * as Actions from "./tasks-page-state.actions"
import { TasksState } from "./tasks-page-state.state";

var initialStateOfTasksPage: TasksState = {
    Tasks: [],
};

export const TasksReducer = createReducer<TasksState>(
    initialStateOfTasksPage,

    on(Actions.loadTasksSuccess, (state, { Tasks }) => ({
        ...state,
        Tasks: Tasks
    })),

    on(Actions.saveTaskSuccess, (state, { Task }) => {
        let newTasks = [...state.Tasks];

        // let newModel = {
        //     "cid": category.CID,
        //     "cgid": category.CGID,
        //     "cName": category.CName == "" ? 'Ty' : category.CName,
        //     "cStartDate": category.CStartDate,
        //     "cEndDate": category.CEndDate,
        //     "cBudget": category.CBudget,
        // }

        // let existingCategoryIndex = newCategories.findIndex(x => x.cgid == category.CGID);

        // if(existingCategoryIndex != -1)
        //     newCategories[existingCategoryIndex] = newModel
        
        // else
        //     newCategories.push(newModel)

        return {...state, Tasks: newTasks};
    }),
) 
