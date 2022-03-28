export interface Quiz {
  id: number;
  question: string;
  options: Array<string>;
  answer: string;
  subject: string;
}
export interface Action {
  type: string;
  payload: any;
}
