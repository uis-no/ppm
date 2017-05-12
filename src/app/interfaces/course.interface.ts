export class Course {
  _id?: string;
  course: string;
  year: number;
  deadlines: {
    instituteSuggest: Date,
    studentSuggest: Date,
    studentApply: Date,
    studentAccept: Date,
    studentSubmit: Date
  };
}
