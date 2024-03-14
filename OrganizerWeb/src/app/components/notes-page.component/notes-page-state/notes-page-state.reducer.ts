import { createReducer, on } from "@ngrx/store";
import * as Actions from "./notes-page-state.actions"
import { NotesState } from "./notes-page-state.state";
import { Guid } from "guid-typescript";

var initialStateOfNotesPage: NotesState = {
    Notes: [],
    ErrorMessage: "",
};

export const NotesReducer = createReducer<NotesState>(
    initialStateOfNotesPage,

    // on(Actions.loadBugsSuccess, (state, { Bugs }) => ({
    //     ...state,
    //     Bugs: Bugs
    // })),

    // on(Actions.loadBugsError, (state, { error }) => ({
    //     ...state,
    //     ErrorMessage: error
    // })),

    // on(Actions.loadBugSuccess, (state, { Bug }) => ({
    //     ...state,
    //     Bug: {
    //         bguid: Bug.bgid,
    //         bTitle: Bug.bTitle,
    //         bText: Bug.bText,
    //         bStatus: Bug.bStatus,
    //     }
    // })),

    // on(Actions.loadBugError, (state, { error }) => ({
    //     ...state,
    //     ErrorMessage: error
    // })),

    // on(Actions.loadBugNotesSuccess, (state, { BugNotes }) => ({
    //     ...state,
    //     BugNotes: BugNotes
    // })),

    // on(Actions.loadBugNotesError, (state, { error }) => ({
    //     ...state,
    //     ErrorMessage: error
    // })),

    // on(Actions.loadUserRolesSuccess, (state, { UserRoles }) => ({
    //     ...state,
    //     UserRoles: {
    //         IsSupport: UserRoles.isSupport,
    //         IsAdmin: UserRoles.isAdmin,
    //     }
    // })),

    // on(Actions.loadUserRolesError, (state, { error }) => ({
    //     ...state,
    //     ErrorMessage: error
    // })),

    // on(Actions.saveBugError, (state, { error }) => ({
    //     ...state,
    //     ErrorMessage: error
    // })),

    // on(Actions.saveBugNoteSuccess, (state, { BugNote }) => {
    //     let newBugNotes = [...state.BugNotes];

    //     let newModel = {
    //         "bnDate": new Date(),
    //         "bnText": BugNote.BNText,
    //         "bnIsNewVerifier": false,
    //         "bnIsStatusChange": false,
    //         "bnChangedStatus": 0
    //     };

    //     newBugNotes.push(newModel)

    //     return {...state, BugNotes: newBugNotes};
    // }),

    // on(Actions.saveBugNoteError, (state, { error }) => ({
    //     ...state,
    //     ErrorMessage: error
    // })),

    // on(Actions.changeBugStatusSuccess, (state, { status }) => {
    //     let newBugNotes = [...state.BugNotes];

    //     let newModel = {
    //         "bnDate": new Date(),
    //         "bnText": "Status został zmieniony",
    //         "bnIsNewVerifier": false,
    //         "bnIsStatusChange": true,
    //         "bnChangedStatus":  +status
    //     };

    //     newBugNotes.push(newModel)

    //     return {
    //         ...state,
    //         Bug: {
    //             ...state.Bug,
    //             bStatus: status,
    //         },
    //         BugNotes: newBugNotes
    //     }
    // }),

    // on(Actions.changeBugStatusError, (state, { error }) => ({
    //     ...state,
    //     ErrorMessage: error
    // })),

    // on(Actions.changeBugsType, (state, { BugType }) => ({
    //     ...state,
    //     Filters: {
    //         ...state.Filters,
    //         BugType: BugType
    //     }
    // })),

    // on(Actions.cleanState, (state) => ({
    //     ...state,
    //     Bugs: [],
    //     Bug: {
    //         bguid: Guid.create().toString(),
    //         bTitle: "",
    //         bText: "",
    //         bStatus: BugStatusEnum.New,
    //     },
    //     Filters: {
    //         BugType: BugTypeEnum.My
    //     },
    //     BugNotes: [],
    //     UserRoles: {
    //         IsSupport: false,
    //         IsAdmin: false,
    //     },
    //     ErrorMessage: "",
    // })),
)