import { createReducer, on } from "@ngrx/store";
import * as Actions from "./account-page-state.actions"
import { AccountState } from "./account-page-state.state";

var initialStateOfAccountPage: AccountState = {
    ErrorMessage: "",
};

export const AccountReducer = createReducer<AccountState>(
    initialStateOfAccountPage,

    on(Actions.LoginSuccess, (state) => {
        return { ...state };
    }),
    on(Actions.LoginError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),
    on(Actions.RegisterUserError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),
) 