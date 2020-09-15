const express = require("express");
const { referrerPolicy } = require("helmet");
const router = express.Router();
const database = require("../data/helpers/projectModel");

// READ
router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  database
    .get(id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json({
        message: `There was an error getting project by id: ${id}`,
        error: err,
      });
    });
});

// CREATE
router.post("/", (req, res) => {
  const projectToPost = req.body;

  database
    .insert(projectToPost)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error posting to projects.",
        error: err,
      });
    });
});

// UPDATE
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const newProjectData = req.body;

  database
    .update(id, newProjectData)
    .then((updatedProject) => {
      res.status(200).json(updatedProject);
    })
    .catch((err) => {
      res.status(500).json({
        message: `There was an error updating project with id ${id}`,
        error: err,
      });
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  database
    .remove(id)
    .then(() => {
      res.status(200).json({
        url: `/projects/${id}`,
        operation: `Successful DELETE of project ${id}`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: `There was an error deleting project with id ${id}`,
        error: err,
      });
    });
});

// GET PROJECT ACTIONS
router.get("/:id/actions", (req, res) => {
  const id = req.params.id;

  database
    .getProjectActions(id)
    .catch((actions) => {
      res.status(200).json(actions);
    })
    .then((err) => {
      res.status(500).json({
        message: `There was an error getting action on id ${id}`,
        error: err,
      });
    });
});

module.exports = router;
