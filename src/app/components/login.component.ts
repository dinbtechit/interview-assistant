import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { Store } from "@ngxs/store";
import { Login } from "../store/auth/auth.actions";
import { lastValueFrom } from "rxjs";
import { redirectLoggedInTo } from "@angular/fire/auth-guard";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
      <div class="flex flex-col justify-center items-center h-full">
          <div class="max-w-md w-full flex flex-col items-center">
              <div class="w-full">
                  <div class="form-control">
                      <label class="label" for="email">
                          <span class="label-text">Email / Phone Number</span>
                      </label>
                      <input type="text" id="email" placeholder="Enter your Email"
                             class="input input-bordered"/>
                  </div>
              </div>
              <div class="w-full">
                  <div class="form-control mt-5">
                      <label class="label" for="interviewCode">
                          <span class="label-text">Interview Code</span>
                      </label>
                      <input type="password" id="interviewCode" placeholder="XXX-XXX-XX"
                             class="input input-bordered"/>
                  </div>
                  <div>
                      <p class="mt-8">
                          <button class="btn btn-primary w-full" routerLink="/cv">Login</button>
                      </p>
                      <div class="w-full flex flex-col justify-center items-center mt-8">
                          - or -
                      </div>
                      <p class="mt-8">
                          <button class="btn btn-primary w-full"
                                  (click)="login()">Login with Google</button>
                      </p>
                      <p class="mt-8">
                          <button class="btn btn-primary w-full" routerLink="/iv">Login with Microsoft</button>
                      </p>
                  </div>
              </div>
          </div>
      </div>
  `,
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  store = inject(Store)
  router = inject(Router)
  fireAuth = inject(AngularFireAuth)


  async ngOnInit(): Promise<void> {
    this.fireAuth.authState.subscribe(async (user) => {
      if (user) {
        const v = await user.getIdToken(true)
        if (v) {
          //await this.router.navigateByUrl('interviewer-view')
          await this.router.navigateByUrl('positions')
        }
      }
    })
  }


  async login(){
    await lastValueFrom(this.store.dispatch(new Login()))
  }

}
