function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/gallery");
  }
}

module.exports = {
  isAuthenticated: isAuthenticated
};
