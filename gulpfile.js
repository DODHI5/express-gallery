const gulp = require("gulp");
const sass = require("gulp-sass");
gulp.task("styles", function() {
  gulp
    .src("sass/**/*.scss") // read all subdirectories and files in /sass that is .scss
    .pipe(sass().on("error", sass.logError)) // pass errors
    .pipe(gulp.dest("public/css/")); // compile sass to this directory
});

// SASS Watcher
gulp.task("watch", function() {
  gulp.watch("sass/**/*.scss", ["styles"]); // watch this dir and run 'styles'
});

gulp.task("default", ["watch"]); // set default to run 'watch'
