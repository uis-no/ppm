const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const fs = require('fs');
const Gridfs = require('gridfs-stream');

const Mail = require('../mail.ts');

const jwt = require('express-jwt');

const mongoose = require('mongoose');


var mongoDriver = mongoose.mongo;
var db = mongoose.connection;

// TODO: allow for multiple file uploads
var upload = multer({ dest: 'tmp/'}).single('file');

/*var authCheck = jwt({
  secret: new Buffer('auth0secret'),
  audience: '1QKH2NdD18m2ddQ5kXCzDuJeYTdQk1eA'
});*/

// we'll authenticate users from here
router.use((req, res, next) => {
  //console.log(authCheck);
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
var Student = require('../models/student.ts');
var File = require('../models/file.ts');
var Project = require('../models/project.ts');

router.route('/sendMail')
  .post((req, res) => {
    var body = 'You received a message from ' + req.user.eduPersonPrincipalName + ':\n' + req.body.bodyText;
    Mail.sendMail(req.body.mail, req.body.subject, body);
    return res.status(200).send('Mail sent.');
  });

router.route('/projects/notify/:_id')
  .get((req,res) => {
    if(req.user.eduPersonAffiliation.includes('employee')) {
      Project.findOne({ _id : req.params._id}, (err, project) => {
        if (err) {
          res.status(500).send(err);
        } else {
          if (project.status == 'delivered' && project.file) {
            Employee.findOne({ user: project.examiner.user }, (err, examiner) => {
              Mail.sendMail(examiner.mail, 'Project submission of ' + project.title + ' is ready for evaluation',
              'Go to https://fast-beyond-86797.herokuapp.com/api/projects/' + project._id + '/submission to download file');

              return res.status(200).send('Mail sent to ' + examiner.name);
            });
          } else {
            res.send("Could not find a submission for this project");
          }
        }
      });
    }
  });

// TODO: change name more appropriate to the fact that it's pending and completed projects
router.route('/projects/unreviewed')
  .get((req, res) => {
    if (req.user.eduPersonAffiliation.includes('employee')) {
      //console.log("trying to find all pending projects");
      Project.find({ $or: [{ status : 'pending' }, { submission : { $exists: true }}]}, (err, projects) => {
        //console.log('unreviewed projects');
        //onsole.log(projects);
        if (err) {
          return res.status(500).send(err);
        } else {
          return res.status(200).json(projects);
        }
      })
      .populate('course')
      .populate('proposer._id')
      .populate('responsible._id')
      .populate('advisor._id')
      .populate('examiner._id')
      .populate('student')
      .populate('file');
    } else {
      return res.send("You're not authorized to access this.");
    }
  });

router.route('/projects/:_id/submission')
  // Reads the file from database and creates a stream the client can use
  .get((req, res) => {
    var gfs = new Gridfs(db.db, mongoDriver);
    Project.findOne({ _id : req.params._id }, (err, project) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        if (project.submission) {
          File.findOne({ _id : project.submission }, (err, file) => {
            if (err) {
              return res.send(err);
            } else {
              var readStream = gfs.createReadStream(file);
              // this will stream the file directly to the browser, adobe has a nice browser handler for pdfs
              console.log(readStream.pipe(res));
              //readStream.pipe(res);
            }
          });
        }
      }
    });
  })
  .post((req, res) => {
    var gfs = new Gridfs(db.db, mongoDriver);
    var date = new Date();
    Project.findOne({ _id : req.params._id }, (err, project) => {
      /* multer's upload uploads a file to a tmp folder on disk, we use
        gridfs-stream and fs to read the file here and write it to the database,
        we then delete the file from the tmp folder
      */
      Course.findOne({ _id: project.course }, (err, course) => {
        if (!course.deadlines.studentSubmit) {
          return res.status(500).send("Submission date has not yet been set.");
        } else if (Date.parse(course.deadlines.studentSubmit) > Date.parse(date)) {
          return res.send("Late submission!");
        } else {
          upload(req, res, (err) => {
            var writeStream = gfs.createWriteStream({
              filename: req.file.originalname
            });

            var readStream = fs.createReadStream('tmp/' + req.file.filename)
            // Deletes file from client tmp folder
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
              project.status = 'delivered';
              project.submission = readStream.id;
              project.save();
          });
        }
      });
    });
  });

router.route('/company')
  // get all companies
  .get((req, res) => {
    Company
    .find((err, companies) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(companies);
      }
    });
  })

  // create new company
  .post((req, res) => {
    // increments id to a new company
    Company.find((err, companies) => {
      var obj = req.body;
      var company = new Company(obj);

      var id = 0;
      companies.forEach((c) => {
        if (id < parseInt(c._id)) {
          id = parseInt(c._id);
        }
      });
      company._id = String(id + 1);


      company.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json({ message: 'Your company has been created.'});
        }
      });
    });
  });

  router.route('/company/:name')
    .get((req,res) => {
      Company.findOne({ name: req.params.name }, (err, company) => {
        if (err) {
          return res.send(err);
        } else {
          return res.json(company);
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

router.route('/course/:_id')
  .get((req, res) => {
    Course.findOne({_id: req.params._id}, (err, course) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.status(200).json(course);
      }
    });
  })
  .put((req, res) => {
    if (req.user.eduPersonAffiliation.includes('employee')) {
      var obj = req.body;
      var course = new Course(obj);
      Course.findOneAndUpdate({_id: req.params._id}, course, (err) => {
        if (err) {
          return res.status(500).send(err);
        } else {
          return res.status(200).send(req.params._id + 'has been updated');
        }
      });
    }
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
      } else {
        res.status(200).json(ext_examiners);
      }
    });
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


// returns a students project
router.route('/my_project')
  .get((req, res) => {
    if(req.user.eduPersonAffiliation.includes('student')) {
      // finds student based on his mail, so we can retrieve his id
      Student.findOne({ mail: req.user.mail }, (err, student) => {
        if(err) {
          return res.status(500).send(err);
        } else {
          console.log("student id:");
          console.log(student._id);
          Project
          // finds all the projects that are approved or projects related to the student by email
          .find({ assigned: student._id }, (err, projects) => {
            if (!projects) {
              Project.find({ proposer: student._id }, (err, ps) => {
                if (err) {
                  return res.status(500).send(err);
                } else {
                  return res.status(200).json(ps)
                }
              });
            }
            if (err) {
              return res.status(500).send(err);
            } else {
              return res.status(200).json(projects);
            }
          })
          .populate('course')
          .populate('proposer._id')
          .populate('responsible._id')
          .populate('advisor._id')
          .populate('examiner._id')
          .populate('student')
        }
      });
    } else {
      return res.send("You're not authorized to access this.");
    }
  });

router.route('/projects')

  // get all projects
  .get((req, res) => {
    if(req.user.eduPersonAffiliation.includes('student')) {

      // finds student based on his mail, so we can retrieve his id
      Student.findOne({ mail: req.user.mail }, (err, student) => {
        if(err) {
          return res.status(500).send(err);
        } else {
          Project
          // finds all the projects that are approved or projects related to the student by email
          .find({$or:[{ status: 'unassigned' }, { student: student._id }]}, (err, projects) => {
            if (err) {
              return res.status(500).send(err);
            } else {
              return res.status(200).json(projects);
            }
          })
          .populate('course')
          .populate('proposer._id')
          .populate('responsible._id')
          .populate('advisor._id')
          .populate('examiner._id')
          .populate('student');
        }
      });

    }
    // return all projects if the user is an employee
    else if(req.user.eduPersonAffiliation.includes('employee')) {
      //console.log("trying to find all projects");
      Project
      .find((err, projects) => {
        if (err) {
          return res.status(500).send(err);
        } else {
          return res.status(200).json(projects);
        }
      })
      .populate('course')
      .populate('proposer._id')
      .populate('responsible._id')
      .populate('advisor._id')
      .populate('examiner._id')
      .populate('student')
    } else {
      console.log("not an employee or student");
      return res.send("Could not verify your affiliation.");
    }

  })

  // create new project
  .post((req, res) => {
    var obj = req.body;
    var project = new Project(obj);
    var date = new Date();
    project.Created = date;

    // increments id to a new project
    Project.find((err, projects) => {
      var id = 0;
      projects.forEach((p) => {
        if (id < p._id) {
          id = p._id;
        }
      });
      project._id = id + 1;

      Course.findOne({ _id: project.course }, (err, course) => {
        // creates a project with status unassigned for employees
        if(req.user.eduPersonAffiliation.includes('employee')) {
          project.status = 'unassigned'
          project.save((err) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).json({ message: 'Your project has been created.'});
            }
          });
        } else {
          // checks if student is submitting a project late or not.
          if (course.deadlines.studentSuggest) {
            return res.status(500).send("The server could not find a date.");
          } else if (Date.parse(course.deadlines.studentSuggest) < Date.parse(project.created)) {
            return res.send("the deadline for creating projects has passed");
          } else {
            project.status = 'pending';
            project.save((err) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.status(200).json({ message: 'Your project has been created.'});
              }
            });
          }
        }
      });
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
    .populate('proposer._id')
    .populate('responsible._id')
    .populate('advisor._id')
    .populate('examiner._id')
    .populate('student')
    .populate('assigned')
    .populate('file');
  })

  // update a project by id
  .put((req, res) => {
    var obj = req.body;
    var resProject = new Project(obj);
    Project.findOne({ _id : resProject._id }, (err, project) =>{
      if (err) {
        res.status(500).send(err);
      } else {
        if ( req.user.eduPersonAffiliation.includes('student') && (resProject.status == 'assigned' && project.status == 'unassigned')){
          return res.send('Unauthorized access!');
        } else if(req.user.eduPersonAffiliation.includes('employee') && (resProject.status == 'assigned' && project.status == 'unassigned') && resProject.assigned[0] == null){
          return res.send('No students to assign the project to');
        } else {
          Project.findOneAndUpdate({ _id: resProject}, resProject, (err) => {
            if (err) {
              return res.send(err);
            } else {
              return res.status(200).json({ message: 'Your project has been updated.'});
            }
          });
        }
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
      } else {
        res.status(200).json(students);
      }
    });
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
    });
  });

  router.route('/student/byid/:_id')
  // get a student by id
  .get((req, res) => {
    console.log(req.params._id);
    Student.findOne({ _id : req.params._id }, (err, student) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(student);
      }
    });
  });

module.exports = router;
