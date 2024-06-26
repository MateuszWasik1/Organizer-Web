import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CategoriesState, featureKeyCategoriesState } from "./categories-page-state.state";

const selectCategoriesState = createFeatureSelector<CategoriesState>(featureKeyCategoriesState)

export const selectCategory = createSelector(selectCategoriesState, (state: CategoriesState) => state.Category);

export const selectCategories = createSelector(selectCategoriesState, (state: CategoriesState) => state.Categories);

export const selectFilters= createSelector(selectCategoriesState, (state: CategoriesState) => state.Filters);

export const selectCount= createSelector(selectCategoriesState, (state: CategoriesState) => state.CategoriesCount);

export const selectErrors= createSelector(selectCategoriesState, (state: CategoriesState) => state.IsCategoriesError);

export const selectErrorMessage= createSelector(selectCategoriesState, (state: CategoriesState) => state.ErrorMessage);