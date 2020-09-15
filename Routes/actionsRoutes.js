const express = require("express");
const { referrerPolicy } = require("helmet");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "action Routes is a go!",
  });
});

module.exports = router;
