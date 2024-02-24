import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import * as CategoriesActions from "./categories-page-state.actions"
import { AppState } from "src/app/app.state";
import { Store } from "@ngrx/store";
import { CategoriesService } from "src/app/services/categories.service";
import { selectFilters } from "./categories-page-state.selectors";
import { FillDataService } from "src/app/services/fill-data.service";
import { APIErrorHandler } from "src/app/error-handlers/api-error-handler";

@Injectable()
export class CategoriesEffects {
    constructor(
        private actions: Actions,
        private store: Store<AppState>,
        private categoriesService: CategoriesService,
        private fillDataService: FillDataService,
        private errorHandler: APIErrorHandler) {
    }
    loadCategories = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadCategories),
            withLatestFrom(this.store.select(selectFilters)),
            switchMap((params) => {
                return this.categoriesService.getCategories(params[1].Date.date, false).pipe(
                    map((result) => CategoriesActions.loadCategoriesSuccess({ Categories: result })),
                    catchError(error => of(CategoriesActions.loadCategoriesError({ error: this.errorHandler.handleAPIError(error) }))),
                )
            })
        )
    })

    loadCustomCategories = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadCustomCategories),
            switchMap(() => {
                return of(this.fillDataService.FillCategories()).pipe(
                    map((result) => CategoriesActions.loadCategoriesSuccess({ Categories: result })),
                    catchError(error => of(CategoriesActions.loadCategoriesError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    saveCategory = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.saveCategory),
            switchMap((params) => {
                return this.categoriesService.saveCategories(params.category).pipe(
                    map(() => CategoriesActions.saveCategorySuccess({ category: params.category })),
                    catchError(error => of(CategoriesActions.saveCategoryError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    deleteCategory = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.deleteCategory),
            switchMap((params) => {
                return this.categoriesService.deleteCategories(params.cGID).pipe(
                    map(() => CategoriesActions.deleteCategorySuccess({ cGID: params.cGID })),
                    catchError(error => of(CategoriesActions.deleteCategoryError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })
}