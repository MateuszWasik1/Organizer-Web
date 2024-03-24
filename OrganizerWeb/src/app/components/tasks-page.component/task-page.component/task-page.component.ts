import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/services/translate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { CalculateCategoryBudget, addTask, cleanState, deleteTaskNote, loadCategories, loadTask, loadTasksNotes, saveTaskNote, updateTask } from '../tasks-page-state/tasks-page-state.actions';
import { selectBudgetOverrunMessage, selectCategories, selectErrorMessage, selectTask, selectTasksNotes } from '../tasks-page-state/tasks-page-state.selectors';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})

export class TaskPageComponent implements OnInit, OnDestroy {
  title = 'Zadanie - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public statuses: any;
  public selectedStatus: number = 0;
  public selectedCategory: string = "";

  public form: FormGroup = new FormGroup({});
  public addTaskNote: FormGroup = new FormGroup({});
  public tgid: string = "";
  public isNewTaskView: boolean = true;

  public categories: any = [];

  public Task$ = this.store.select(selectTask);
  public TaskNotes$ = this.store.select(selectTasksNotes);
  public Categories$ = this.store.select(selectCategories);
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
    )
 
    this.addTaskNote = new FormGroup({
      taskNote: new FormControl('', { validators: [ Validators.required, Validators.maxLength(2000) ] }),
    })
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

  public Cancel = () => this.router.navigate(["/tasks"])

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}