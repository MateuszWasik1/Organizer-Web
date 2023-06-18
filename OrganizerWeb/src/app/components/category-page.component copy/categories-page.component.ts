import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { loadCategories } from './categories-page-state/categories-page-state.actions';
import { selectCategories } from './categories-page-state/categories-page-state.selectors';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit, OnDestroy {
  title = 'Kategorie - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];

  public Categories$ = this.store.select(selectCategories)

  constructor(public store: Store<AppState>){
    this.subscriptions = []
  }
  ngOnInit(): void {
    this.store.dispatch(loadCategories());
  }

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
