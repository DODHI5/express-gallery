const express = require("express");
const Gallery = require("../knex/models/Gallery");
const router = express.Router();
const handlebars = require("express-handlebars");
const { isAuthenticated: auth } = require("./helper");

//Time
router.use((req, res, next) => {
  console.log(`In user route ${Date.now()}`);
  next();
});

router
  .route("/")
  .post(auth, (req, res) => {
    console.log("qqqqqqqqqqqqqq", req.user);
    let data = ({ author, link, description } = req.body);
    data.user_id = req.user.id;
    console.log("zzzzzzzzzzzzzzz", user_id);
    return new Gallery(data)
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
        res.render("./index", {
          collection: gallery.toJSON()
        });
      })
      .catch(err => {
        res.json({
          message: err.message
        });
      });
  });

router.route("/new").get((req, res) => {
  return Gallery.fetchAll().then(result => {
    res.render("./gallery/new", {
      collection: result
    });
  });
});

router.get("/:id/edit", (req, res) => {
  return new Gallery({
    id: req.params.id
  })
    .fetch()
    .then(request => {
      if (!request) {
        throw new Error("not found");
      }
      return res.render("./gallery/edit", request.toJSON());
    })
    .catch(err => {
      return res.json({
        message: err.message
      });
    });
});

router.route("/:id").get((req, res) => {
  return new Gallery({
    id: req.params.id
  })
    .fetch()
    .then(gallery => {
      if (!gallery) {
        throw new Error("user not found");
      }
      res.render("./gallery/image", gallery.toJSON());
    });
});

router.route("/:id/edit").put((req, res) => {
  return new Gallery({
    id: req.params.id
  })
    .save(req.body, {
      patch: true,
      require: true
    })
    .then(result => {
      return res.render("./gallery/image", result.toJSON());
    })
    .catch(err => {
      return res.json({
        message: err.message
      });
    });
});

router.delete("/:id", (req, res) => {
  return new Gallery({
    id: req.params.id
  })
    .destroy({
      require: true
    })
    .then(request => {
      res.redirect("/gallery");
    })
    .catch(err => {
      return res.json({
        message: err.message
      });
    });
});

module.exports = router;
