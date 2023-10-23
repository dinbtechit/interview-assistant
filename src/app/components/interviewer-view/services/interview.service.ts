import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Section } from "../store/interviewer/interviewer.model";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

 /* private httpClient = inject(HttpClient)

  loadInterviewQuestions() {
    return this.httpClient.get<{sections: Array<Section>}>('/assets/questions.json').pipe(
      map(i => i.sections)
    )
  }*/

}
