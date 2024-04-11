import { createReducer, on } from "@ngrx/store";
import * as Actions from "./categories-page-state.actions"
import { CategoriesState } from "./categories-page-state.state";

var initialStateOfSearchPage: CategoriesState = {
    Categories: [],
    Category: {
        CGID: "",
        CName: "",
        CStartDate: new Date(),
        CEndDate: new Date(),
        CBudget: 0,
        CBudgetCount: 0,
    },
    Filters: {
        Date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        Skip: 0,
        Take: 10,
    },
    CategoriesCount: 0,
    IsCategoriesError: false,
    ErrorMessage: "",
};

export const CategoriesReducer = createReducer<CategoriesState>(
    initialStateOfSearchPage,

    on(Actions.loadCategorySuccess, (state, { Category }) => ({
        ...state,
        Category: {
            CGID: Category.cgid,
            CName: Category.cName,
            CStartDate: Category.cStartDate,
            CEndDate: Category.cEndDate,
            CBudget: Category.cBudget,
            CBudgetCount: Category.cBudgetCount,
        },
    })),

    on(Actions.loadCategoryError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    on(Actions.loadCategoriesSuccess, (state, { Categories }) => ({
        ...state,
        Categories: Categories.list,
        CategoriesCount: Categories.count,
    })),

    on(Actions.loadCategoriesError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    on(Actions.loadCategoriesError, state => ({
        ...state,
        IsCategoriesError: true,
    })),

    on(Actions.addCategorySuccess, state => ({
        ...state,
    })),

    on(Actions.addCategoryError, (state, { error }) => ({
        ...state,
        ErrorMessage: error,
    })),

    on(Actions.updateCategorySuccess, state => ({
        ...state,
    })),

    on(Actions.updateCategoryError, (state, { error }) => ({
        ...state,
        ErrorMessage: error,
    })),

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

    on(Actions.updatePaginationData, (state, { PaginationData }) => ({
        ...state,
        Filters: {
            ...state.Filters,
            Skip: PaginationData.Skip,
            Take:  PaginationData.Take,
        }
    })),

    on(Actions.cleanState, (state) => ({
        ...state,
        Categories: [],
        Category: {
            CGID: "",
            CName: "",
            CStartDate: new Date(),
            CEndDate: new Date(),
            CBudget: 0,
            CBudgetCount: 0,
        },
        Filters: {
            Date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            Skip: 0,
            Take: 10,
        },
        CategoriesCount: 0,
        IsCategoriesError: false,
        ErrorMessage: "",
    })),
) 
