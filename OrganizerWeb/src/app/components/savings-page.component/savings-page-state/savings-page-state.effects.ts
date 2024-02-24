import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as SavingsActions from "./savings-page-state.actions"
import { FillDataService } from "src/app/services/fill-data.service";
import { SavingsService } from "src/app/services/savings.service";
import { APIErrorHandler } from "src/app/error-handlers/api-error-handler";

@Injectable()
export class SavingsEffects {
    constructor(
        private actions: Actions,
        private savingsService: SavingsService,
        private fillDataService: FillDataService,
        private errorHandler: APIErrorHandler) {
    }
    
    loadSavings = createEffect(() => {
        return this.actions.pipe(
            ofType(SavingsActions.loadSavings),
            switchMap((params) => {
                return this.savingsService.getSavings().pipe(
                    map((result) => SavingsActions.loadSavingsSuccess({ savings: result })),
                    catchError(error => of(SavingsActions.loadSavingsError({ error: this.errorHandler.handleAPIError(error) })))
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
                    catchError(error => of(SavingsActions.loadSavingsError({ error: this.errorHandler.handleAPIError(error) })))
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
                    catchError(error => of(SavingsActions.saveSavingError({ error: this.errorHandler.handleAPIError(error) })))
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
                    catchError(error => of(SavingsActions.deleteSavingError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })
}