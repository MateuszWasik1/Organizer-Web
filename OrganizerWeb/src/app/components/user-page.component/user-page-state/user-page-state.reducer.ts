import { createReducer, on } from "@ngrx/store";
import * as Actions from "./user-page-state.actions"
import { UserState } from "./user-page-state.state";

var initialStateOfUserPage: UserState = {
    User: {}
};

export const UserReducer = createReducer<UserState>(
    initialStateOfUserPage,

    on(Actions.loadUserSuccess, (state, { User }) => ({
        ...state,
        User: User
    })),
) 
