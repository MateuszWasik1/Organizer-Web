import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { MatDialog } from '@angular/material/dialog';
import { SavingsFillDataDialogComponent } from './savings-page-dialogs/savings-fill-data-dialog.component';
import { cleanState, deleteSaving, loadCustomSavings, loadSavings, updatePaginationData } from './savings-page-state/savings-page-state.actions';
import { selectSavings, selectErrors, selectErrorMessage, selectFilters, selectCount } from './savings-page-state/savings-page-state.selectors';
import { TranslationService } from 'src/app/services/translate.service';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-savings-page',
  templateUrl: './savings-page.component.html',
  styleUrls: ['./savings-page.component.scss']
})
export class SavingsPageComponent implements OnInit, OnDestroy {
  title = 'Oszczędności - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public count: number = 0;

  public Savings$ = this.store.select(selectSavings);
  public Filters$ = this.store.select(selectFilters);
  public Count$ = this.store.select(selectCount);
  public IsSavingsError$ = this.store.select(selectErrors);
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
    this.store.dispatch(loadSavings());

    this.subscriptions.push(
      this.IsSavingsError$.subscribe(isError => {
        if(isError)
          this.dialog
          .open(SavingsFillDataDialogComponent)
          .afterClosed()
          .subscribe(fill => {
            if(fill)
              this.store.dispatch(loadCustomSavings());
          });
      })
    )

    this.subscriptions.push(
      this.ErrorMessage$.subscribe(error => {
        this.errorHandler.HandleException(error);
      })
    );

    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadSavings())));

    this.subscriptions.push(this.Count$.subscribe(count => this.count = count));
  }

  public AddSaving = () => this.router.navigate(['savings/0']);

  public ModifySaving = (ngid: any) => this.router.navigate([`savings/${ngid}`]);

  public DeleteSaving = (sGID: any) => this.store.dispatch(deleteSaving({ SGID: sGID }))

  public UpdatePaginationData = (PaginationData: any) => this.store.dispatch(updatePaginationData({ PaginationData: PaginationData }));

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}