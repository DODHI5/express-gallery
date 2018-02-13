const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
const path = require("path");
const galleryRoutes = require("./routes/gallery");
const userRoutes = require("./routes/users");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const session = require("express-session");
const bcrypt = require("bcrypt");
const Redis = require("connect-redis")(session);
const User = require("./knex/models/User");

app.use(
  session({
    store: new Redis(),
    secret: "whats in the box",
    resave: false,
    saveUninitialized: false
  })
);
app.use(express.static(path.join(__dirname, "/public")));

app.engine(
  ".hbs",
  hbs({
    defaultLayout: "main",
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");
// Boot Strap Server
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use(methodOverride("_method"));
app.use("/gallery", galleryRoutes);
app.use("/user_id", userRoutes);
app.get("/", function(req, res) {
  res.render("./layouts/main");
});

// Passport middleware setup
app.use(passport.initialize());
app.use(passport.session());
//before login
passport.serializeUser((user, done) => {
  console.log("serializing", user);
  return done(null, {
    id: user.id,
    username: user.username
  });
});
// after every request
passport.deserializeUser((user, done) => {
  console.log("deserializng");
  new User({ id: user.id }).fetch().then(user => {
    user = user.toJSON();
    return done(null, {
      id: user.id,
      username: user.username
    });
  });
});
//
passport.use(
  new LocalStrategy(function(username, password, done) {
    return new User({ username: username })
      .fetch()
      .then(user => {
        user = user.toJSON();
        console.log(user);
        if (user === null) {
          return done(null, false, {
            message: "Incorrect username or password"
          });
        } else {
          console.log(password, user.password);
          bcrypt.compare(password, user.password).then(res => {
            if (res) {
              return done(null, user);
            } else {
              return done(null, false, { message: "bad username or password" });
            }
          });
        }
      })
      .catch(err => {
        console.log("error: ", err);
      });
  })
);

app.get("/", (req, res) => {
  res.send("smoke test");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/"
  })
);

app.get("/logout", (req, res) => {
  req.logout();
  res.sendStatus(200);
});

app.post("/register", (req, res) => {
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) {
      console.log(err);
    }
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      if (err) {
        console.log(err);
      }
      new User({
        username: req.body.username,
        password: hash
      })
        .save()
        .then(user => {
          console.log(user);
          res.redirect("/");
        })
        .catch(err => {
          console.log(err);
          return res.send("Stupid username");
        });
    });
  });
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
}

app.get("/secret", isAuthenticated, (req, res) => {
  console.log("req.user: ", req.user);
  console.log("req.user id", req.user.id);
  console.log("req.username", req.user.username);
  res.send("you found the secret!");
});

app.listen(PORT, err => {
  if (err) {
    console.log(err.message);
  }
  console.log(`Server's up on port: ${PORT}`);
});
