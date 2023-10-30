import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { CurrentScheduledInterviewStateModel } from "./current-scheduled-interview.model";
import { LoadCurrentInterview, NextItem, PreviousItem } from "./current-scheduled-interview.actions";
import { InterviewerSelectors } from "../../../../../interviewer-view/store/interviewer/interviewer.selectors";
import { ScheduledInterview } from "../scheduled-interview.model";
import { Section } from "../../../../../interviewer-view/store/interviewer/interviewer.model";
import { ScheduledInterviewsService } from "../../../services/scheduled-interviews.service";
import { lastValueFrom } from "rxjs";


const defaults: ScheduledInterview = {
  candidateEmail: "",
  candidateName: "",
  date: undefined,
  id: "",
  interviewControl: {
    chairMemberEmail: "",
    currentlyViewing: { agendaId: "", questionId: "", sectionId: "", topicId: "" },
    incontrol: ""
  },
  panelMembers: undefined
};

@State<ScheduledInterview>({
  name: 'currentScheduledInterview',
  defaults
})
@Injectable()
export class CurrentScheduledInterviewState {

  store = inject(Store);
  service = inject(ScheduledInterviewsService);

  @Selector()
  static state(state: ScheduledInterview) {
    return state;
  }

  @Action(LoadCurrentInterview)
  async loadCurrentInterview({ patchState }: StateContext<ScheduledInterview>,
                             { interviewId }: LoadCurrentInterview) {
    // Grab the interview from firebase
    const scheduledInterview = await lastValueFrom(this.service.getInterview())
    console.log(scheduledInterview)
    patchState({
      ...scheduledInterview
    })
  }

  @Action(NextItem)
  next({ getState, patchState }: StateContext<ScheduledInterview>) {
    const sections = this.store.selectSnapshot(InterviewerSelectors.sections) as Section[]
    const currentlyViewing = getState().interviewControl.currentlyViewing
    const currentInterviewControl = getState().interviewControl

    console.log(currentInterviewControl)

    if (!sections) return

    let currentSectionIndex = Number.isNaN(currentlyViewing.sectionId) ? 0 : Number(currentlyViewing.sectionId);
    const sectionsLength = sections.length ?? 0

    let currentAgendaIndex = 0
    let agendasLength = 0

    if (sectionsLength > 0) {
      currentAgendaIndex = Number(currentlyViewing.agendaId) ?? 0;
      agendasLength = (sections[currentSectionIndex]?.agenda ?? []).length
    }

    let currentTopicIndex = 0;
    let topicsLength = 0

    if (sectionsLength > 0 && agendasLength > 0) {
      currentTopicIndex = Number(currentlyViewing.topicId) ?? 0;
      if (sections[currentSectionIndex].agenda[currentAgendaIndex]?.topics) {
        topicsLength = (sections[currentSectionIndex]?.agenda[currentAgendaIndex]?.topics ?? []).length
      }
    }

    let currentQuestionIndex = 0
    let questionsLength = 0

    if (sectionsLength > 0 && agendasLength > 0 && topicsLength > 0) {
      currentQuestionIndex = Number(currentlyViewing.questionId) ?? 0
      questionsLength = (sections[currentSectionIndex]?.agenda[currentAgendaIndex]?.topics[currentTopicIndex]?.questions ?? []).length
    }


    if (currentQuestionIndex < questionsLength) {
      currentQuestionIndex++
    } else if (currentTopicIndex < topicsLength) {
      currentTopicIndex++
      currentQuestionIndex = 0
    } else if (currentAgendaIndex < agendasLength) {
      currentAgendaIndex++
      currentQuestionIndex = 0
      currentTopicIndex = 0
    } else if (currentSectionIndex < sectionsLength) {
      currentSectionIndex++
      currentAgendaIndex = 0
      currentQuestionIndex = 0
      currentTopicIndex = 0
    }

    patchState({
      interviewControl: {
        ...currentInterviewControl,
        currentlyViewing: {
          ...currentlyViewing,
          sectionId: currentSectionIndex.toString(),
          topicId: currentTopicIndex.toString(),
          agendaId: currentAgendaIndex.toString(),
          questionId: currentQuestionIndex.toString()
        }
      }
    })
    console.log(getState().interviewControl.currentlyViewing)
  }

  @Action(PreviousItem)
  previousItem({ patchState }: StateContext<CurrentScheduledInterviewStateModel>) {
    // TODO - Implement action
  }


}
