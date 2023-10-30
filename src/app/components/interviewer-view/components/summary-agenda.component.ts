import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select, Store } from "@ngxs/store";
import { InterviewerSelectors } from "../store/interviewer/interviewer.selectors";
import { lastValueFrom, Observable } from "rxjs";
import { Section } from "../store/interviewer/interviewer.model";
import { Position } from '../../positions/store/position/position.model';
import { RouterLink } from "@angular/router";
import { Load } from "../store/interviewer/interviewer.actions";

@Component({
  selector: 'app-summary-agenda',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
      <div class="h-full flex flex-col justify-center items-center">
          <h1 class="text-2xl">Summary & Agenda</h1>
          <div class="flex flex-col w-full justify-center items-center">
              <ng-container *ngIf="(sections$ | async) ?? [] as sections">
                  <ng-container *ngFor="let section of sections">
                      <div class="mb-5 mt-8 flex flex-row w-full max-w-md">
                          <div class="flex flex-col w-full max-w-md">
                              <div class="flex flex-row justify-between">
                                  <strong>{{section.name}}</strong>
                                  <span class="badge badge-primary">
                                mins: {{section.totalDuration.min}}:{{section.totalDuration.sec}}
                              </span>
                              </div>
                              <hr class="mb-5">
                             <ng-container *ngIf="section.agenda">
                              <ul class="ml-4" *ngFor="let agenda of section.agenda">
                                  <li>
                                      <div>{{agenda.name}}</div>
                                      <ng-container *ngIf="agenda.topics">
                                        <ng-container *ngIf="agenda.topics">
                                         <!-- <ul class="ml-6" *ngFor="let topic of agenda.topics">
                                              <li>{{topic.name}}</li>
                                          </ul>-->
                                        </ng-container>
                                      </ng-container>
                                  </li>
                              </ul>
                             </ng-container>
                          </div>
                      </div>
                  </ng-container>
              </ng-container>
          </div>
          <div class="mb-5 border-[1px] border-gray-300 w-full max-w-md"></div>
          <button class="btn btn-primary" [routerLink]="['/iv/' + position + '/0/0']">Start</button>

      </div>
  `,
  styles: [`
    li {
      list-style: disc;
    }
  `]
})
export class SummaryAgendaComponent implements OnInit {

  @Select(InterviewerSelectors.sections)
  sections$: Observable<Section[]>

  @Input() position = '0';
  store = inject(Store)

  async ngOnInit(): Promise<void> {
    await lastValueFrom(this.store.dispatch(new Load(this.position)))
  }
}
