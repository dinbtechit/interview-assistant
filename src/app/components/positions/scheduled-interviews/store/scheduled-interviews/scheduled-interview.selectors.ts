import { Selector } from "@ngxs/store";
import { ScheduledInterviewsStateModel } from "./scheduled-interview.model";
import { ScheduledInterviewsState } from "./scheduled-interviews.state";

export class ScheduledInterviewSelectors {

  @Selector([ScheduledInterviewsState.state])
  static scheduledInterviews(state: ScheduledInterviewsStateModel) {
    return state.scheduledInterviews;
  }
}
