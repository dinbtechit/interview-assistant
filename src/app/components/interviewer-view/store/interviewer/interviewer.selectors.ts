import { Selector } from "@ngxs/store";
import { InterviewerStateModel } from "./interviewer.model";
import { InterviewerState } from "./interviewer.state";

export class InterviewerSelectors {

  @Selector([InterviewerState.interviewerState])
  static sections(state: InterviewerStateModel) {
    return state.sections
  }

  @Selector([InterviewerState.interviewerState])
  static technicalQuestions(state: InterviewerStateModel) {
    return state.sections[2].agenda[0].topics[0].questions
  }

  @Selector([InterviewerState.interviewerState])
  static technicalTopics(state: InterviewerStateModel) {
    return state.sections[2].agenda[0].topics
  }
}
