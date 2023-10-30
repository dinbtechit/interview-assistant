import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login.component";
import { InterviewerViewComponent } from "./components/interviewer-view/interviewer-view.component";
import { CandidateViewComponent } from "./components/candidate-view/candidate-view.component";
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { PositionComponent } from "./components/positions/position.component";
import { SummaryAgendaComponent } from "./components/interviewer-view/components/summary-agenda.component";
import {
  ScheduledInterviewsComponent
} from "./components/positions/scheduled-interviews/scheduled-interviews.component";

const redirectToLogin = () => redirectUnauthorizedTo(['login'])

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo(['positions']) }
  },
  {
    path: 'positions', component: PositionComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectToLogin }
  },
  { path: 'cv', component: CandidateViewComponent },
  {
    path: 'iv/:position',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectToLogin },
    children: [
      { path: '', redirectTo: 'interviews', pathMatch: 'full' },
      { path: 'interviews', component: ScheduledInterviewsComponent },
      { path: 'summary', component: SummaryAgendaComponent },
      { path: ':topic/:id', component: InterviewerViewComponent }
    ],
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
