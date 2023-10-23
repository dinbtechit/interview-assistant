
export class Load {
  static readonly type = '[Interviewer] Load';
  constructor(public positionId: string) {
  }
}
export class Upload {
  static readonly type = '[Interviewer] Upload';
}
