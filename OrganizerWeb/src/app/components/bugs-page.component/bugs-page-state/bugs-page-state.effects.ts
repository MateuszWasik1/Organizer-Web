import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as BugsActions from "./bugs-page-state.actions"
import { AppState } from "src/app/app.state";
import { Store } from "@ngrx/store";
import { BugsService } from "src/app/services/bugs.service";

@Injectable()
export class BugsEffects {
    constructor(
        private actions: Actions,
        private store: Store<AppState>,
        private bugsService: BugsService) {
    }
    loadCategories = createEffect(() => {
        return this.actions.pipe(
            ofType(BugsActions.loadBugs),
            switchMap((params) => {
                return this.bugsService.GetBugs().pipe(
                    map((result) => BugsActions.loadBugsSuccess({ Bugs: result })),
                    catchError(() => of(BugsActions.loadBugsError()))
                )
            })
        )
    })

    // saveCategory = createEffect(() => {
    //     return this.actions.pipe(
    //         ofType(CategoriesActions.saveCategory),
    //         switchMap((params) => {
    //             return this.categoriesService.saveCategories(params.category).pipe(
    //                 map(() => CategoriesActions.saveCategorySuccess({ category: params.category })),
    //                 catchError(() => of(CategoriesActions.loadCategoriesError()))
    //             )
    //         })
    //     )
    // })
}