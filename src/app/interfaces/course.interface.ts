export class Course {
  _id?: string;
  course: string;
  year: number;
  deadlines: {
    instituteSuggest: Date,
    studentSuggest: Date,
    apply: Date,
    accept: Date,
    start: Date,
    submit: Date
  };
}
