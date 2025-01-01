import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { StatsFillDataDialogComponent } from './stats-page-dialogs/stats-fill-data-dialog.component';
import { changeCategoryFilter, changeDataTypeFilter, changeEndDateFilter, changeStartDateFilter, cleanState, loadCategories, loadCategorySpendedMoneyBarChartStats, loadCustomStats, loadNotesBarChartStats, loadSavingBarChartStats, loadTaskSpendedMoneyBarChartStats } from './stats-page-state/stats-page-state.actions';
import { selectCategories, selectErrorMessage, selectErrors, selectFilters, selectStats } from './stats-page-state/stats-page-state.selectors';
import { ChartOptions } from 'chart.js';
import { TranslationService } from 'src/app/services/translate.service';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss']
})
export class StatsPageComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];

  public Stats$ = this.store.select(selectStats);
  public Filters$ = this.store.select(selectFilters);
  public Categories$ = this.store.select(selectCategories);
  public IsStatsError$ = this.store.select(selectErrors);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  public defaultDataType: string = "savings";
  public dataTypes = [
    {name: "Oszczędności", value: "savings"},
    {name: "Wydatki z zadań", value: "task-money"},
    {name: "Wydatki z kategorii", value: "category"},
    {name: "Notatki", value: "notes"},
  ]

  constructor(public store: Store<AppState>, 
    private dialog: MatDialog,
    public translations: TranslationService,
    public errorHandler: MainUIErrorHandler)
  {
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
        if(filters.DataType == "notes")
          this.store.dispatch(loadNotesBarChartStats())
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
    );

    this.subscriptions.push(
      this.ErrorMessage$.subscribe(error => {
        this.errorHandler.HandleException(error);
      })
    )
  }

  public setMonthAndYear(normalizedMonth: any, datepicker: MatDatepicker<Moment>, isStartDate: boolean) {
    if(isStartDate)
      this.store.dispatch(changeStartDateFilter({ startDate: normalizedMonth.value }));
    else{
      this.store.dispatch(changeEndDateFilter({ endDate: normalizedMonth.value }))
    }

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

  public emptyChartData = {
    labels: [],
    datasets: []
  }

  public changeDataType = (dataType: any) => this.store.dispatch(changeDataTypeFilter({ dataType: dataType.value }))

  public changeCategory = (dataType: any) => this.store.dispatch(changeCategoryFilter({ category: dataType.value }))

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}