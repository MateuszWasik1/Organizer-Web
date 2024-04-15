import { createReducer, on } from "@ngrx/store";
import * as Actions from "./users-page-state.actions"
import { UsersState } from "./users-page-state.state";

var initialStateOfUsersPage: UsersState = {
    Users: [],
    Filters: {
        Skip: 0,
        Take: 10,
    },
    UsersCount: 0,
    ErrorMessage: "",
};

export const UsersReducer = createReducer<UsersState>(
    initialStateOfUsersPage,

    on(Actions.loadUsersSuccess, (state, { Users }) => ({
        ...state,
        Users: Users.list,
        UsersCount: Users.count
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
        Users: [],
        Filters: {
            Skip: 0,
            Take: 10,
        },
        UsersCount: 0,
        ErrorMessage: ""
    })),
) 