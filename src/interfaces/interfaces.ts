export interface Quiz {
  id: number;
  question: string;
  options: Array<string>;
  answer: string;
  subject: string;
  approve?: boolean;
  qid: string;
}
export interface Action {
  type: string;
  payload: any;
}
