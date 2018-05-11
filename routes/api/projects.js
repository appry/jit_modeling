const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const User = require("../../models/User");
const Project = require("../../models/Project");

//@route    GET api/projects/info
//@desc     Get all projects info
//access    Private
router.get(
  "/info",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.find({ user: req.user.id })
      .then(projects => {
        let obj = {};
        for (let project of projects) {
          project = project.toObject();
          delete project.jsonData;
          obj[project._id] = project;
        }
        res.json(obj);
      })
      .catch(err => {
        res.status(500).json({ servererror: "Unkonwn server error" });
      });
  }
);

//@route    GET api/projects
//@desc     Get all projects
//access    Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.find({ user: req.user.id })
      .then(projects => {
        let obj = {};
        for (let project of projects) {
          obj[project._id] = project;
        }
        res.json(obj);
      })
      .catch(err => {
        res.status(500).json({ servererror: "Unkonwn server error" });
      });
  }
);

//@route    GET api/projects/:id
//@desc     Get project by id
//access    Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.findOne({ user: req.user.id, _id: req.params.id })
      .then(project => {
        res.json(project.jsonData);
      })
      .catch(err => {
        res.status(500).json({ servererror: "Unkonwn server error" });
      });
  }
);

//@route    POST api/projects
//@desc     Create new project
//access    Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newProject = new Project({
      user: req.user.id,
      jsonData: "",
      name: req.body.name
    });

    newProject
      .save()
      .then(project => {
        res.json(project);
      })
      .catch(err =>
        res.status(500).json({ servererror: "Unkonwn server error" })
      );
  }
);

//@route    PUT api/projects/:id
//@desc     Update project
//access    Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let projectFields = {};
    projectFields.name = req.body.name;
    projectFields.jsonData = req.body.jsonData;
    projectFields.user = req.user.id;
    Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: projectFields },
      { new: true }
    )
      .then(project => res.json({ success: true, project }))
      .catch(err =>
        res.status(404).json({ projectnotfound: "No project found" })
      );
  }
);

//@route    DELETE api/projects/:id
//@desc     Delete project
//access    Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.findOne({ _id: req.params.id, user: req.user.id })
      .then(project => {
        project.remove().then(() => {
          res.json({ success: true });
        });
      })
      .catch(err =>
        res.status(404).json({ projectnotfound: "No project found" })
      );
  }
);

module.exports = router;
