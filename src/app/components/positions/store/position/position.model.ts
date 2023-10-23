import { DocumentReference } from "@angular/fire/compat/firestore";

export class PositionStateModel {
  isLoading: boolean;
  positions: Array<Position>;
}

export class Position {
  id: string;
  name: string;
  chair: string;
  panelMembersArr: DocumentReference[];
}
