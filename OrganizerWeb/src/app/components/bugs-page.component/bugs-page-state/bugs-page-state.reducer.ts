import { createReducer, on } from "@ngrx/store";
import * as Actions from "./bugs-page-state.actions"
import { BugsState } from "./bugs-page-state.state";
import { BugStatusEnum } from "src/app/enums/BugStatusEnum"
import { Guid } from "guid-typescript";

var initialStateOfBugsPage: BugsState = {
    Bugs: [],
    Bug: {
        bguid: Guid.create().toString(),
        bTitle: "",
        bText: "",
        bStatus: BugStatusEnum.New,
    },
    Filters: {
        Date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    },
    BugNotes: [],
};

export const BugsReducer = createReducer<BugsState>(
    initialStateOfBugsPage,

    on(Actions.loadBugsSuccess, (state, { Bugs }) => ({
        ...state,
        Bugs: Bugs
    })),

    on(Actions.loadBugSuccess, (state, { Bug }) => ({
        ...state,
        Bug: {
            bguid: Bug.bgid,
            bTitle: Bug.bTitle,
            bText: Bug.bText,
            bStatus: Bug.bStatus,
        }
    })),


    on(Actions.loadBugNotesSuccess, (state, { BugNotes }) => ({
        ...state,
        BugNotes: BugNotes
    })),

    on(Actions.saveBugNoteSuccess, (state, { BugNote }) => {
        let newBugNotes = [...state.BugNotes];

        let newModel = {
            "bnDate": BugNote.BNDate,
            "bnText": BugNote.BNText,
            "bnIsNewVerifier": BugNote.BNIsNewVerifier,
            "bnIsStatusChange": BugNote.BNIsStatusChange,
            "bnChangedStatus": 0
        };

        newBugNotes.push(newModel)

        return {...state, BugNotes: newBugNotes};
    }),

    on(Actions.changeBugStatusSuccess, (state, { status }) => {
        let newBugNotes = [...state.BugNotes];

        let newModel = {
            "bnDate": new Date(),
            "bnText": "Status został zmieniony",
            "bnIsNewVerifier": false,
            "bnIsStatusChange": true,
            "bnChangedStatus":  +status
        };

        newBugNotes.push(newModel)

        return {
            ...state,
            Bug: {
                ...state.Bug,
                bStatus: status,
            },
            BugNotes: newBugNotes
        }
    }),
)