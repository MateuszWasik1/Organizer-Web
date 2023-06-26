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

        let existingCategoryIndex = newCategories.findIndex(x => x.cgid == category.CGID);
        console.log(existingCategoryIndex)
        if(existingCategoryIndex != -1){
            newCategories[existingCategoryIndex] = category
        }
        else
            newCategories.push(category);

        console.log(category)
        console.log(newCategories)
        return {...state, Categories: newCategories};
    }),
) 
