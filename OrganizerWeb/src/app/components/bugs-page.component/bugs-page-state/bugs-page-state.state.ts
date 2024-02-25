import { BugStatusEnum } from "src/app/enums/BugStatusEnum"

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
        Date: any,
    },
    BugNotes: any[];
}