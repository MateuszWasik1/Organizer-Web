import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import * as SavingsActions from "./savings-page-state.actions"
import { FillDataService } from "src/app/services/fill-data.service";
import { SavingsService } from "src/app/services/savings.service";
import { APIErrorHandler } from "src/app/error-handlers/api-error-handler";
import { Router } from "@angular/router";
import { selectFilters } from "./savings-page-state.selectors";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";

@Injectable()
export class SavingsEffects {
    constructor(
        private actions: Actions,
        private store: Store<AppState>,
        private router: Router,
        private savingsService: SavingsService,
        private fillDataService: FillDataService,
        private errorHandler: APIErrorHandler) {
    }

    loadSaving = createEffect(() => {
        return this.actions.pipe(
            ofType(SavingsActions.loadSaving),
            switchMap((params) => {
                return this.savingsService.GetSaving(params.SGID).pipe(
                    map((result) => SavingsActions.loadSavingSuccess({ Saving: result })),
                    catchError(error => of(SavingsActions.loadSavingError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })
    
    loadSavings = createEffect(() => {
        return this.actions.pipe(
            ofType(SavingsActions.loadSavings),
            withLatestFrom(this.store.select(selectFilters)),
            switchMap((params) => {
                return this.savingsService.GetSavings(params[1].Skip, params[1].Take).pipe(
                    map((result) => SavingsActions.loadSavingsSuccess({ Savings: result })),
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
                    map((result) => SavingsActions.loadSavingsSuccess({ Savings: result })),
                    catchError(error => of(SavingsActions.loadSavingsError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    addSaving = createEffect(() => {
        return this.actions.pipe(
            ofType(SavingsActions.addSaving),
            switchMap((params) => {
                return this.savingsService.AddSaving(params.Saving).pipe(
                    map(() => SavingsActions.addSavingSuccess({ Saving: params.Saving })),
                    tap(() => this.router.navigate(["savings"])),
                    catchError(error => of(SavingsActions.addSavingError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    updateSaving = createEffect(() => {
        return this.actions.pipe(
            ofType(SavingsActions.updateSaving),
            switchMap((params) => {
                return this.savingsService.UpdateSaving(params.Saving).pipe(
                    map(() => SavingsActions.addSavingSuccess({ Saving: params.Saving })),
                    tap(() => this.router.navigate(["savings"])),
                    catchError(error => of(SavingsActions.addSavingError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    deleteSaving = createEffect(() => {
        return this.actions.pipe(
            ofType(SavingsActions.deleteSaving),
            switchMap((params) => {
                return this.savingsService.DeleteSaving(params.SGID).pipe(
                    map(() => SavingsActions.deleteSavingSuccess({ SGID: params.SGID })),
                    catchError(error => of(SavingsActions.deleteSavingError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })
}