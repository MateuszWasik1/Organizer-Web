import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import * as CategoriesActions from "./tasks-page-state.actions"
import { TasksService } from "src/app/services/tasks.service";
import { CategoriesService } from "src/app/services/categories.service";
import { selectFilters } from "./tasks-page-state.selectors";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { FillDataService } from "src/app/services/fill-data.service";

@Injectable()
export class TasksEffects {
    constructor(
        private actions: Actions,
        private tasksService: TasksService,
        private categoriesService: CategoriesService,
        public store: Store<AppState>,
        private fillDataService: FillDataService) {
    }
    loadTasks = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadTasks),
            withLatestFrom(this.store.select(selectFilters)),
            switchMap((params) => {
                return this.tasksService.getTasks(params[1].Category, params[1].Status).pipe(
                    map((result) => CategoriesActions.loadTasksSuccess({ Tasks: result })),
                    catchError((error) => of(CategoriesActions.loadTasksError()))
                )
            })
        )
    })

    loadCategories = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadCategories),
            switchMap((params) => {
                return this.categoriesService.getCategories(null, true).pipe(
                    map((result) => CategoriesActions.loadCategoriesSuccess({ Categories: result })),
                    catchError((error) => of(CategoriesActions.loadCategoriesError()))
                )
            })
        )
    })

    loadCustomTasks = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadCustomTasks),
            switchMap((params) => {
                return of(this.fillDataService.FillTasks()).pipe(
                    map((result) => CategoriesActions.loadTasksSuccess({ Tasks: result })),
                    catchError((error) => of(CategoriesActions.loadTasksError()))
                )
            })
        )
    })

    loadCustomCategories = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadCustomCategories),
            switchMap((params) => {
                return of(this.fillDataService.FillCategories()).pipe(
                    map((result) => CategoriesActions.loadCategoriesSuccess({ Categories: result })),
                    catchError((error) => of(CategoriesActions.loadCategoriesError()))
                )
            })
        )
    })

    saveTask = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.saveTask),
            switchMap((params) => {
                return this.tasksService.saveTask(params.Task).pipe(
                    map((result) => CategoriesActions.saveTaskSuccess({ Task: params.Task })),
                    catchError((error) => of(CategoriesActions.saveTaskError()))
                )
            })
        )
    })

    deleteTask = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.deleteTask),
            switchMap((params) => {
                return this.tasksService.deleteTask(params.tgid).pipe(
                    map((result) => CategoriesActions.deleteTaskSuccess({ tgid: params.tgid })),
                    catchError((error) => of(CategoriesActions.deleteTaskError()))
                )
            })
        )
    })
}