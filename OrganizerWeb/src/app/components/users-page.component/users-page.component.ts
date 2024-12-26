import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { cleanState, deleteUser, loadUsers, updatePaginationData } from './users-page-state/users-page-state.actions';
import { selectCount, selectErrorMessage, selectFilters, selectUsers } from './users-page-state/users-page-state.selectors';
import { TranslationService } from 'src/app/services/translate.service';
import { Router } from '@angular/router';
import { MainUIErrorHandler } from 'src/app/error-handlers/main-ui-error-handler.component';
import { RolesEnum } from 'src/app/enums/RolesEnum';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit, OnDestroy {
  title = 'Użytkownicy - P1 - Mateusz Wąsik';

  public subscriptions: Subscription[];
  public roles: any;

  public count: number = 0;

  public Users$ = this.store.select(selectUsers);
  public Filters$ = this.store.select(selectFilters);
  public Count$ = this.store.select(selectCount);
  public ErrorMessage$ = this.store.select(selectErrorMessage);

  constructor(public store: Store<AppState>, 
    public translations: TranslationService,
    public router: Router,
    public errorHandler: MainUIErrorHandler)
  {
    this.subscriptions = []
  }

  ngOnInit(): void {
    this.roles = [
      {id: '1', name: RolesEnum.User },
      {id: '2', name: RolesEnum.Premium },
      {id: '3', name: RolesEnum.Support },
      {id: '4', name: RolesEnum.Admin },
    ];

    this.subscriptions.push(
      this.ErrorMessage$.subscribe(error => {
        this.errorHandler.HandleException(error);
      })
    );

    this.subscriptions.push(this.Filters$.subscribe(() => this.store.dispatch(loadUsers())));

    this.subscriptions.push(this.Count$.subscribe(count => this.count = count));
  }

  public GoToUser = (ugid: string) => this.router.navigate([`/user/${ugid}`]);

  public DisplayRoles = (role: number) => this.roles[role - 1].name;

  public DeleteUser = (ugid: string) => this.store.dispatch(deleteUser({ ugid: ugid }));

  public UpdatePaginationData = (PaginationData: any) => this.store.dispatch(updatePaginationData({ PaginationData: PaginationData }));

  ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.store.dispatch(cleanState())
  }
}