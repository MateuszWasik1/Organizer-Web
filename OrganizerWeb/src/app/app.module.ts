import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CategoriesPageComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreModule.forFeature(featureKeyCategoriesState, CategoriesReducer),
   
    EffectsModule.forRoot([CategoriesEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
