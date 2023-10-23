import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select, Store } from "@ngxs/store";
import { InterviewerSelectors } from "../store/interviewer/interviewer.selectors";
import { Observable } from "rxjs";
import { Topic } from "../store/interviewer/interviewer.model";

@Component({
  selector: 'app-quesion-answer',
  standalone: true,
  imports: [CommonModule],
  template: `

   <div class="flex flex-col justify-between h-full w-full" *ngIf="(topics$ | async); let topics">
     <div class=" lg:text-xl">
       <div class="badge badge-primary">Question</div>
       <div class="mt-3">
        {{topics[Number(topicNumber)].questions[questionNumber].question}}
       </div>
     </div>
     <hr>
     <div class="lg:text-xl text-gray-500 dark:text-gray-500">
       <div class="badge badge-primary">Answer</div>
       <div class="mt-3">
         {{topics[Number(topicNumber)].questions[questionNumber].answer}}
       </div>
     </div>
     <hr>
   </div>
  `,
  styles: [`
    :host{
      height: 100%;
    }
  `]
})
export class QuesionAnswerComponent {

  @Select(InterviewerSelectors.technicalTopics)
  topics$: Observable<Topic[]>

  store = inject(Store)

  @Input()
  questionNumber = '0'

  @Input()
  topicNumber = '0'

  protected readonly Number = Number;
}
