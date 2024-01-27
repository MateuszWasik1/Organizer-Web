import { createReducer, on } from "@ngrx/store";
import * as Actions from "./account-page-state.actions"
import { AccountState } from "./account-page-state.state";

var initialStateOfSearchPage: AccountState = {
    RegisterData: {
        UUserName: '',
        UEmail: '',
        UPassword: '',
    }
};

export const AccountReducer = createReducer<AccountState>(
    initialStateOfSearchPage,
) 