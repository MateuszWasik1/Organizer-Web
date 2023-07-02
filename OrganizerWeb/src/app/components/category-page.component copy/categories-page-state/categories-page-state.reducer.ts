import { createReducer, on } from "@ngrx/store";
import * as Actions from "./categories-page-state.actions"
import { CategoriesState } from "./categories-page-state.state";

var initialStateOfSearchPage: CategoriesState = {
    Categories: [],
};

export const CategoriesReducer = createReducer<CategoriesState>(
    initialStateOfSearchPage,

    on(Actions.loadCategoriesSuccess, (state, { Categories }) => ({
        ...state,
        Categories: Categories
    })),

    on(Actions.saveCategorySuccess, (state, { category }) => {
        let newCategories = [...state.Categories];

        let newModel = {
            "cid": category.CID,
            "cgid": category.CGID,
            "cName": category.CName == "" ? 'Ty' : category.CName,
            "cStartDate": category.CStartDate,
            "cEndDate": category.CEndDate,
            "cBudget": category.CBudget,
        }

        let existingCategoryIndex = newCategories.findIndex(x => x.cgid == category.CGID);

        if(existingCategoryIndex != -1)
            newCategories[existingCategoryIndex] = newModel
        
        else
            newCategories.push(newModel)

        return {...state, Categories: newCategories};
    }),
) 
