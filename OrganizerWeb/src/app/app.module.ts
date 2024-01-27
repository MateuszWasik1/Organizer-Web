import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register-component/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CategoriesPageComponent } from './components/category-page.component copy/categories-page.component';
import { featureKeyCategoriesState } from './components/category-page.component copy/categories-page-state/categories-page-state.state';
import { CategoriesReducer } from './components/category-page.component copy/categories-page-state/categories-page-state.reducer';
import { CategoriesEffects } from './components/category-page.component copy/categories-page-state/categories-page-state.effects';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { TasksPageComponent } from './components/tasks-page.component/tasks-page.component';
import { featureKeyTasksState } from './components/tasks-page.component/tasks-page-state/tasks-page-state.state';
import { TasksReducer } from './components/tasks-page.component/tasks-page-state/tasks-page-state.reducer';
import { TasksEffects } from './components/tasks-page.component/tasks-page-state/tasks-page-state.effects';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { CategoriesFillDataDialogComponent } from './components/category-page.component copy/categories-dialogs/categories-fill-data-dialog.component';
import { TasksFillDataDialogComponent } from './components/tasks-page.component/tasks-dialogs/tasks-fill-data-dialog.component';
import { SavingsPageComponent } from './components/savings-page.component/savings-page.component';
import { SavingsFillDataDialogComponent } from './components/savings-page.component/savings-page-dialogs/savings-fill-data-dialog.component';
import { featureKeySavingsState } from './components/savings-page.component/savings-page-state/savings-page-state.state';
import { SavingsReducer } from './components/savings-page.component/savings-page-state/savings-page-state.reducer';
import { SavingsEffects } from './components/savings-page.component/savings-page-state/savings-page-state.effects';
import { NgChartsModule } from 'ng2-charts';
import { StatsPageComponent } from './components/stats-page.component/stats-page.component';
import { StatsFillDataDialogComponent } from './components/stats-page.component/stats-page-dialogs/stats-fill-data-dialog.component';
import { featureKeyStatsState } from './components/stats-page.component/stats-page-state/stats-page-state.state';
import { StatsReducer } from './components/stats-page.component/stats-page-state/stats-page-state.reducer';
import { StatsEffects } from './components/stats-page.component/stats-page-state/stats-page-state.effects';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AccountEffects } from './components/account-page.component/account-page-state/account-page-state.effects';
import { featureKeyAccountState } from './components/account-page.component/account-page-state/account-page-state.state';
import { AccountReducer } from './components/account-page.component/account-page-state/account-page-state.reducer';
import { AccountComponent } from './components/account-page.component/account-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    RegisterComponent,
    CategoriesPageComponent,
    CategoriesFillDataDialogComponent,
    TasksPageComponent,
    TasksFillDataDialogComponent,
    SavingsPageComponent,
    SavingsFillDataDialogComponent,
    StatsPageComponent,
    StatsFillDataDialogComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    NgxMatSelectSearchModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    NgChartsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreModule.forFeature(featureKeyAccountState, AccountReducer),
    StoreModule.forFeature(featureKeyCategoriesState, CategoriesReducer),
    StoreModule.forFeature(featureKeyTasksState, TasksReducer),
    StoreModule.forFeature(featureKeySavingsState, SavingsReducer),
    StoreModule.forFeature(featureKeyStatsState, StatsReducer),
   
    EffectsModule.forRoot([AccountEffects, CategoriesEffects, TasksEffects, SavingsEffects, StatsEffects]),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient){
  return new TranslateHttpLoader(http);
}