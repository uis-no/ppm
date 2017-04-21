export class Project {
  // TODO: find corresponding datatype to objectid
  _id?: number;
  course: string;
  title: string;
  description: string;
  proposer: {role: string, user: string};
  status: string;
  responsible: {role: string, user: string};
  advisor: [{role: string, user: string}];
  examiner: [{role: string, user: string}];
  student: Array<string>;
}
