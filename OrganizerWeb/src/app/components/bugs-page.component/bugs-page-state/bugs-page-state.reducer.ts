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
        bStatus: BugStatusEnum.test,
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

    on(Actions.changeBugStatusSuccess, (state, { status }) => ({
        ...state,
        Bug: {
            ...state.Bug,
            bStatus: status,
        }
    })),
)