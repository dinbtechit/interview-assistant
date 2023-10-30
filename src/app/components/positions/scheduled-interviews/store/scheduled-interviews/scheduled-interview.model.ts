import { DocumentReference } from "@angular/fire/compat/firestore";

export interface ScheduledInterviewsStateModel {
  isLoading: boolean;
  scheduledInterviews: Array<ScheduledInterview>;
}

export interface ScheduledInterview {
  id: string;
  date: any; // TODO need to figureout how to use firebaseTypes
  candidateName: string;
  candidateEmail: string;
  interviewControl : {
    chairMemberEmail: string;
    incontrol: string;
    currentlyViewing: {
      sectionId: string;
      agendaId: string;
      topicId: string;
      questionId: string;
    };
  }
  panelMembers: Array<{
    memberName: string;
    memberDetails: DocumentReference
  }>
}
