import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select, Store } from "@ngxs/store";
import { Router } from "@angular/router";
import { lastValueFrom, Observable } from "rxjs";
import { Logout } from "../../../store/auth/auth.actions";
import { AuthState, AuthStateModel } from "../../../store/auth/auth.state";

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
      <ng-container *ngIf="authState$ | async as state">
          <div *ngIf="state.isLoggedIn" class="ml-3 dropdown dropdown-end">
              <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                  <div class="w-10 rounded-full">
                      <img alt="" referrerpolicy=“no-referrer” (error)="onImageError($event)" [src]="state.photoUrl"/>
                  </div>
              </label>
              <ul tabindex="0"
                  class="z-[1] p-2 shadow-lg menu menu-sm dropdown-content border border-gray-200 dark:border-gray-700
                  bg-white dark:bg-gray-900 rounded-box w-52">
                  <li class="flex flex-row ml-3 mb-3 mt-3 pb-3 items-center border-b-[0.5px] dark:border-gray-700">
                    {{state.displayName}}
                  </li>
                  <!--<li>
                      <a class="justify-between">
                          Profile
                          <span class="badge">New</span>
                      </a>
                  </li>-->
                  <li (click)="logout()"><a>Logout</a></li>
              </ul>
          </div>
      </ng-container>
  `,
  styles: [
  ]
})
export class UserAvatarComponent {
  store = inject(Store)
  router = inject(Router)

  @Select(AuthState)
  authState$: Observable<AuthStateModel>;

  onImageError(event: Event):void {
    (event.target as HTMLImageElement).src = 'https://picsum.photos/200'
  }

  async logout() {
    await lastValueFrom(this.store.dispatch(new Logout()))
    await this.router.navigateByUrl('login')
  }


}
