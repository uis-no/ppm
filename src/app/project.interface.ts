export class Project {
  _id?: number;
  course: string;
  title: string;
  description: string;
  proposer: number;
  approved: boolean;
  responsible: number;
  advisor: number;
  examiner: number;
  student: Array<number>;
  time_limits: Array<string>;

  /*constructor(obj?: any) {
    this.id = obj && Number(obj.id) || null;
    this.title = obj && obj.title || null;
    this.advisors = obj && obj.advisors || null;
    this.proposer = obj && obj.proposer || null;
    this.important_courses = obj && obj.important_courses || null;
    this.background = obj && obj.background || null;
    this.motivation = obj && obj.motivation || null;
    this.methods = obj && obj.methods || null;
    this.objectives = obj && obj.objectives || null;
    this.students_assigned = obj && obj.students_assigned || null;
  }*/
}
