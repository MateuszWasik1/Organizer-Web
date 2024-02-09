import { createReducer, on } from "@ngrx/store";
import * as Actions from "./users-page-state.actions"
import { UsersState } from "./users-page-state.state";

var initialStateOfUsersPage: UsersState = {
    Users: [],
};

export const UsersReducer = createReducer<UsersState>(
    initialStateOfUsersPage,

    on(Actions.loadUsersSuccess, (state, { Users }) => ({
        ...state,
        Users: Users
    })),
) 