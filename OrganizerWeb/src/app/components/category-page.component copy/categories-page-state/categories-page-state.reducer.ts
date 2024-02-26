import { createReducer, on } from "@ngrx/store";
import * as Actions from "./categories-page-state.actions"
import { CategoriesState } from "./categories-page-state.state";

var initialStateOfSearchPage: CategoriesState = {
    Categories: [],
    Filters: {
        Date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    },
    IsCategoriesError: false,
    ErrorMessage: "",
};

export const CategoriesReducer = createReducer<CategoriesState>(
    initialStateOfSearchPage,

    on(Actions.loadCategoriesSuccess, (state, { Categories }) => ({
        ...state,
        Categories: Categories
    })),

    on(Actions.loadCategoriesError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    on(Actions.loadCategoriesError, state => ({
        ...state,
        IsCategoriesError: true,
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
    on(Actions.changeDateFilter, (state, { date }) => ({
        ...state,
        Filters: {
            ...state.Filters,
            Date: date,
        }
    })),

    on(Actions.deleteCategory, (state, { cGID }) => {
        let newCategories = [...state.Categories];
        let existingCategoryIndex = newCategories.findIndex(x => x.cgid == cGID);

        if(existingCategoryIndex != -1)
            newCategories.splice(existingCategoryIndex, 1)

        return {...state, Categories: newCategories};
    }),
) 
