import { inject, Injectable } from '@angular/core';
import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import { CheckLoginStatus, Login, Logout } from './auth.actions';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { Router } from "@angular/router";

export interface AuthStateModel {
  isLoggedIn: boolean;
  user?: NonNullable<unknown> | null;
  displayName?: string | null;
  photoUrl?: string | null;
}

const defaults: AuthStateModel = {
  isLoggedIn: false,
};

@State<AuthStateModel>({
  name: 'auth',
  defaults
})
@Injectable()
export class AuthState implements NgxsOnInit {


  fireAuth = inject(AngularFireAuth)
  router = inject(Router)

  ngxsOnInit(ctx: StateContext<any>): void {
    ctx.dispatch(new CheckLoginStatus())
  }

  @Action(CheckLoginStatus)
  async checkLoginStatus({ setState, patchState }: StateContext<AuthStateModel>) {
    await this.fireAuth.onAuthStateChanged(async (user) => {
      if (user) {
        patchState({
          isLoggedIn: true,
          photoUrl: user.photoURL,
          displayName: user.displayName
        })
      } else {
        setState({
          isLoggedIn: false
        })
        await this.router.navigateByUrl('login')
      }
    })

  }

  @Action(Login)
  async login({ setState, patchState }: StateContext<AuthStateModel>) {
    await this.fireAuth.signInWithPopup(new GoogleAuthProvider())
    await this.fireAuth.setPersistence('session')
  }

  @Action(Logout)
  async logout({ patchState }: StateContext<AuthStateModel>) {
    await this.fireAuth.signOut()
  }

}
