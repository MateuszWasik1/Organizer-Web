import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Guid } from 'guid-typescript';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { StatsFillDataDialogComponent } from './stats-page-dialogs/stats-fill-data-dialog.component';
import { changeDateFilter, loadCustomStats, loadStats } from './stats-page-state/stats-page-state.actions';
import { selectErrors, selectFilters } from './stats-page-state/stats-page-state.selectors';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss']
})
export class StatsPageComponent implements OnInit, OnDestroy {
  title = 'Statystyki - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public filterForm: FormGroup = new FormGroup({});
  
  public Filters$ = this.store.select(selectFilters);
  public IsStatsError$ = this.store.select(selectErrors);

  constructor(public store: Store<AppState>, private dialog: MatDialog){
    this.subscriptions = []
  }
  ngOnInit(): void {
    this.store.dispatch(loadStats());

    this.subscriptions.push(
      this.Filters$.subscribe(() => this.store.dispatch(loadStats())
    ));

    this.filterForm.valueChanges.subscribe(x => this.store.dispatch(changeDateFilter({date: x})))

    this.subscriptions.push(
      this.IsStatsError$.subscribe(isError => {
        if(isError)
          this.dialog
          .open(StatsFillDataDialogComponent)
          .afterClosed()
          .subscribe(fill => {
            if(fill)
              this.store.dispatch(loadCustomStats());
          });
      })
    )
  }
  // public setMonthAndYear(normalizedMonth: any, datepicker: MatDatepicker<Moment>) {
  //   this.filterForm.patchValue({ date: new Date(normalizedMonth)});
  //   datepicker.close();
  // }

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
