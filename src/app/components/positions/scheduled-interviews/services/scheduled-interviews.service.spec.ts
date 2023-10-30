import { TestBed } from '@angular/core/testing';

import { ScheduledInterviewsService } from './scheduled-interviews.service';

describe('ScheduledInterviewsService', () => {
  let service: ScheduledInterviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduledInterviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
