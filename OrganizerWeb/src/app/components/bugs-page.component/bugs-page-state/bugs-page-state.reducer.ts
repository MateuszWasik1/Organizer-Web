import { createReducer, on } from "@ngrx/store";
import * as Actions from "./bugs-page-state.actions"
import { BugsState } from "./bugs-page-state.state";
import { BugStatusEnum } from "src/app/enums/BugStatusEnum"

var initialStateOfBugsPage: BugsState = {
    Bugs: [],
    Bug: {
        bTitle: "",
        bText: "",
        bStatus: BugStatusEnum.test,
    },
    Filters: {
        Date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    },
};

export const BugsReducer = createReducer<BugsState>(
    initialStateOfBugsPage,

    on(Actions.loadBugsSuccess, (state, { Bugs }) => ({
        ...state,
        Bugs: Bugs
    })),

    on(Actions.loadBugSuccess, (state, { Bug }) => ({
        ...state,
        Bug: {
            bTitle: Bug.bTitle,
            bText: Bug.bText,
            bStatus: Bug.bStatus,
        }
    })),

    // on(Actions.saveBugSuccess, (state, { bug }) => {
    //     let newCategories = [...state.Categories];

    //     let newModel = {
    //         "cid": category.CID,
    //         "cgid": category.CGID,
    //         "cName": category.CName == "" ? 'Ty' : category.CName,
    //         "cStartDate": category.CStartDate,
    //         "cEndDate": category.CEndDate,
    //         "cBudget": category.CBudget,
    //     }

    //     let existingCategoryIndex = newCategories.findIndex(x => x.cgid == category.CGID);

    //     if(existingCategoryIndex != -1)
    //         newCategories[existingCategoryIndex] = newModel
        
    //     else
    //         newCategories.push(newModel)

    //     return {...state, Categories: newCategories};
    // }),

) 
