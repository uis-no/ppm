const fs = require('fs');
const xlsx = require('node-xlsx');
const mongoose = require('mongoose');

var Student = require('./models/student.ts');

// TODO: allow for uploading file to be parsed
var filepath = '';

var obj = xlsx.parse(filepath);

obj[0].data.forEach((d) => {
  var student = new Student();
  student._id = d[2];
  student.name = d[4] + " " + d[3];
  student.mail = d[27];
  student.mobile = d[26];
  student.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(student._id + " added to database");
    }
  });
})
