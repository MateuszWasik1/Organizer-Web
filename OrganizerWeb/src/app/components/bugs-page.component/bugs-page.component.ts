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
import { Router } from '@angular/router';

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
    public translations: TranslationService,
    public router: Router)
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
  public AddBug = () => this.router.navigate(['bugs/0'])

  public ModifyBug = (bgid: any) => this.router.navigate([`bugs/${bgid}`])

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
