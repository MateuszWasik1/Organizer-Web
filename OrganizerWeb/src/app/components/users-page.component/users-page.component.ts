import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { cleanState, deleteUser, loadUsers } from './users-page-state/users-page-state.actions';
import { selectErrorMessage, selectUsers } from './users-page-state/users-page-state.selectors';
import { TranslationService } from 'src/app/services/translate.service';
import { Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit, OnDestroy {
  title = 'Użytkownicy - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public roles: any;

  public Users$ = this.store.select(selectUsers);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService,
    public router: Router,
    public errorHandler: MainUIErrorHandler)
  {
    this.subscriptions = []
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());

    this.roles = [
      {id: '1', name: 'Użytkownik'},
      {id: '2', name: 'Wsparcie'},
      {id: '3', name: 'Admin'},
    ];

    this.subscriptions.push(
      this.ErrorMessage$.subscribe(error => {
        this.errorHandler.HandleException(error);
      })
    )
  }

  public GoToUser = (ugid: string) => this.router.navigate([`/user/${ugid}`]);

  public DisplayRoles = (role: number) => this.roles[role - 1].name;

  public DeleteUser = (ugid: string) => this.store.dispatch(deleteUser({ ugid: ugid }))

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}