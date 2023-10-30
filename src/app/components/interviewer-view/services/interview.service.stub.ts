import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Agenda, Question, Section, Topic } from "../store/interviewer/interviewer.model";
import { map, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InterviewServiceStub {


  loadInterviewSections() {
    return of(this.createSections())
  }

  private createSections() {
    const questions: Question[] = Array.from({length: 3}, (k, v) => {
      return  {
        question: `q${v}`,
        answer: `a${v}`
      }
    });
    const topics: Topic[] = Array.from({length: 3}, (k, v) => {
      return  {
        name: `topic${v}`,
        questions: questions
      }
    });
    const agendas: Agenda[] =  Array.from({length: 3}, (k, v) => {
      return  {
        name: `agenda${v}`,
        topics: topics,
        allocatedDuration: {
          hour: 0, min: 0, sec: 0
        }
      }
    });
    const sections: Section[] = Array.from({length: 3},  (k, v)=> {
      return {
        name: `section${v}`,
        agenda: agendas,
        totalDuration: {
          hour: 0, min: 0, sec: 0
        }
      }
    })

    return sections
  }

}
