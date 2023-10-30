import { ScheduledInterview } from "../scheduled-interview.model";

export interface CurrentScheduledInterviewStateModel {
  isLoading: boolean;
  scheduledInterview: ScheduledInterview | undefined;
}
