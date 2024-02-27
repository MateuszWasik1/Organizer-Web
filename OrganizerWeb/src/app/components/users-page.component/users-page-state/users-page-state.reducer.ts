import { createReducer, on } from "@ngrx/store";
import * as Actions from "./users-page-state.actions"
import { UsersState } from "./users-page-state.state";

var initialStateOfUsersPage: UsersState = {
    Users: [],
    ErrorMessage: "",
};

export const UsersReducer = createReducer<UsersState>(
    initialStateOfUsersPage,

    on(Actions.loadUsersSuccess, (state, { Users }) => ({
        ...state,
        Users: Users
    })),

    on(Actions.loadUsersError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),

    on(Actions.deleteUserSuccess, (state, { ugid }) => {
        let users = [...state.Users];

        let deletedUserIndex = users.findIndex(x => x.ugid == ugid);

        users.splice(deletedUserIndex, 1)

        return {...state, Users: users};
    }),

    on(Actions.deleteUserError, (state, { error }) => ({
        ...state,
        ErrorMessage: error
    })),
) 