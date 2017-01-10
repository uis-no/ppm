/*import mongodb = require('mongodb');

export interface project{
    title: string;
    advisors: string;
    proposer: string;
    important_courses: string;
    background: string;
    motivation: string;
    methods: string;
    objectives: string;
    students_assigned: string;

}
*/

import mongoose from 'mongoose'


var Schema = mongoose.Schema;

var project = new Schema({
  title : {
    type : String,
    default : 'project title'
  },
  advisors : {
    type : String,
    default : 'advisor'
  },
  proposer : {
    type : String,
    default : 'proposer'
  },
  important_courses : {
    type : String,
    default : 'none'
  },
  background : {
    type : String,
    default : ''
  },
  motivation : {
    type : String,
    default: ''
  },
  methods : {
    type : String,
    default: ''
  },
  objectives : {
    type : String, 
    default : ''
  },
  students_assigned : {
    type : String,
    default : ''
  }
});


module.exports = mongoose.model('Project', project);





