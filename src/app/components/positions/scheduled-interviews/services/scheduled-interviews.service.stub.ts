import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ScheduledInterview } from "../store/scheduled-interviews/scheduled-interview.model";
import { of } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ScheduledInterviewsServiceStub {

  getAll(positionId: string) {
    return of([
      { id: 'id',
        date: new Date(),
        candidateEmail: 'candidateEmail',
        candidateName: 'candidateName',
        interviewControl: {
          currentlyViewing: {
            sectionId: '0',
            agendaId: '0',
             topicId: '0',
            questionId: '0'
          },
          chairMemberEmail: 'chair',
          incontrol: 'incontrol',
        },
        panelMembers: [{
        memberDetails: null,
          memberName: 'panelMember1'
        }]
      } as ScheduledInterview
    ])
  }

  getInterview(){
    return of( { id: 'id',
      date: new Date(),
      candidateEmail: 'candidateEmail',
      candidateName: 'candidateName',
      interviewControl: {
        currentlyViewing: {
          sectionId: '0',
          agendaId: '0',
          topicId: '0',
          questionId: '0'
        },
        chairMemberEmail: 'chair',
        incontrol: 'incontrol',
      },
      panelMembers: [{
        memberDetails: null,
        memberName: 'panelMember1'
      }]
    } as ScheduledInterview)
  }
}
