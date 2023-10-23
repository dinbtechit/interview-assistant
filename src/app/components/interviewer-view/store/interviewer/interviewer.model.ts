export interface InterviewerStateModel {
  isLoading: boolean;
  position: string;
  sections: Array<Section>;
}

export interface Section {
  name: string;
  totalDuration: Duration;
  agenda?: Array<Agenda>;
}

export interface Agenda {
  name: string;
  allocatedDuration: Duration;
  topics: Array<Topic>;
}
export class Topic {
    name: string;
    questions: Array<Question>;
}

export interface Question {
  question: string;
  answer: string;
}

type Duration = {
  "hour": number;
  "min": number;
  "sec": number;
}


