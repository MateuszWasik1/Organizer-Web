import { BugStatusEnum } from "src/app/enums/BugStatusEnum"
import { BugTypeEnum } from "src/app/enums/BugTypeEnum";

export const featureKeyBugsState = 'bugs-page-state';

export interface BugsState {
    Bugs: any[];
    Bug: {
        bguid: string,
        bTitle: string,
        bText: string,
        bStatus: BugStatusEnum,
    };
    BugNotes: any[];
    Filters: {
        BugType: BugTypeEnum,
        Skip: number,
        Take: number,
    },
    FiltersBugNotes: {
        Skip: number,
        Take: number,
    },
    BugsCount: number,
    BugsNotesCount: number,
    UserRoles: {
        IsSupport: boolean,
        IsAdmin: boolean,
    };
    ErrorMessage: string,
}