import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AccountState, featureKeyAccountState } from "./account-page-state.state";

const selectAccountState = createFeatureSelector<AccountState>(featureKeyAccountState)

// export const selectCategories = createSelector(selectCategoriesState, (state: CategoriesState) => state.Categories)

// export const selectFilters= createSelector(selectCategoriesState, (state: CategoriesState) => state.Filters)

// export const selectErrors= createSelector(selectCategoriesState, (state: CategoriesState) => state.IsCategoriesError)