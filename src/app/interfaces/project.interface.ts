export class Project {
  // TODO: find corresponding datatype to objectid
  _id?: number;
  course: string;
  title: string;
  description: string;
  proposer: {role: string, _id: string};
  status: string;
  responsible: {role: string, _id: string};
  advisor: [{role: string, _id: string}];
  examiner: [{role: string, _id: string}];
  student: Array<string>;
  submission?: File;
}
