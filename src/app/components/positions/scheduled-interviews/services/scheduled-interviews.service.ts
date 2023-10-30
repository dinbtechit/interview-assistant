import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ScheduledInterview } from "../store/scheduled-interviews/scheduled-interview.model";
import { of } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ScheduledInterviewsService {

  private angularFireStore = inject(AngularFirestore);
  private readonly basePath = '/interview-assistant/interview/openPositions';
  private readonly path = 'scheduledInterviews';

  getAll(positionId: string) {
    const scheduledInterviews = this.angularFireStore
      .collection<ScheduledInterview>(`${this.basePath}/${positionId}/${this.path}`)
    return scheduledInterviews.valueChanges()
  }

  getInterview(){
    return of(
      {} as ScheduledInterview
    )
  }
}
