import { Component, inject, Input, OnInit, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownComponent } from "./components/countdown.component";
import { RangeScoreComponent } from "./components/range-score.component";
import { QuesionAnswerComponent } from "./components/quesion-answer.component";
import { StepsComponent } from "./components/steps.component";
import { Select, Store } from "@ngxs/store";
import { InterviewerSelectors } from "./store/interviewer/interviewer.selectors";
import { lastValueFrom, Observable, single } from "rxjs";
import { Topic } from "./store/interviewer/interviewer.model";
import { Load } from "./store/interviewer/interviewer.actions";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-interviewer-view',
  standalone: true,
  imports: [CommonModule, CountdownComponent, RangeScoreComponent, QuesionAnswerComponent, StepsComponent],
  template: `
    <div class="h-full flex flex-col justify-start items-center p-10 overflow-auto">
      <div class="flex flex-col w-full h-1/2 overflow-auto scroll-auto">
      <app-quesion-answer class="mt-8" [topicNumber]="topicNumber() + ''"
                          [questionNumber]="questionNumber() + ''"></app-quesion-answer>
      </div>


      <div class="mt-5 flex flex-col h-1/2 w-full">
        <app-range-score class="mt-8"></app-range-score>
        <h1 class="text-2xl">Notes</h1>
        <div contenteditable="true"
             class="p-5 rounded-md w-full border-[1px] border-gray-300 h-full text-xl">
        </div>
      </div>
      <div class="flex flex-row w-full justify-between mt-5">
        <button class="btn btn-secondary"
                [disabled]="reachedMin()"
                (click)="previousQuestion()"><</button>
        <button class="btn btn-secondary"
                [disabled]="reachedMax()"
                (click)="nextQuestion()">></button>
      </div>
    </div>
  `,
  styles: [`
  `]
})
export class InterviewerViewComponent implements OnInit {


  @Input() id = '0'
  @Input() topic = '0'
  @Input() position = '0'

  @Select(InterviewerSelectors.technicalTopics)
  topics$: Observable<Topic[]>;

  store = inject(Store)

  topicNumber = signal(0)
  questionNumber = signal(0)
  reachedMax = signal(false)
  reachedMin = signal(false)

  topicLength: { questionLength: number }[] = []

  async ngOnInit() {
    await lastValueFrom(this.store.dispatch(new Load(this.position)))
    this.topics$.subscribe((topics) => {
      if (topics) {
        for (const d of topics) {
          this.topicLength.push({
            questionLength: d.questions.length
          })
        }
      }
    });
  }

  nextQuestion() {
    if (this.topicNumber() >= this.topicLength.length - 1) {
      this.reachedMax.set(true)
      return;
    }
    this.reachedMax.set(false)
    if (this.questionNumber() >= this.topicLength[this.topicNumber()].questionLength - 1) {
      this.topicNumber.update(prev => prev + 1)
      this.questionNumber.set(0)
    } else {
      this.questionNumber.update(prev => prev + 1)
    }
    this.reachedMin.set(false)
  }

  previousQuestion() {
    if (this.topicNumber() <= 0 && this.questionNumber() <=0 ) {
      this.reachedMin.set(true);
     return
    }
    this.reachedMin.set(false);
    if (this.questionNumber() <= 0) {
      this.topicNumber.update(prev => prev - 1)
      this.questionNumber.set(this.topicLength[this.topicNumber()].questionLength - 1)
    } else {
      this.questionNumber.update(prev => prev - 1)
    }
    this.reachedMax.set(false)
  }

}
