import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { changeDateFilter, deleteCategory, loadCategories, loadCustomCategories, cleanState, updatePaginationData } from './categories-page-state/categories-page-state.actions';
import { selectCategories, selectCount, selectErrorMessage, selectErrors, selectFilters } from './categories-page-state/categories-page-state.selectors';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesFillDataDialogComponent } from './categories-dialogs/categories-fill-data-dialog.component';
import { TranslationService } from 'src/app/services/translate.service';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit, OnDestroy {
  title = 'Kategorie - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public form: FormGroup = new FormGroup({});
  public filterForm: FormGroup = new FormGroup({});
  public count: number = 0;
  
  public Categories$ = this.store.select(selectCategories);
  public Filters$ = this.store.select(selectFilters);
  public Count$ = this.store.select(selectCount);
  public IsCategoriesError$ = this.store.select(selectErrors);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(public store: Store<AppState>, 
    private dialog: MatDialog,
    public router: Router,
    public translations: TranslationService,
    public errorHandler: MainUIErrorHandler)
  {
    this.subscriptions = []
  }
  ngOnInit(): void {
    this.filterForm = new FormGroup({
      date: new FormControl(formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'yyyy-MM-dd', 'en'))
    })

    this.subscriptions.push(
      this.Filters$.subscribe(() => this.store.dispatch(loadCategories())
    ));

    this.filterForm.valueChanges.subscribe(x => this.store.dispatch(changeDateFilter({date: x})))

    this.subscriptions.push(
      this.IsCategoriesError$.subscribe(isError => {
        if(isError)
          this.dialog
          .open(CategoriesFillDataDialogComponent)
          .afterClosed()
          .subscribe(fill => {
            if(fill)
              this.store.dispatch(loadCustomCategories());
          });
      })
    )

    this.subscriptions.push(
      this.ErrorMessage$.subscribe(error => {
        this.errorHandler.HandleException(error);
      })
    );
    
    this.subscriptions.push(this.Count$.subscribe(count => this.count = count));
  }

  public setMonthAndYear(normalizedMonth: any, datepicker: MatDatepicker<Moment>) {
    this.filterForm.patchValue({ date: new Date(normalizedMonth)});
    datepicker.close();
  }

  public UpdatePaginationData = (PaginationData: any) => this.store.dispatch(updatePaginationData({ PaginationData: PaginationData }));

  public AddCategory = () => this.router.navigate(['categories/0']);

  public ModifyCategory= (cgid: any) => this.router.navigate([`categories/${cgid}`]);

  public DeleteCategory = (cGID: any) => this.store.dispatch(deleteCategory({ cGID: cGID }))

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}
