import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SavingsState, featureKeySavingsState } from "./savings-page-state.state";

const selectSavingsState = createFeatureSelector<SavingsState>(featureKeySavingsState)

export const selectSaving = createSelector(selectSavingsState, (state: SavingsState) => state.Saving)

export const selectSavings = createSelector(selectSavingsState, (state: SavingsState) => state.Savings)

export const selectErrors = createSelector(selectSavingsState, (state: SavingsState) => state.IsSavingsError)

export const selectErrorMessage = createSelector(selectSavingsState, (state: SavingsState) => state.ErrorMessage)