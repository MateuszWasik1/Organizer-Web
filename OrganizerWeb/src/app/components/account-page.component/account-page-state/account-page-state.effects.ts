import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as AccountActions from "./account-page-state.actions"
import { AppState } from "src/app/app.state";
import { Store } from "@ngrx/store";


@Injectable()
export class AccountEffects {
    constructor(
        private actions: Actions,
        private store: Store<AppState>) {
    }
    
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