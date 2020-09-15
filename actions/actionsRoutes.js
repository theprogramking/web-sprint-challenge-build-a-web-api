const express = require("express");
const { referrerPolicy } = require("helmet");
const router = express.Router();
const database = require("../data/helpers/actionModel");

// READ
router.get("/:id", (req, res) => {
  const id = req.params.id;

  database
    .get(id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({
        message: `There was an error getting action by id: ${id}`,
        error: err,
      });
    });
});

// CREATE
router.post("/", (req, res) => {
  const action = req.body;

  database
    .insert(action)
    .then((response) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error creating your action.",
        error: err,
      });
    });
});

// UPDATE
router.put("/:id", (req, res) => {
  const updatedAction = req.body;
  const id = req.params.id;

  database
    .update(id, updatedAction)
    .then((newAction) => {
      res.status(200).json(newAction);
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error updating your action",
        error: err,
      });
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  database
    .remove(id)
    .then((deletedAction) => {
      res.status(200).json(deletedAction);
    })
    .catch((err) => {
      res.status(500).json({
        message: `There was an error deleting action with id ${id}`,
        error: err,
      });
    });
});

module.exports = router;
