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

    on(Actions.loadSavingsSuccess, (state, { Savings }) => ({
        ...state,
        Savings: Savings
    })),

    on(Actions.loadSavingsError, (state, { error }) => ({
        ...state,
        IsSavingsError: true,
        ErrorMessage: error
    })),

    on(Actions.addSavingSuccess, (state, { Saving }) => {
        let newSavings = [...state.Savings];

        let newModel = {
            "sid": Saving.SID,
            "sgid": Saving.SGID,
            "sAmount": Saving.SAmount,
            "sTime": Saving.STime,
            "sOnWhat": Saving.SOnWhat,
            "sWhere": Saving.SWhere,
        }

        let existingSavingIndex = newSavings.findIndex(x => x.sgid == Saving.SGID);

        if(existingSavingIndex != -1)
            newSavings[existingSavingIndex] = newModel
        
        else
            newSavings.push(newModel)

        return {...state, Savings: newSavings};
    }),

    on(Actions.addSavingError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    on(Actions.deleteSaving, (state, { SGID }) => {
        let newSavings = [...state.Savings];
        let existingSavingIndex = newSavings.findIndex(x => x.sgid == SGID);

        if(existingSavingIndex != -1)
        newSavings.splice(existingSavingIndex, 1)

        return {...state, Savings: newSavings};
    }),

    on(Actions.deleteSavingError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    on(Actions.cleanState, (state) => ({
        ...state,
        Savings: [],
        IsSavingsError: false,
        ErrorMessage: "",
    })),
) 