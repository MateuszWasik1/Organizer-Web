import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { CalculateCategoryBudget, addTask, addTaskSubTask, cleanState, deleteTaskNote, deleteTaskSubTask, loadCategories, loadTask, loadTasksNotes, loadTasksSubTasks, saveTaskNote, taskSubTaskChangeStatus, updatePaginationDataTasksNotes, updatePaginationDataTasksSubTasks, updateTask } from '../tasks-page-state/tasks-page-state.actions';
import { selectBudgetOverrunMessage, selectCategories, selectCountTasksNotes, selectCountTasksSubTasks, selectErrorMessage, selectFiltersTasksNotes, selectFiltersTasksSubTasks, selectTask, selectTasksNotes, selectTasksSubTasks, selectTasksSubTasksProgressBar } from '../tasks-page-state/tasks-page-state.selectors';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})

export class TaskPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];
  public statuses: any;
  public selectedStatus: number = 0;
  public selectedCategory: string = "";
  public countTaskNotes: number = 0;
  public countTaskSubTasks: number = 0;

  public form: FormGroup = new FormGroup({});
  public addTaskNote: FormGroup = new FormGroup({});
  public addTaskSubTasks: FormGroup = new FormGroup({});
  public tgid: string = "";
  public isNewTaskView: boolean = true;

  public categories: any = [];

  public Task$ = this.store.select(selectTask);
  public TaskNotes$ = this.store.select(selectTasksNotes);
  public TaskSubTasks$ = this.store.select(selectTasksSubTasks);
  public TaskSubTasksProgressBar$ = this.store.select(selectTasksSubTasksProgressBar);
  public Categories$ = this.store.select(selectCategories);
  public FiltersTaskNotes$ = this.store.select(selectFiltersTasksNotes);
  public FiltersTaskSubTask$ = this.store.select(selectFiltersTasksSubTasks);
  public CountTaskNotes$ = this.store.select(selectCountTasksNotes);
  public CountTaskSubTask$ = this.store.select(selectCountTasksSubTasks);
  public BudgetOverrunMessage$ = this.store.select(selectBudgetOverrunMessage);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService,
    public route: ActivatedRoute,
    public router: Router,
    public errorHandler: MainUIErrorHandler)
  {
    this.subscriptions = []
  }
  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    
    this.subscriptions.push(
      this.Categories$.subscribe(categories => {
        this.categories = categories;
        this.selectedCategory = this.categories.length != 0 ? this.categories.find((x: any) => x.cgid == this.form.get("TCGID")?.value).cgid : "";
      })
    );

    this.tgid = this.route.snapshot.paramMap.get('tgid') ?? "";
    this.isNewTaskView = this.tgid == "" || this.tgid == "0";

    if(!this.isNewTaskView){
      this.store.dispatch(loadTask({ TGID: this.tgid }));
      this.store.dispatch(loadTasksNotes({ TGID: this.tgid }));
      this.store.dispatch(loadTasksSubTasks({ TGID: this.tgid }));
    }
    
    this.statuses = [
      {id: '0', name: 'Nie zaczęty'},
      {id: '1', name: 'W trakcie'},
      {id: '2', name: 'Skończony'},
    ]

    this.subscriptions.push(
      this.Task$.subscribe(x =>{
        this.form = new FormGroup({
          TGID: new FormControl( x.TGID, { validators: [] }),
          TCGID: new FormControl( x.TCGID, { validators: [] }),
          TName: new FormControl( x.TName, { validators: [ Validators.required, Validators.maxLength(300) ] }),
          TLocalization: new FormControl( x.TLocalization, { validators: [ Validators.required, Validators.maxLength(300) ] }),
          TTime: new FormControl( x.TTime, { validators: [ Validators.required ] }),
          TBudget: new FormControl( x.TBudget, { validators: [ Validators.required, Validators.min(0) ] }),
        })

        this.selectedStatus = this.statuses[x.TStatus].id;
        this.selectedCategory = this.categories.length != 0 ? this.categories.find((x: any) => x.cgid == x.TCGID).cgid : "";
      })
    );

    this.subscriptions.push(
      this.ErrorMessage$.subscribe(error => {
        this.errorHandler.HandleException(error);
      })
    );
 
    this.addTaskNote = new FormGroup({
      taskNote: new FormControl('', { validators: [ Validators.required, Validators.maxLength(2000) ] }),
    });

    this.addTaskSubTasks = new FormGroup({
      subTaskTitle: new FormControl('', { validators: [ Validators.required, Validators.maxLength(200) ] }),
      subTaskText: new FormControl('', { validators: [ Validators.required, Validators.maxLength(2000) ] }),
    });

    this.subscriptions.push(this.FiltersTaskNotes$.subscribe(() => this.store.dispatch(loadTasksNotes({ TGID: this.tgid }))));

    this.subscriptions.push(this.FiltersTaskSubTask$.subscribe(() => this.store.dispatch(loadTasksSubTasks({ TGID: this.tgid }))));

    this.subscriptions.push(this.CountTaskNotes$.subscribe(countTaskNotes => this.countTaskNotes = countTaskNotes));

    this.subscriptions.push(this.CountTaskSubTask$.subscribe(countTaskSubTasks => this.countTaskSubTasks = countTaskSubTasks));
  }

  public TaskCategoryChange = (category: any) => this.store.dispatch(CalculateCategoryBudget({ CGID: category.value, Budget: this.form.get("TBudget")?.value }));

  public ChangeBudget = (x: any) => this.store.dispatch(CalculateCategoryBudget({ CGID: this.selectedCategory, Budget: this.form.get("TBudget")?.value }));

  public SaveTask = () => {
    let model = {
      "TGID": this.form.get("TGID")?.value,
      "TCGID": this.selectedCategory,
      "TName": this.form.get("TName")?.value,
      "TLocalization": this.form.get("TLocalization")?.value,
      "TTime": this.form.get("TTime")?.value,
      "TBudget": this.form.get("TBudget")?.value,
      "TStatus": this.selectedStatus,
    }

    if(model.TGID == "0" || model.TGID == "")
      this.store.dispatch(addTask({ Task: model }));
    else
      this.store.dispatch(updateTask({ Task: model }));
  }

  public AddTaskNote = () => this.store.dispatch(saveTaskNote({ TNGID: Guid.create().toString(), TGID: this.form.get("TGID")?.value, TaskNote: this.addTaskNote.get("taskNote")?.value }));

  public DeleteTaskNote = (tngid: any) => this.store.dispatch(deleteTaskNote({ TNGID: tngid }))

  public AddSubTask = () => {
    let model = {
      TSTGID: Guid.create().toString(),
      TSTTGID: this.form.get("TGID")?.value,
      TSTTitle: this.addTaskSubTasks.get("subTaskTitle")?.value,
      TSTText: this.addTaskSubTasks.get("subTaskText")?.value,
    };

    this.addTaskSubTasks.get("subTaskTitle")?.patchValue(""),
    this.addTaskSubTasks.get("subTaskText")?.patchValue(""),

    this.store.dispatch(addTaskSubTask({ SubTask: model }));
  }

  public SubTaskStatusChange = (event: any, tstgid: string) => {
    let model = {
      TSTGID: tstgid,
      Status: event.value,
    };

    this.store.dispatch(taskSubTaskChangeStatus({ Model: model }));
  }

  public DeleteSubTask = (TSTGID: any) => this.store.dispatch(deleteTaskSubTask({ TSTGID: TSTGID }));

  public DisplayStatus = (status: number) => this.statuses[status].name;

  public Cancel = () => this.router.navigate(["/tasks"]);

  public UpdatePaginationDataTaskNotes = (PaginationData: any) => this.store.dispatch(updatePaginationDataTasksNotes({ PaginationData: PaginationData }));

  public UpdatePaginationDataTaskSubTasks = (PaginationData: any) => this.store.dispatch(updatePaginationDataTasksSubTasks({ PaginationData: PaginationData }));

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}