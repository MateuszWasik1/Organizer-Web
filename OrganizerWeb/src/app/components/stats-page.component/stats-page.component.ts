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
import { ChartOptions } from 'chart.js';


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

  public barChartOptions: ChartOptions = {
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  public barChartData = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
      { data: [28, 48, 46, 19, 86, 26, 90], label: 'Series C' },
    ],
  }; 


  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
