import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
// import { changeDateFilter, deleteCategory, loadCategories, saveCategory, loadCustomCategories } from './categories-page-state/categories-page-state.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { TranslationService } from 'src/app/services/translate.service';
import { selectBugs } from './bugs-page-state/bugs-page-state.selectors';
import { loadBugs } from './bugs-page-state/bugs-page-state.actions';

@Component({
  selector: 'app-bugs-page',
  templateUrl: './bugs-page.component.html',
  styleUrls: ['./bugs-page.component.scss']
})
export class BugsPageComponent implements OnInit, OnDestroy {
  title = 'Błędy - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public ShowAddModal: boolean = false;
  public form: FormGroup = new FormGroup({});
  public filterForm: FormGroup = new FormGroup({});
  
  public Bugs$ = this.store.select(selectBugs);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService)
  {
    this.subscriptions = []
  }
  ngOnInit(): void {
    this.store.dispatch(loadBugs());

    this.filterForm = new FormGroup({
      date: new FormControl(formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1), 'yyyy-MM-dd', 'en'))
    })

    // this.subscriptions.push(
    //   this.Filters$.subscribe(() => this.store.dispatch(loadCategories())
    // ));

    // this.filterForm.valueChanges.subscribe(x => this.store.dispatch(changeDateFilter({date: x})))
  }
  // public setMonthAndYear(normalizedMonth: any, datepicker: MatDatepicker<Moment>) {
  //   this.filterForm.patchValue({ date: new Date(normalizedMonth)});
  //   datepicker.close();
  // }
  public AddBug = () => {
    console.log("test")
    // this.ShowAddModal = !this.ShowAddModal;
    
    // this.form.get("cid")?.setValue(0);
    // this.form.get("cgid")?.setValue(Guid.create().toString());
    // this.form.get("cName")?.setValue('');
    // this.form.get("cStartDate")?.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    // this.form.get("cEndDate")?.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    // this.form.get("cBudget")?.setValue(0);
  }

  public ModifyBug = (bug: any) => {
    console.log("test")

    // this.ShowAddModal = !this.ShowAddModal;

    // this.form.get("cid")?.setValue(category.cid);
    // this.form.get("cgid")?.setValue(category.cgid);
    // this.form.get("cName")?.setValue(category.cName);
    // this.form.get("cStartDate")?.setValue(formatDate(category.cStartDate, 'yyyy-MM-dd', 'en'));
    // this.form.get("cEndDate")?.setValue(formatDate(category.cEndDate, 'yyyy-MM-dd', 'en'));
    // this.form.get("cBudget")?.setValue(category.cBudget);
  }

  // public Save = () => {
  //   let model = {
  //     "CID": this.form.get("cid")?.value,
  //     "CGID": this.form.get("cgid")?.value,
  //     "CName": this.form.get("cName")?.value,
  //     "CStartDate": this.form.get("cStartDate")?.value,
  //     "CEndDate": this.form.get("cEndDate")?.value,
  //     "CBudget": this.form.get("cBudget")?.value,
  //   }
  //   this.store.dispatch(saveCategory({ category: model }));
  // }

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
