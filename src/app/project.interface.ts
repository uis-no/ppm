export class Project {
  // TODO: find corresponding datatype to objectid
  _id?: number;
  course: string;
  title: string;
  description: string;
  proposer: Array<Object>;
  approved: boolean;
  responsible: Array<Object>;
  advisor: Array<Object>;
  examiner: Array<Object>;
  student: Array<number>;
 // time_limits: Array<string>;
}
