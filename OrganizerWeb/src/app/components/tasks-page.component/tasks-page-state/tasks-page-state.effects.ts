import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap} from "rxjs/operators";
import * as CategoriesActions from "./tasks-page-state.actions"
import { TasksService } from "src/app/services/tasks.service";
import { CategoriesService } from "src/app/services/categories.service";

@Injectable()
export class TasksEffects {
    constructor(
        private actions: Actions,
        private tasksService: TasksService,
        private categoriesService: CategoriesService) {
    }
    loadTasks = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadTasks),
            switchMap((params) => {
                return this.tasksService.getTasks().pipe(
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
                return this.categoriesService.getCategories().pipe(
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