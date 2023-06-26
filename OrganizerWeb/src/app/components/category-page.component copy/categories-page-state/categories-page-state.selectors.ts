import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CategoriesState, featureKeyCategoriesState } from "./categories-page-state.state";

const selectCategoriesState = createFeatureSelector<CategoriesState>(featureKeyCategoriesState)

export const selectCategories = createSelector(selectCategoriesState, (state: CategoriesState) => state.Categories)