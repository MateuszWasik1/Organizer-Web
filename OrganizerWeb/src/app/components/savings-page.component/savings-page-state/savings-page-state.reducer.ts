import { createReducer, on } from "@ngrx/store";
import * as Actions from "./savings-page-state.actions"
import { SavingsState } from "./savings-page-state.state";

var initialStateOfSearchPage: SavingsState = {
    Savings: [],
    Saving: {
        SGID: "",
        SAmount: 0,
        STime: new Date(),
        SOnWhat: "",
        SWhere: "",
    },
    Filters: {
        Skip: 0,
        Take: 10,
    },
    SavingsCount: 0,
    IsSavingsError: false,
    ErrorMessage: "",
};

export const SavingsReducer = createReducer<SavingsState>(
    initialStateOfSearchPage,

    on(Actions.loadSavingSuccess, (state, { Saving }) => ({
        ...state,
        Saving: {
            SGID: Saving.sgid,
            SAmount: Saving.sAmount,
            STime: Saving.sTime,
            SOnWhat: Saving.sOnWhat,
            SWhere: Saving.sWhere,
        },
    })),

    on(Actions.loadSavingError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    on(Actions.loadSavingsSuccess, (state, { Savings }) => ({
        ...state,
        Savings: Savings.list,
        SavingsCount: Savings.count
    })),

    on(Actions.loadSavingsError, (state, { error }) => ({
        ...state,
        IsSavingsError: true,
        ErrorMessage: error
    })),

    on(Actions.addSavingSuccess, (state) => ({
        ...state,
    })),

    on(Actions.addSavingError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    on(Actions.updateSavingSuccess, (state) => ({
        ...state,
    })),

    on(Actions.updateSavingError, (state, { error }) => ({
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
        Savings: [],
        Saving: {
            SGID: "",
            SAmount: 0,
            STime: new Date(),
            SOnWhat: "",
            SWhere: "",
        },
        Filters: {
            Skip: 0,
            Take: 10,
        },
        SavingsCount: 0,
        IsSavingsError: false,
        ErrorMessage: "",
    })),

    // on(Actions.addSavingSuccess, (state, { Saving }) => {
    //     let newSavings = [...state.Savings];

    //     let newModel = {
    //         "sid": Saving.SID,
    //         "sgid": Saving.SGID,
    //         "sAmount": Saving.SAmount,
    //         "sTime": Saving.STime,
    //         "sOnWhat": Saving.SOnWhat,
    //         "sWhere": Saving.SWhere,
    //     }

    //     let existingSavingIndex = newSavings.findIndex(x => x.sgid == Saving.SGID);

    //     if(existingSavingIndex != -1)
    //         newSavings[existingSavingIndex] = newModel
        
    //     else
    //         newSavings.push(newModel)

    //     return {...state, Savings: newSavings};
    // }),
) 