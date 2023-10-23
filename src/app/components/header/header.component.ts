import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from "common";
import { CountdownComponent } from "../interviewer-view/components/countdown.component";
import { Select, Store } from "@ngxs/store";
import { StepsComponent } from "../interviewer-view/components/steps.component";
import { Logout } from "../../store/auth/auth.actions";
import { lastValueFrom } from "rxjs";
import { Router } from "@angular/router";
import { UserAvatarComponent } from "./component/user-avatar.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent, CountdownComponent, StepsComponent, UserAvatarComponent],
  template: `
      <div class="header p-1">
          <div class="flex ml-4">
            <h1 class="lg:text-2xl text-lg font-bold">Interview Assistant</h1>
          </div>
         <!-- <app-steps class="overflow-x-auto"></app-steps>-->
          <div class="flex flex-row lg:mr-10 items-center">
            <app-countdown></app-countdown>
            <lib-theme-switcher></lib-theme-switcher>
            <!--<svg class="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
            </svg>-->
            <app-user-avatar></app-user-avatar>
          </div>
      </div>
  `,
  styles: [`
    .header {
      @apply shadow-md flex flex-row justify-between items-center;
    }
  `]
})
export class HeaderComponent {


}
