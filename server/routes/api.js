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
  res.json('Successfully connected to API');
});

var Project = require('../models/project.ts');

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
    Project.find((err, projects) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(projects);
    });
  });

  router.route('/projects/:id')
    // get a project by id
    .get((req, res) => {
      Project.find({ _id : req.params.id }, (err, project) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).json(project);
      });
    })

      // update a project by id
      .put((req, res) => {
        var obj = req.body;

        Project.findOneAndUpdate({ _id : req.params.id },
          { title : obj.title, advisors : obj.advisors, proposer : obj.proposer,
            important_courses : obj.important_courses, background : obj.background,
            motivation : obj.motivation, methods : obj.methods,
            objectives : obj.objectives, students_assigned : obj.students_assigned },
            (err, project) =>{
          if (err) {
            res.status(500).send(err);
          }
          res.status(200).json({ message: 'Your project has been updated.'});
        });
      })

      // delete a project by id
      .delete((req, res) => {
        Project.findOneAndRemove({ _id : req.params.id }, (err, project) => {
          if (err) {
            res.status(500).send(err);
          }
          res.status(200).json({ message: 'Your project has been deleted.'});
        });
      });

module.exports = router;
