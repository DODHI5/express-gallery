const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
const path = require("path");
const galleryRoutes = require("./routes/gallery");
// const knex = require("./knex/knex.js");
app.use(express.static(path.join(__dirname, "/public")));

app.engine(
  ".hbs",
  hbs({
    defaultLayout: "main",
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use("/gallery", galleryRoutes);
app.get("/", function(req, res) {
  res.render("./layouts/main");
});

app.listen(PORT, err => {
  if (err) {
    console.log(err.message);
  }
  console.log(`Server's up on port: ${PORT}`);
});
