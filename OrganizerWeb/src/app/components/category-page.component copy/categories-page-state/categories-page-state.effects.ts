import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import * as CategoriesActions from "./categories-page-state.actions"
import { AppState } from "src/app/app.state";
import { Store } from "@ngrx/store";
import { CategoriesService } from "src/app/services/categories.service";
import { selectFilters } from "./categories-page-state.selectors";

@Injectable()
export class CategoriesEffects {
    constructor(
        private actions: Actions,
        private store: Store<AppState>,
        private categoriesService: CategoriesService) {
    }
    loadCategories = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadCategories),
            withLatestFrom(this.store.select(selectFilters)),
            switchMap((params) => {
                return this.categoriesService.getCategories(params[1].Date.date).pipe(
                    map((result) => CategoriesActions.loadCategoriesSuccess({ Categories: result })),
                    catchError((error) => of(CategoriesActions.loadCategoriesError()))
                )
            })
        )
    })

    saveCategory = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.saveCategory),
            switchMap((params) => {
                return this.categoriesService.saveCategories(params.category).pipe(
                    map((result) => CategoriesActions.saveCategorySuccess({ category: params.category })),
                    catchError((error) => of(CategoriesActions.loadCategoriesError()))
                )
            })
        )
    })
}