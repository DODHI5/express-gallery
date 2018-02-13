const express = require("express");
const Gallery = require("../knex/models/User");
const router = express.Router();
const handlebars = require("express-handlebars");

//Time
router.use((req, res, next) => {
  console.log(`In user route ${Date.now()}`);
  next();
});

router
  .route("/")
  .post((req, res) => {
    let { author, link, description } = req.body;

    return new Gallery({
      author,
      link,
      description
    })
      .save()
      .then(gallery => {
        res.redirect("/gallery");
      })
      .catch(err => {
        res.json({
          message: err.message
        });
      });
  })
  .get((req, res) => {
    return Gallery.fetchAll()
      .then(gallery => {
        res.render("./index", { collection: gallery.toJSON() });
      })
      .catch(err => {
        res.json({ message: err.message });
      });
  });

module.exports = router;
