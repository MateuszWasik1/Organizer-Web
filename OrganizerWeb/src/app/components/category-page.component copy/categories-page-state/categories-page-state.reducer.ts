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
) 
