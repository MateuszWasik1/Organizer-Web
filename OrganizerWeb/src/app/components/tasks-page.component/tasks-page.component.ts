import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { deleteTask, loadCategories, loadTasks, saveTask } from './tasks-page-state/tasks-page-state.actions';
import { selectCategories, selectTasks } from './tasks-page-state/tasks-page-state.selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit, OnDestroy {
  title = 'Taski - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public ShowAddModal: boolean = false;
  public form: FormGroup = new FormGroup({});
  public statuses: any;
  public selectedStatus: any;
  public selectedCategory: any;

  public Tasks$ = this.store.select(selectTasks);
  public Categories$ = this.store.select(selectCategories);

  constructor(public store: Store<AppState>){
    this.subscriptions = []
  }
  ngOnInit(): void {
    this.store.dispatch(loadTasks());
    this.store.dispatch(loadCategories());

    this.form = new FormGroup({
      tid: new FormControl(0, {validators: [] }),
      tgid: new FormControl('', {validators: [] }),
      tcgid: new FormControl('', {validators: [] }),
      tName: new FormControl('', {validators: [Validators.required] }),
      tTime: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en'), {validators: [Validators.required] }),
      tLocalization: new FormControl('', {validators: [Validators.required] }),
      tBudget: new FormControl(0, {validators: [Validators.required] }),
      tStatus: new FormControl(0, {validators: [Validators.required] }),
    });

    this.statuses = [
      {id: '1', name: 'Nie zaczęty'},
      {id: '2', name: 'W trakcie'},
      {id: '3', name: 'Skończony'},
    ];
  }

  public AddTask = () => {
    this.ShowAddModal = !this.ShowAddModal;

    this.form.get("tid")?.setValue(0);
    this.form.get("tgid")?.setValue(Guid.create().toString());
    this.form.get("tcgid")?.setValue('');
    this.form.get("tName")?.setValue('');
    this.form.get("tTime")?.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    this.form.get("tLocalization")?.setValue('');
    this.form.get("tBudget")?.setValue(0);
    this.form.get("tStatus")?.setValue(0);
  }

  public ModifyTask = (task: any) => {
    this.ShowAddModal = !this.ShowAddModal;
    console.log(task)
    this.form.get("tid")?.setValue(task.tid);
    this.form.get("tgid")?.setValue(task.tgid);
    this.form.get("tcgid")?.setValue(task.tcgid);
    this.form.get("tName")?.setValue(task.tName);
    this.form.get("tTime")?.setValue(formatDate(task.tTime, 'yyyy-MM-dd', 'en'));
    this.form.get("tLocalization")?.setValue(task.tLocalization);
    this.form.get("tBudget")?.setValue(task.tBudget);
    this.form.get("tStatus")?.setValue(task.tStatus);
  }

  public Save = () => {
    console.log(this.form)
    console.log(this.selectedStatus)
    console.log(this.selectedCategory)
    let model = {
      "TID": this.form.get("tid")?.value,
      "TGID": this.form.get("tgid")?.value,
      "TCGID": this.selectedCategory,
      "TName": this.form.get("tName")?.value,
      "TTime": this.form.get("tTime")?.value,
      "TLocalization": this.form.get("tLocalization")?.value,
      "TBudget": this.form.get("tBudget")?.value,
      "TStatus": this.selectedStatus,
      "TUID": 0,
    }
    this.store.dispatch(saveTask({ Task: model }));
  }

  public DeleteTask = (tgid: any) => this.store.dispatch(deleteTask({ tgid: tgid }))

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
