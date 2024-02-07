import { createReducer, on } from "@ngrx/store";
import * as Actions from "./user-page-state.actions"
import { UserState } from "./user-page-state.state";

var initialStateOfUserPage: UserState = {
    User: {
        UID: 0,
        UGID: '',
        URID: 0,
        uFirstName: '',
        uLastName: '',
        uUserName: '',
        uEmail: '',
        uPhone: '',
        UCategoriesCount: -1,
        UTasksCount: -1,
        UTaskNotesCount: -1,
        USavingsCount: -1,
    }
};

export const UserReducer = createReducer<UserState>(
    initialStateOfUserPage,

    on(Actions.loadUserSuccess, (state, { User }) => ({
        ...state,
        User: {
            UID: 0,
            UGID: '',
            URID: 0,
            uFirstName: User.uFirstName,
            uLastName: User.uLastName,
            uUserName: User.uUserName,
            uEmail: User.uEmail,
            uPhone: User.uPhone,
            UCategoriesCount: -1,
            UTasksCount: -1,
            UTaskNotesCount: -1,
            USavingsCount: -1,
        }
    })),

    on(Actions.loadUserByAdminSuccess, (state, { User }) => ({
        ...state,
        User: {
            UID: User.uid,
            UGID: User.ugid,
            URID: User.urid,
            uFirstName: User.uFirstName,
            uLastName: User.uLastName,
            uUserName: User.uUserName,
            uEmail: User.uEmail,
            uPhone: User.uPhone,
            UCategoriesCount: User.uCategoriesCount,
            UTasksCount: User.uTasksCount,
            UTaskNotesCount: User.uTaskNotesCount,
            USavingsCount: User.uSavingsCount,
        }
    })),
) 
