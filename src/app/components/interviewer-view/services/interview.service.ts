import { inject, Injectable } from '@angular/core';
import { Section } from "../store/interviewer/interviewer.model";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private angularFireStore = inject(AngularFirestore);
  private readonly basePath = '/interview-assistant/interview/openPositions';
  private readonly collectionPath = 'interviewMaterial';
  private readonly docPath = 'sections';

  loadInterviewQuestions(positionId: string) {
    return  this.angularFireStore
      .doc<{ sections: Array<Section> }>(`${this.basePath}/${positionId}/${this.collectionPath}/${this.docPath}`)
      .valueChanges()
  }

}
