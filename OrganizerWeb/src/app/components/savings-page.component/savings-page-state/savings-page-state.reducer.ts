import { createReducer, on } from "@ngrx/store";
import * as Actions from "./savings-page-state.actions"
import { SavingsState } from "./savings-page-state.state";

var initialStateOfSearchPage: SavingsState = {
    Savings: [],
    IsSavingsError: false,
    ErrorMessage: "",
};

export const SavingsReducer = createReducer<SavingsState>(
    initialStateOfSearchPage,

    on(Actions.loadSavingsSuccess, (state, { savings }) => ({
        ...state,
        Savings: savings
    })),

    on(Actions.loadSavingsError, (state, { error }) => ({
        ...state,
        IsSavingsError: true,
        ErrorMessage: error
    })),

    on(Actions.saveSavingSuccess, (state, { saving }) => {
        let newSavings = [...state.Savings];

        let newModel = {
            "sid": saving.SID,
            "sgid": saving.SGID,
            "sAmount": saving.SAmount,
            "sTime": saving.STime,
            "sOnWhat": saving.SOnWhat,
            "sWhere": saving.SWhere,
        }

        let existingSavingIndex = newSavings.findIndex(x => x.sgid == saving.SGID);

        if(existingSavingIndex != -1)
            newSavings[existingSavingIndex] = newModel
        
        else
            newSavings.push(newModel)

        return {...state, Savings: newSavings};
    }),

    on(Actions.saveSavingError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    on(Actions.deleteSaving, (state, { sGID }) => {
        let newSavings = [...state.Savings];
        let existingSavingIndex = newSavings.findIndex(x => x.sgid == sGID);

        if(existingSavingIndex != -1)
        newSavings.splice(existingSavingIndex, 1)

        return {...state, Savings: newSavings};
    }),

    on(Actions.deleteSavingError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),
) 