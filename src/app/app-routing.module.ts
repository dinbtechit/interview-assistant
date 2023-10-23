import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login.component";
import { InterviewerViewComponent } from "./components/interviewer-view/interviewer-view.component";
import { CandidateViewComponent } from "./components/candidate-view/candidate-view.component";
import { AngularFireAuthGuard } from "@angular/fire/compat/auth-guard";
import { redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { PositionComponent } from "./components/positions/position.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'positions', component: PositionComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'cv', component: CandidateViewComponent },
  {
    path: 'iv',
    children: [
      { path: '', redirectTo: '0/0', pathMatch: 'full' },
      { path: ':position/:topic/:id', component: InterviewerViewComponent,
        canActivate: [AngularFireAuthGuard]}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
