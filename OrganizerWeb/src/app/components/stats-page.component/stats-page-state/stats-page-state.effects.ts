import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import * as StatsActions from "./stats-page-state.actions"
import { AppState } from "src/app/app.state";
import { Store } from "@ngrx/store";
import { selectFilters } from "./stats-page-state.selectors";
import { FillDataService } from "src/app/services/fill-data.service";
import { StatsService } from "src/app/services/stats.service";

@Injectable()
export class StatsEffects {
    constructor(
        private actions: Actions,
        private store: Store<AppState>,
        private fillDataService: FillDataService,
        private statsService: StatsService) {
    }

    loadSavings = createEffect(() => {
        return this.actions.pipe(
            ofType(StatsActions.loadStats),
            withLatestFrom(this.store.select(selectFilters)),
            switchMap((params) => {
                return this.statsService.getSavingsBarChart(params[1].StartDate, params[1].EndDate).pipe(
                    map((result) => StatsActions.loadStatsSuccess({ Result: result })),
                    catchError(() => of(StatsActions.loadStatsError()))
                )
            })
        )
    })

    // loadCustomStats = createEffect(() => {
    //     return this.actions.pipe(
    //         ofType(StatsActions.loadCustomStats),
    //         switchMap(() => {
    //             return of(this.fillDataService.FillCategories()).pipe(
    //                 map((result) => StatsActions.loadStatsSuccess({ Stats: result })),
    //                 catchError(() => of(StatsActions.loadStatsError()))
    //             )
    //         })
    //     )
    // })
}