import { inject, Injectable } from '@angular/core';
import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import { PositionsService } from "../../services/positions.service";
import { PositionStateModel } from "./position.model";
import { LoadPositions } from "./position.actions";


const defaults: PositionStateModel = {
  isLoading: false,
  positions: []
};

@State<PositionStateModel>({
  name: 'position',
  defaults
})
@Injectable()
export class PositionState implements NgxsOnInit {
  positionsService = inject(PositionsService)
  ngxsOnInit(ctx: StateContext<PositionStateModel>): void {
    ctx.dispatch(new LoadPositions())
  }

  @Action(LoadPositions)
  load({ patchState }: StateContext<PositionStateModel>) {
      this.positionsService.getAll().subscribe((positions) => {
        patchState({
          positions: positions.map(it => {
            return { id: it.payload.doc.id, ...it.payload.doc.data() }
          })
        })
      })
  }


}
