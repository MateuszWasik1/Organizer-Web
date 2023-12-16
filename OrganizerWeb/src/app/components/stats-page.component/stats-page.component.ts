import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { StatsFillDataDialogComponent } from './stats-page-dialogs/stats-fill-data-dialog.component';
import { changeCategoryFilter, changeDataTypeFilter, changeEndDateFilter, changeStartDateFilter, loadCategories, loadCategorySpendedMoneyBarChartStats, loadCustomStats, loadSavingBarChartStats, loadTaskSpendedMoneyBarChartStats } from './stats-page-state/stats-page-state.actions';
import { selectCategories, selectErrors, selectFilters, selectStats } from './stats-page-state/stats-page-state.selectors';
import { ChartOptions } from 'chart.js';


@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss']
})
export class StatsPageComponent implements OnInit, OnDestroy {
  title = 'Statystyki - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];

  public Stats$ = this.store.select(selectStats);
  public Filters$ = this.store.select(selectFilters);
  public Categories$ = this.store.select(selectCategories);
  public IsStatsError$ = this.store.select(selectErrors);

  public defaultDataType: string = "savings";
  public dataTypes = [
    {name: "Oszczędności", value: "savings"},
    {name: "Wydatki z zadań", value: "task-money"},
    {name: "Wydatki z kategorii", value: "category"},
  ]

  constructor(public store: Store<AppState>, private dialog: MatDialog){
    this.subscriptions = []
  }
  ngOnInit(): void {
    this.store.dispatch(loadSavingBarChartStats());
    this.store.dispatch(loadCategories());

    this.subscriptions.push(
      this.Filters$.subscribe(filters => {
        if(filters.DataType == "savings")
          this.store.dispatch(loadSavingBarChartStats())
        if(filters.DataType == "task-money")
          this.store.dispatch(loadTaskSpendedMoneyBarChartStats())
        if(filters.DataType == "category")
          this.store.dispatch(loadCategorySpendedMoneyBarChartStats())
      })
    );

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

  public setMonthAndYear(normalizedMonth: any, datepicker: MatDatepicker<Moment>, isStartDate: boolean) {
    console.log(normalizedMonth)
    if(isStartDate)
      this.store.dispatch(changeStartDateFilter({startDate: new Date(normalizedMonth)}))
    else
      this.store.dispatch(changeEndDateFilter({endDate: new Date(normalizedMonth)}))

    datepicker.close();
  }

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

  // public barChartData = {
  //   labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
  //   datasets: [
  //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //     { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  //     { data: [28, 48, 46, 19, 86, 26, 90], label: 'Series C' },
  //   ],
  // }; 

  public emptyChartData = {
    labels: [],
    datasets: []
  }

  public changeDataType = (dataType: any) => this.store.dispatch(changeDataTypeFilter({ dataType: dataType.value }))

  public changeCategory = (dataType: any) => this.store.dispatch(changeCategoryFilter({ category: dataType.value }))

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
