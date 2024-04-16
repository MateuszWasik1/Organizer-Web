import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import * as CategoriesActions from "./categories-page-state.actions"
import { AppState } from "src/app/app.state";
import { Store } from "@ngrx/store";
import { CategoriesService } from "src/app/services/categories.service";
import { selectFilters } from "./categories-page-state.selectors";
import { FillDataService } from "src/app/services/fill-data.service";
import { APIErrorHandler } from "src/app/error-handlers/api-error-handler";
import { Router } from "@angular/router";

@Injectable()
export class CategoriesEffects {
    constructor(
        private actions: Actions,
        private store: Store<AppState>,
        private router: Router,
        private categoriesService: CategoriesService,
        private fillDataService: FillDataService,
        private errorHandler: APIErrorHandler) {
    }

    loadCategory = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadCategory),
            switchMap((params) => {
                return this.categoriesService.GetCategory(params.CGID).pipe(
                    map((result) => CategoriesActions.loadCategorySuccess({ Category: result })),
                    catchError(error => of(CategoriesActions.loadCategoryError({ error: this.errorHandler.handleAPIError(error) }))),
                )
            })
        )
    })

    loadCategories = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadCategories),
            withLatestFrom(this.store.select(selectFilters)),
            switchMap((params) => {
                return this.categoriesService.GetCategories(params[1].Date.date, params[1].Skip, params[1].Take, false).pipe(
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

    addCategory = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.addCategory),
            switchMap((params) => {
                return this.categoriesService.AddCategory(params.Category).pipe(
                    map(() => CategoriesActions.addCategorySuccess()),
                    tap(() => this.router.navigate(["/categories"])),
                    catchError(error => of(CategoriesActions.addCategoryError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    updateCategory = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.updateCategory),
            switchMap((params) => {
                return this.categoriesService.UpdateCategory(params.Category).pipe(
                    map(() => CategoriesActions.updateCategorySuccess()),
                    tap(() => this.router.navigate(["/categories"])),
                    catchError(error => of(CategoriesActions.updateCategoryError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    deleteCategory = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.deleteCategory),
            switchMap((params) => {
                return this.categoriesService.DeleteCategories(params.cGID).pipe(
                    map(() => CategoriesActions.deleteCategorySuccess({ cGID: params.cGID })),
                    catchError(error => of(CategoriesActions.deleteCategoryError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })
}