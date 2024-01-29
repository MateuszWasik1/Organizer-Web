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

    on(Actions.LoginSuccess, (state) => {
        return { ...state};
    }),
) 