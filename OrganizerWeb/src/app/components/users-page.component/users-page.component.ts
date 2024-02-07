import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { loadUsers } from './users-page-state/users-page-state.actions';
import { selectUsers } from './users-page-state/users-page-state.selectors';
import { TranslationService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit, OnDestroy {
  title = 'Użytkownicy - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  
  public Users$ = this.store.select(selectUsers);

  constructor(public store: Store<AppState>, public translations: TranslationService)
  {
    this.subscriptions = []
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}