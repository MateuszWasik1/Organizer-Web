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
    Filters: {
        BugType: BugTypeEnum
    },
    BugNotes: any[];
    UserRoles: {
        IsSupport: boolean,
        IsAdmin: boolean,
    };
}