const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

// we'll authenticate users from here
router.use((req, res, next) => {
  console.log('A request has been made.');
  next();
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.status(200).json('Successfully connected to API');
});

var Project = require('../models/project.ts');
var Course = require('../models/course.ts');
var Proposer = require('../models/proposer.ts');
var Responsible = require('../models/responsible.ts');
var Advisor = require('../models/advisor.ts');
var Examiner = require('../models/examiner.ts');
var Student = require('../models/student.ts');

router.route('/projects')
  // create new project
  .post((req, res) => {
    var obj = req.body;
    var project = new Project(obj);

    
    project.save((err) => {
      if (err) {
        res.status(500).send(err);
      } else {
      res.status(200).json({ message: 'Your project has been created.'});
      }
    });
  })
  

  // get all projects
  .get((req, res) => {

    Project
    .find((err, projects) => {
      if (err) {
        res.status(500).send(err);
      } else {
          res.status(200).json({ message: 'Your project has been created.'});
      }
      res.status(200).json(projects);
    })
    .populate('course')
    .populate('proposer')
    .populate('responsible')
    .populate('advisor')
    .populate('examiner')
    .populate('student')
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
      });
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

module.exports = router;
