import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { environment } from "../environments/environment";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { LoginComponent } from "./components/login.component";
import { InterviewerState } from "./components/interviewer-view/store/interviewer/interviewer.state";
import { HttpClientModule, provideHttpClient } from "@angular/common/http";
import { provideRouter, RouterOutlet, withComponentInputBinding } from "@angular/router";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireModule, FIREBASE_OPTIONS } from "@angular/fire/compat";
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AuthState } from "./store/auth/auth.state";
import { PositionState } from "./components/positions/store/position/position.state";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HeaderComponent,
    LoginComponent,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideRemoteConfig(() => getRemoteConfig()),
    NgxsModule.forRoot([AuthState, PositionState, InterviewerState]),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    BrowserAnimationsModule,
    RouterOutlet,
    provideStorage(() => getStorage())
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase } // This will probably change in the future.
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
