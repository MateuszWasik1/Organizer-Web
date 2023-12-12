import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import * as StatsActions from "./stats-page-state.actions"
import { AppState } from "src/app/app.state";
import { Store } from "@ngrx/store";
import { selectFilters } from "./stats-page-state.selectors";
import { FillDataService } from "src/app/services/fill-data.service";

@Injectable()
export class StatsEffects {
    constructor(
        private actions: Actions,
        private store: Store<AppState>,
        private fillDataService: FillDataService) {
    }
    loadCustomCategories = createEffect(() => {
        return this.actions.pipe(
            ofType(StatsActions.loadCustomStats),
            switchMap(() => {
                return of(this.fillDataService.FillCategories()).pipe(
                    map((result) => StatsActions.loadStatsSuccess({ Stats: result })),
                    catchError(() => of(StatsActions.loadStatsError()))
                )
            })
        )
    })
}