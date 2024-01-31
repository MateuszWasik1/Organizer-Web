import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState, featureKeyUserState } from "./user-page-state.state";


const selectUserState = createFeatureSelector<UserState>(featureKeyUserState)

// export const selectCategories = createSelector(selectCategoriesState, (state: CategoriesState) => state.Categories)

// export const selectFilters= createSelector(selectCategoriesState, (state: CategoriesState) => state.Filters)

// export const selectErrors= createSelector(selectCategoriesState, (state: CategoriesState) => state.IsCategoriesError)