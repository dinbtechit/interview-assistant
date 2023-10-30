import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select, Store } from "@ngxs/store";
import { ScheduledInterviewSelectors } from "./store/scheduled-interviews/scheduled-interview.selectors";
import { Observable } from "rxjs";
import { ScheduledInterview } from "./store/scheduled-interviews/scheduled-interview.model";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { LoadScheduledInterviews } from "./store/scheduled-interviews/scheduled-interviews.actions";

@Component({
  selector: 'app-scheduled-interviews',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="h-full flex flex-col p-5">
      <ng-container *ngFor="let si of (scheduledInterviews$ | async)">
        <div class="card border
                              dark:border-gray-800 dark:bg-base-300/25 w-96 bg-base-100 shadow-xl
                              hover:bg-base-300/95 hover:cursor-pointer
                             "
             [routerLink]="['/iv/' + position + '/summary']">
          <div class="card-body">
            <h2 class="card-title">{{si.candidateName}}</h2>
            <p>id: {{si.candidateEmail}}</p>
            <p>Panel Members: {{si.panelMembers.length}}</p>
            <p>Date: {{si.date.toDate() | date: 'MMM dd, YYYY hh:MM a'}}</p>
            <!-- <div class="card-actions justify-end">
             &lt;!&ndash;    <button class="btn btn-primary">Buy Now</button>&ndash;&gt;
             </div>-->
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: []
})
export class ScheduledInterviewsComponent implements OnInit {

  @Select(ScheduledInterviewSelectors.scheduledInterviews)
  scheduledInterviews$: Observable<Array<ScheduledInterview>>;

  store = inject(Store);
  activatedRoute = inject(ActivatedRoute);
  position: string

  ngOnInit(): void {
    this.position = this.activatedRoute.snapshot.paramMap.get('position');
    this.store.dispatch(new LoadScheduledInterviews(this.position))
  }

}
