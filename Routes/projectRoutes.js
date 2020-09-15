const express = require("express");
const { referrerPolicy } = require("helmet");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "We did it!",
  });
});

module.exports = router;
