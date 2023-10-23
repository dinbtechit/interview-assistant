import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select } from "@ngxs/store";
import { PositionState } from "./store/position/position.state";
import { Observable } from "rxjs";
import { PositionStateModel } from "./store/position/position.model";
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-position',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
      <div class="h-full flex flex-col p-5">
          <div *ngIf="positionState$ | async as state" class="flex flex-row flex-wrap">
              <ng-container *ngFor="let position of state.positions">
                  <div class="card border
                              dark:border-gray-800 dark:bg-base-300/25 w-96 bg-base-100 shadow-xl
                              hover:bg-base-300/95 hover:cursor-pointer
                             "
                       [routerLink]="['/iv/' + position.id + '/0/0']">
                      <div class="card-body">
                          <h2 class="card-title">{{position.name}}</h2>
                          <p>id: {{position.id}}</p>
                          <p>Panel Members: {{position.panelMembersArr.length}}</p>
                         <!-- <div class="card-actions justify-end">
                          &lt;!&ndash;    <button class="btn btn-primary">Buy Now</button>&ndash;&gt;
                          </div>-->
                      </div>
                  </div>
              </ng-container>
          </div>
      </div>
  `,
  styles: [
  ]
})
export class PositionComponent {

  @Select(PositionState)
  positionState$: Observable<PositionStateModel>



}
