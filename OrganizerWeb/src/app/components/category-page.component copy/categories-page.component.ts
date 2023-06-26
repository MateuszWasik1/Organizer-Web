import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { loadCategories, saveCategory } from './categories-page-state/categories-page-state.actions';
import { selectCategories } from './categories-page-state/categories-page-state.selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit, OnDestroy {
  title = 'Kategorie - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public ShowAddModal: boolean = false;
  public form: FormGroup = new FormGroup({});
  
  public Categories$ = this.store.select(selectCategories)

  constructor(public store: Store<AppState>){
    this.subscriptions = []
  }
  ngOnInit(): void {
    this.store.dispatch(loadCategories());

    this.form = new FormGroup({
      CGID: new FormControl('', {validators: [] }),
      CName: new FormControl('', {validators: [Validators.required] }),
      CStartDate: new FormControl(new Date(), {validators: [Validators.required] }),
      CEndDate: new FormControl(new Date(), {validators: [Validators.required] }),
      CBudget: new FormControl(0, {validators: [Validators.required] }),
    });
  }

  public AddCategory = () => {
    this.ShowAddModal = !this.ShowAddModal;
    
    this.form.get("CGID")?.setValue('');
    this.form.get("CName")?.setValue('');
    this.form.get("CStartDate")?.setValue(new Date());
    this.form.get("CEndDate")?.setValue(new Date());
    this.form.get("CBudget")?.setValue(0);
  }

  public ModifyCategory = (category: any) => {
    this.ShowAddModal = !this.ShowAddModal;

    this.form.get("CGID")?.setValue(category.cgid);
    this.form.get("CName")?.setValue(category.cName);
    this.form.get("CStartDate")?.setValue(formatDate(category.cStartDate, 'yyyy-MM-dd', 'en'));
    this.form.get("CEndDate")?.setValue(formatDate(category.cEndDate, 'yyyy-MM-dd', 'en'));
    this.form.get("CBudget")?.setValue(category.cBudget);
  }

  public Save = () => {
    let model = {
      "CGID": this.form.get("CGID")?.value,
      "CName": this.form.get("CName")?.value,
      "CStartDate": this.form.get("CStartDate")?.value,
      "CEndDate": this.form.get("CEndDate")?.value,
      "CBudget": this.form.get("CBudget")?.value,
    }
    this.store.dispatch(saveCategory({ category: model}));
  }

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
