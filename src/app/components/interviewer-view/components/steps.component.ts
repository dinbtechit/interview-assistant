import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select } from "@ngxs/store";
import { InterviewerSelectors } from "../store/interviewer/interviewer.selectors";
import { Observable } from "rxjs";
import { Topic } from "../store/interviewer/interviewer.model";

@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [CommonModule],
  template: `
      <div *ngIf="(topics$ | async); let topics"
            class="flex flex-wrap gap-5 justify-center">
          <div *ngFor="let topic of topics" class="flex flex-col justify-center items-center">
              <span>{{topic.name}}</span>
              <ul class="steps">
                  <li *ngFor="let q of topic.questions" class="step"></li>
              </ul>
          </div>
      </div>

  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class StepsComponent {
  @Select(InterviewerSelectors.technicalTopics)
  topics$: Observable<Topic[]>;
}
