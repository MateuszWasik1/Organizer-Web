import { createReducer, on } from "@ngrx/store";
import * as Actions from "./account-page-state.actions"
import { AccountState } from "./account-page-state.state";

var initialStateOfAccountPage: AccountState = {
    RegisterData: {
        UUserName: '',
        UEmail: '',
        UPassword: '',
    },
    Token: "",
};

export const AccountReducer = createReducer<AccountState>(
    initialStateOfAccountPage,

    on(Actions.LoginSuccess, (state, { token }) => {
        console.log(token)

        return { ...state, Token: token };
    }),

    on(Actions.LoginError, (state, { error }) => {
        console.log(error)

        return { ...state };
    }),
) 