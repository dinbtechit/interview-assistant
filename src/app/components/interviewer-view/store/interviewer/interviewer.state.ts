import { inject, Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { InterviewerStateModel, Section } from "./interviewer.model";
import { Load, Upload } from "./interviewer.actions";
import { AngularFirestore, DocumentReference } from "@angular/fire/compat/firestore";


const defaults: InterviewerStateModel = {
  isLoading: false,
  position: 'Senior CS04-Full Stack Developer',
  sections: []
};

@State<InterviewerStateModel>({
  name: 'interviewer',
  defaults
})
@Injectable()
export class InterviewerState {


  angularFireStore = inject(AngularFirestore)


  @Selector()
  static interviewerState(state: InterviewerStateModel) {
    return state;
  }

  @Action(Load)
  async load({ patchState}: StateContext<InterviewerStateModel>, { positionId }: Load) {
    patchState({
      isLoading: true
    })

    try {
      const position = this.angularFireStore
        .doc<Position>(`/interview-assistant/interview/openPositions/${positionId}`)
      const sections = position.collection('interviewMaterial')
        .doc<{ sections: Array<Section> }>('sections')
      sections.valueChanges().subscribe((doc) => {
        patchState({
          isLoading: false,
          sections: doc.sections
        })
      })
    } catch (e) {
      console.error(e)
      patchState({
        isLoading: false,
        sections: []
      })
    }

    //dispatch(new Upload())
  }

  @Action(Upload)
  async upload({ patchState }: StateContext<InterviewerStateModel>) {
    const sections = this.angularFireStore.doc(
      '/interview-assistant/interview/openPositions/seniorFullStackDeveloper/interviewMaterial/sections'
    )
    /*const result = {
      sections: await lastValueFrom(this.interviewService.loadInterviewQuestions())
    }
    await this.angularFireStore.doc(sections.ref).update(result)*/
  }
}


export interface Position {
  chair: string,
  panelMembersArr: DocumentReference[]
}
