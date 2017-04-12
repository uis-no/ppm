const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const fs = require('fs');
const Gridfs = require('gridfs-stream');

const mongoose = require('mongoose');
var mongoDriver = mongoose.mongo;
var db = mongoose.connection;

// TODO: allow for multiple file uploads
var upload = multer({ dest: 'tmp/'}).single('file');

// we'll authenticate users from here
// TODO: Allow cross origin requests
router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.user.mail + " logged in and is using the api");
    next();
  } else {
    console.log("You're not logged in yet.");
  }
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.status(200).json('Successfully connected to API');
});

var Company = require('../models/company.ts');
var Course = require('../models/course.ts');
var Employee = require('../models/employee.ts');
var Ext_examiner = require('../models/ext_examiner.ts');
var Project = require('../models/project.ts');
var Student = require('../models/student.ts');



router.route('/company')

  // get all companies
  .get((req, res) => {
    Company
    .find((err, companies) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(companies);
    })
  })

  // create new company
  .post((req, res) => {
    var obj = req.body;
    var company = new Company(obj);
    company.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
      res.status(200).json({ message: 'Your company has been created.'});
      }
    });
  });



router.route('/course')
  // get all courses
  .get((req, res) => {
    Course
    .find((err, courses) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(courses);
    })
  });



router.route('/employee')

  // get all employees

  .get((req, res) => {
    Employee
    .find((err, employees) => {
      if (err) {
        res.status(500).send(err);
      } else {
      res.status(200).json(employees);
    }
  });
  })

  // create new employee
  .post((req, res) => {
    var obj = req.body;
    var employee = new Employee(obj);
    employee.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
      res.status(200).json({ message: 'Your employee has been created.'});
      }
    });
  });



  router.route('/employee/:name')
  // get a employee by name
  .get((req, res) => {
    Employee.findOne({ name : req.params.name }, (err, employee) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(employee);
      }
    })
  });



router.route('/ext_examiner')

  // get all ext_examiners
  .get((req, res) => {
    Ext_examiner
    .find((err, ext_examiners) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(ext_examiners);
    })
  })

  // create new ext_examiner
  .post((req, res) => {
    var obj = req.body;
    var ext_examiner = new Ext_examiner(obj);
    console.log(ext_examiner);
    ext_examiner.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
      res.status(200).json({ message: 'Your ext_examiner has been created.'});
      }
    });
  });



router.route('/projects')

  // get all projects
  .get((req, res) => {
    Project
    .find((err, projects) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(projects);
    })
    .populate('course')
    .populate('proposer.user')
    .populate('responsible.user')
    .populate('advisor.user')
    .populate('examiner.user')
    .populate('student')
  })

  // create new project
  .post((req, res) => {
    var obj = req.body;
    var project = new Project(obj);
    console.log(project);
    project.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
      res.status(200).json({ message: 'Your project has been created.'});
      }
    });
  })

    // update a project by id
  .put((req, res) => {
    var gfs = new Gridfs(db.db, mongoDriver);
    Project.findOne({ _id : req.params._id }, (err, project) => {
      /* multer's upload uploads a file to a tmp folder on disk, we use
        gridfs-stream and fs to read the file here and write it to the database,
        we then delete the file from the tmp folder
      */
      upload(req, res, (err) => {
        var writeStream = gfs.createWriteStream({
          filename: req.file.originalname
        });

        var readStream = fs.createReadStream('tmp/' + req.file.filename)
        // Deletes file from tmp folder
          .on("end", () => {
            fs.unlink("tmp/" + req.file.filename, (err) => {
              res.status(200).json(readStream.id);
            })
          })
          .on("err", () => {
            res.send("error uploading file");
          })
          // reads the input as it writes the output
          .pipe(writeStream);
          // saves the id reference of child file to parent project
          project.submission = readStream.id;
          project.save();
      });
    });
  })

  // delete a project by id
  .delete((req, res) => {
    var obj = req.body;
    var project = new Project(obj);

    Project.findOneAndRemove({ _id : project._id }, project, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json({ message: 'Your project has been deleted.'});
      }
    });
  });
  
  

router.route('/projects/:_id')

  // get a project by id
  .get((req, res) => {
    Project.findOne({ _id : req.params._id }, (err, project) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(project);
      }
    })
  .populate('course')
  .populate('proposer.user')
  .populate('responsible.user')
  .populate('advisor.user')
  .populate('examiner.user')
  .populate('student')
  })

  // update a project by id
  .put((req, res) => {
    var obj = req.body;
    var project = new Project(obj);

    Project.findOneAndUpdate({ _id : project._id }, project,
        (err) =>{
      if (err) {
        res.status(500).send(err);
      } else {
      res.status(200).json({ message: 'Your project has been updated.'});
      }
    });
  })

  // delete a project by id
  .delete((req, res) => {
    var obj = req.body;
    var project = new Project(obj);

    Project.findOneAndRemove({ _id : project._id }, project, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json({ message: 'Your project has been deleted.'});
      }
    });
  });



router.route('/student')

  // get all students
  .get((req, res) => {
    Student
    .find((err, students) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(students);
    })
  })

  // create new student
  .post((req, res) => {
    var obj = req.body;
    var student = new Student(obj);
    console.log(student);
    student.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
      res.status(200).json({ message: 'Your student has been created.'});
      }
    });
  });



router.route('/student/:name')
  // get a student by name
  .get((req, res) => {
    Student.findOne({ name : req.params.name }, (err, student) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(student);
      }
    })
  });



module.exports = router;
