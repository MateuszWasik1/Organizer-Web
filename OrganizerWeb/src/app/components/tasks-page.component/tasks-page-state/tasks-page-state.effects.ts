import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import * as CategoriesActions from "./tasks-page-state.actions"
import { TasksService } from "src/app/services/tasks.service";
import { CategoriesService } from "src/app/services/categories.service";
import { selectFilters } from "./tasks-page-state.selectors";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { FillDataService } from "src/app/services/fill-data.service";
import { TasksNotesService } from "src/app/services/tasks-notes.service";
import { APIErrorHandler } from "src/app/error-handlers/api-error-handler";
import { Router } from "@angular/router";

@Injectable()
export class TasksEffects {
    constructor(
        private actions: Actions,
        private router: Router,
        private tasksService: TasksService,
        private tasksNotesService: TasksNotesService,
        private categoriesService: CategoriesService,
        public store: Store<AppState>,
        private fillDataService: FillDataService,
        private errorHandler: APIErrorHandler) {
    }

    loadTask = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadTask),
            switchMap((params) => {
                return this.tasksService.GetTask(params.TGID).pipe(
                    map((result) => CategoriesActions.loadTaskSuccess({ Task: result })),
                    catchError(error => of(CategoriesActions.loadTaskError({ error: this.errorHandler.handleAPIError(error) }))),
                )
            })
        )
    })

    loadTasks = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadTasks),
            withLatestFrom(this.store.select(selectFilters)),
            switchMap((params) => {
                return this.tasksService.GetTasks(params[1].Category, params[1].Status).pipe(
                    map((result) => CategoriesActions.loadTasksSuccess({ Tasks: result })),
                    catchError(error => of(CategoriesActions.loadTasksError({ error: this.errorHandler.handleAPIError(error) }))),
                )
            })
        )
    })

    loadTasksNotes = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadTasksNotes),
            switchMap((params) => {
                return this.tasksNotesService.getTasksNotes(params.TGID).pipe(
                    map((result) => CategoriesActions.loadTasksNotesSuccess({ TasksNotes: result })),
                    catchError(error => of(CategoriesActions.loadTasksNotesError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    loadCategories = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.loadCategories),
            switchMap((params) => {
                return this.categoriesService.GetCategories(null, true).pipe(
                    map((result) => CategoriesActions.loadCategoriesSuccess({ Categories: result })),
                    catchError(error => of(CategoriesActions.loadCategoriesError({ error: this.errorHandler.handleAPIError(error) })))
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
                    catchError(error => of(CategoriesActions.loadTasksError({ error: this.errorHandler.handleAPIError(error) })))
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
                    catchError(error => of(CategoriesActions.loadCategoriesError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    addTask = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.addTask),
            switchMap((params) => {
                return this.tasksService.AddTask(params.Task).pipe(
                    map((result) => CategoriesActions.addTaskSuccess()),
                    tap(() => this.router.navigate(["/tasks"])),
                    catchError(error => of(CategoriesActions.addTaskError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    updateTask = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.updateTask),
            switchMap((params) => {
                return this.tasksService.UpdateTask(params.Task).pipe(
                    map((result) => CategoriesActions.updateTaskSuccess()),
                    tap(() => this.router.navigate(["/tasks"])),
                    catchError(error => of(CategoriesActions.updateTaskError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    saveTaskNote = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.saveTaskNote),
            switchMap((params) => {
                return this.tasksNotesService.addTaskNotes(params.TNGID, params.TGID, params.TaskNote).pipe(
                    map((result) => CategoriesActions.saveTaskNoteSuccess({ TaskNote: params })),
                    catchError(error => of(CategoriesActions.saveTaskNoteError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    deleteTask = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.deleteTask),
            switchMap((params) => {
                return this.tasksService.DeleteTask(params.tgid).pipe(
                    map((result) => CategoriesActions.deleteTaskSuccess({ tgid: params.tgid })),
                    catchError(error => of(CategoriesActions.deleteTaskError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })

    deleteTaskNote = createEffect(() => {
        return this.actions.pipe(
            ofType(CategoriesActions.deleteTaskNote),
            switchMap((params) => {
                return this.tasksNotesService.deleteTaskNote(params.TNGID).pipe(
                    map((result) => CategoriesActions.deleteTaskNoteSuccess({ TNGID: params.TNGID })),
                    catchError(error => of(CategoriesActions.deleteTaskNoteError({ error: this.errorHandler.handleAPIError(error) })))
                )
            })
        )
    })
}