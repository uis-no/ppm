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


var Project = require('../models/project.ts');
var Course = require('../models/course.ts');
var Employee = require('../models/employee.ts');
var Student = require('../models/student.ts');

// TODO: make a put route for globally changing all projects' time limit
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
    .populate('proposer.value')
    .populate('responsible.value')
    .populate('advisor.value')
    .populate('examiner.value')
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
  });


  router.route('/projects/:_id')
    // get a project by id
    .get((req, res) => {
      // TODO: find a way to cast objectid to string or number
      Project.findOne({ _id : req.params._id }, (err, project) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json(project);
        }
      })
    .populate('course')
    .populate('proposer.value')
    .populate('responsible.value')
    .populate('advisor.value')
    .populate('examiner.value')
    .populate('student')
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

router.route('/advisor')
  // get all advisors
  .get((req, res) => {
    Advisor
    .find((err, advisors) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(advisors);
    })
  })

  // create new advisor
  .post((req, res) => {
    var obj = req.body;
    var advisor = new Advisor(obj);
    console.log(advisor);
    advisor.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
      res.status(200).json({ message: 'Your advisor has been created.'});
      }
    });
  });


  router.route('/examiner')
  // get all examiners
  .get((req, res) => {
    Examiner
    .find((err, examiners) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(examiners);
    })
  })

  // create new examiner
  .post((req, res) => {
    var obj = req.body;
    var examiner = new Examiner(obj);
    console.log(examiner);
    examiner.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
      res.status(200).json({ message: 'Your examiner has been created.'});
      }
    });
  });


  router.route('/proposer')
  // get all proposers
  .get((req, res) => {
    Proposer
    .find((err, proposers) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(proposers);
    })
  })

  // create new proposer
  .post((req, res) => {
    var obj = req.body;
    var proposer = new Proposer(obj);
    console.log(proposer);
    proposer.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
      res.status(200).json({ message: 'Your proposer has been created.'});
      }
    });
  });


    router.route('/responsible')
  // get all responsibles
  .get((req, res) => {
    Responsible
    .find((err, responsibles) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(responsibles);
    })
  })

  // create new responsible
  .post((req, res) => {
    var obj = req.body;
    var responsible = new Responsible(obj);
    console.log(responsible);
    responsible.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
      res.status(200).json({ message: 'Your responsible has been created.'});
      }
    });
  });


    router.route('/student')
  // get all students
  .get((req, res) => {
    Proposer
    .find((err, proposers) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(proposers);
    })
  })

  // create new proposer
  .post((req, res) => {
    var obj = req.body;
    var proposer = new Proposer(obj);
    console.log(proposer);
    proposer.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
      res.status(200).json({ message: 'Your proposer has been created.'});
      }
    });
  });

module.exports = router;
