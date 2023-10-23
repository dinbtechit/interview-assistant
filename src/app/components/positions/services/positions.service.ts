import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Position } from "../store/position/position.model";

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  angularFireStore = inject(AngularFirestore)

  getAll() {
    const positions = this.angularFireStore
      .collection<Position>('/interview-assistant/interview/openPositions')
    return positions.snapshotChanges()
  }
}
