import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
    <div class="h-full flex flex-col">
        <app-header></app-header>
        <div class="flex-grow">
            <router-outlet></router-outlet>
        </div>
    </div>
  `,
  styles: [`
    :host {
      height: 100%;
    }
  `]
})
export class AppComponent {

}
