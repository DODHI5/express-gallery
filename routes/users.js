const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  console.log("hahahahahahahahahaha");
  return res.render("register");
});

router.route("/").get((req, res) => {
  console.log("hahahahahahahahahaha");
  return res.render("register");
});

module.exports = router;
