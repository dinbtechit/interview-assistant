import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ScheduledInterviewsState } from './scheduled-interviews.state';
import { of } from "rxjs";


describe('ScheduledInterviews actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ScheduledInterviewsState])]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  it('should create an action and add an item', () => {

  });

});
