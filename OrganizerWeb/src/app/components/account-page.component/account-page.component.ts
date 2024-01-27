import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
// import { changeDateFilter, deleteCategory, loadCategories, saveCategory, loadCustomCategories } from './categories-page-state/categories-page-state.actions';
// import { selectCategories, selectErrors, selectFilters } from './categories-page-state/categories-page-state.selectors';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Guid } from 'guid-typescript';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { MatDialog } from '@angular/material/dialog';
// import { CategoriesFillDataDialogComponent } from './categories-dialogs/categories-fill-data-dialog.component';
import { TranslationService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  title = 'Kategorie - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public ShowAddModal: boolean = false;
  public form: FormGroup = new FormGroup({});
  public filterForm: FormGroup = new FormGroup({});
  
  // public Categories$ = this.store.select(selectCategories);
  // public Filters$ = this.store.select(selectFilters);
  // public IsCategoriesError$ = this.store.select(selectErrors);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService)
  {
    this.subscriptions = []
  }
  ngOnInit(): void {
  //   this.store.dispatch(loadCategories());

  //   this.form = new FormGroup({
  //     cid: new FormControl(0, {validators: [] }),
  //     cgid: new FormControl('', {validators: [] }),
  //     cName: new FormControl('', {validators: [Validators.required] }),
  //     cStartDate: new FormControl(new Date(), {validators: [Validators.required] }),
  //     cEndDate: new FormControl(new Date(), {validators: [Validators.required] }),
  //     cBudget: new FormControl(0, {validators: [Validators.required] }),
  //   });

  //   this.filterForm = new FormGroup({
  //     date: new FormControl(formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1), 'yyyy-MM-dd', 'en'))
  //   })

  //   this.subscriptions.push(
  //     this.Filters$.subscribe(() => this.store.dispatch(loadCategories())
  //   ));

  //   this.filterForm.valueChanges.subscribe(x => this.store.dispatch(changeDateFilter({date: x})))

  //   this.subscriptions.push(
  //     this.IsCategoriesError$.subscribe(isError => {
  //       if(isError)
  //         this.dialog
  //         .open(CategoriesFillDataDialogComponent)
  //         .afterClosed()
  //         .subscribe(fill => {
  //           if(fill)
  //             this.store.dispatch(loadCustomCategories());
  //         });
  //     })
  //   )
  }
  // public setMonthAndYear(normalizedMonth: any, datepicker: MatDatepicker<Moment>) {
  //   this.filterForm.patchValue({ date: new Date(normalizedMonth)});
  //   datepicker.close();
  // }
  // public AddCategory = () => {
  //   this.ShowAddModal = !this.ShowAddModal;
    
  //   this.form.get("cid")?.setValue(0);
  //   this.form.get("cgid")?.setValue(Guid.create().toString());
  //   this.form.get("cName")?.setValue('');
  //   this.form.get("cStartDate")?.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
  //   this.form.get("cEndDate")?.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
  //   this.form.get("cBudget")?.setValue(0);
  // }

  // public ModifyCategory = (category: any) => {
  //   this.ShowAddModal = !this.ShowAddModal;

  //   this.form.get("cid")?.setValue(category.cid);
  //   this.form.get("cgid")?.setValue(category.cgid);
  //   this.form.get("cName")?.setValue(category.cName);
  //   this.form.get("cStartDate")?.setValue(formatDate(category.cStartDate, 'yyyy-MM-dd', 'en'));
  //   this.form.get("cEndDate")?.setValue(formatDate(category.cEndDate, 'yyyy-MM-dd', 'en'));
  //   this.form.get("cBudget")?.setValue(category.cBudget);
  // }

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

  // public DeleteCategory= (cGID: any) => this.store.dispatch(deleteCategory({ cGID: cGID }))

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
