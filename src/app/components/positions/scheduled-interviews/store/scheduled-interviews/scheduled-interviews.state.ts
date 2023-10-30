import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ScheduledInterviewsStateModel } from "./scheduled-interview.model";
import { LoadScheduledInterviews } from "./scheduled-interviews.actions";
import { ScheduledInterviewsService } from "../../services/scheduled-interviews.service";


const defaults: ScheduledInterviewsStateModel = {
  isLoading: false,
  scheduledInterviews: []
};

@State<ScheduledInterviewsStateModel>({
  name: 'scheduledInterviews',
  defaults
})
@Injectable()
export class ScheduledInterviewsState {

  scheduledInterviewService = inject(ScheduledInterviewsService);

  @Selector()
  static state(state: ScheduledInterviewsStateModel) {
    return state;
  }


  @Action(LoadScheduledInterviews)
  async loadScheduledInterviews({ patchState }: StateContext<ScheduledInterviewsStateModel>,
                                { positionId }: LoadScheduledInterviews) {
    patchState({
      isLoading: true
    });

    // Load Scheduled Interviews
    this.scheduledInterviewService.getAll(positionId)
      .subscribe(scheduledInterviews => {
        patchState({
          scheduledInterviews: scheduledInterviews,
          isLoading: false
        });
      })
  }

}
