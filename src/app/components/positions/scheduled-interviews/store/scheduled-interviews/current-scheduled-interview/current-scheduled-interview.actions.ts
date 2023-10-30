export class LoadCurrentInterview {
  static readonly type = '[CurrentScheduledInterview] LoadCurrentInterview';
  constructor(public interviewId: string) {
  }
}
export class NextItem {
  static readonly type = '[CurrentScheduledInterview] NextItem';
}
export class PreviousItem {
  static readonly type = '[CurrentScheduledInterview] PreviousItem';
}

