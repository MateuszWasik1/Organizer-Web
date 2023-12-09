import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as SavingsActions from "./savings-page-state.actions"
import { FillDataService } from "src/app/services/fill-data.service";
import { SavingsService } from "src/app/services/savings.service";

@Injectable()
export class SavingsEffects {
    constructor(
        private actions: Actions,
        private savingsService: SavingsService,
        private fillDataService: FillDataService) {
    }
    
    loadSavings = createEffect(() => {
        return this.actions.pipe(
            ofType(SavingsActions.loadSavings),
            switchMap((params) => {
                return this.savingsService.getSavings().pipe(
                    map((result) => SavingsActions.loadSavingsSuccess({ savings: result })),
                    catchError(() => of(SavingsActions.loadSavingsError()))
                )
            })
        )
    })

    loadCustomSavings = createEffect(() => {
        return this.actions.pipe(
            ofType(SavingsActions.loadCustomSavings),
            switchMap(() => {
                return of(this.fillDataService.FillSavings()).pipe(
                    map((result) => SavingsActions.loadSavingsSuccess({ savings: result })),
                    catchError(() => of(SavingsActions.loadSavingsError()))
                )
            })
        )
    })

    saveSaving = createEffect(() => {
        return this.actions.pipe(
            ofType(SavingsActions.saveSaving),
            switchMap((params) => {
                return this.savingsService.saveSaving(params.saving).pipe(
                    map(() => SavingsActions.saveSavingSuccess({ saving: params.saving })),
                    catchError(() => of(SavingsActions.saveSavingError()))
                )
            })
        )
    })

    deleteSaving = createEffect(() => {
        return this.actions.pipe(
            ofType(SavingsActions.deleteSaving),
            switchMap((params) => {
                return this.savingsService.deleteSaving(params.sGID).pipe(
                    map(() => SavingsActions.deleteSavingSuccess({ sGID: params.sGID })),
                    catchError(() => of(SavingsActions.deleteSavingError()))
                )
            })
        )
    })
}