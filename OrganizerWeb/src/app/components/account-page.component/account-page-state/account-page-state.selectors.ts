import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AccountState, featureKeyAccountState } from "./account-page-state.state";

const selectAccountState = createFeatureSelector<AccountState>(featureKeyAccountState)