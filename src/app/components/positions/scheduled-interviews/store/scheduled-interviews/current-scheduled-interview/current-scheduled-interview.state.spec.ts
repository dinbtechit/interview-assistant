import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { CurrentScheduledInterviewState } from "./current-scheduled-interview.state";
import { ScheduledInterviewsService } from "../../../services/scheduled-interviews.service";
import { ScheduledInterviewsServiceStub } from "../../../services/scheduled-interviews.service.stub";
import { lastValueFrom } from "rxjs";
import { LoadCurrentInterview, NextItem } from "./current-scheduled-interview.actions";
import { ScheduledInterview } from "../scheduled-interview.model";
import { InterviewerState } from "../../../../../interviewer-view/store/interviewer/interviewer.state";
import { InterviewService } from "../../../../../interviewer-view/services/interview.service";
import { InterviewServiceStub } from "../../../../../interviewer-view/services/interview.service.stub";

describe('CurrentScheduledInterview actions', () => {
  let store: Store;
  let service: ScheduledInterviewsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CurrentScheduledInterviewState, InterviewerState])],
      providers: [
        { provide: InterviewService, useClass: InterviewServiceStub },
        { provide: ScheduledInterviewsService, useClass: ScheduledInterviewsServiceStub }
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    service = TestBed.inject(ScheduledInterviewsService);
  }));

  it('should next to question', async () => {
    //spyOn(store, "selectSnapshot").withArgs(InterviewerSelectors.sections).and.returnValue(createSections())
    await lastValueFrom(store.dispatch(new LoadCurrentInterview('')))
    let state = store.selectSnapshot<ScheduledInterview>(CurrentScheduledInterviewState)
      .interviewControl.currentlyViewing

    console.log(state)

    /*  while(Number(state.questionId) < 3
      && Number(state.agendaId) < 3
      && Number(state.topicId) < 3
      && Number(state.questionId) < 3
        ) {*/
    state = store.selectSnapshot<ScheduledInterview>(CurrentScheduledInterviewState).interviewControl.currentlyViewing
    await lastValueFrom(store.dispatch(new NextItem()));
    console.log(state)
    /*}*/
  });

});

