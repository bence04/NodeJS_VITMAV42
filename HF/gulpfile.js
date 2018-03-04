var gulp = require("gulp");
var sass = require("gulp-sass");
var htmlmin = require("gulp-htmlmin");
var cssmin = require("gulp-cssmin");
var rename = require("gulp-rename");
var minifyjs = require('gulp-js-minify');
var browserSync = require("browser-sync").create();

gulp.task("copy-materialize", function() {
  return gulp
    .src("node_modules/materialize-css/dist/**/*")
    .pipe(gulp.dest("build/assets/"));
});

gulp.task("copy-js", function() {
  return gulp
    .src("app/js/**/*.js")
    .pipe(gulp.dest("build/assets/js"));
});

gulp.task("copy-img", function() {
  return gulp
    .src("app/img/**/*")
    .pipe(gulp.dest("build/assets/img"));
});

gulp.task("sass", function() {
  return gulp
    .src("app/style/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("build/assets/css"))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task("minify-css", function() {
  return gulp
  .src("app/style/**/*.scss")
  .pipe(sass())
  .pipe(cssmin())
  .pipe(rename({ suffix: ".min" }))
  .pipe(gulp.dest("build/assets/css"))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task("minify-js", function() {
    return gulp
    .src("app/js/**/*.js")
    .pipe(minifyjs())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("build/assets/js"))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task("src", function() {
  return gulp
    .src("app/src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build/"))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "build"
    }
  });
});

gulp.task("watch", ["browserSync", "sass", "src", "minify-css", "copy-materialize", "copy-js", "minify-js", "copy-img"], function() {
  gulp.watch("app/style/**/*.scss", ["sass", "minify-css"]);
  gulp.watch("app/js/**/*.js", ["copy-js", "minify-js"]);
  gulp.watch("app/img/**/*", ["copy-img"]);
  gulp.watch("app/src/**/*.html", ["src"]);
});

gulp.task("build", ["sass", "src", "minify-css", "copy-materialize", "copy-js", "minify-js", "copy-img"], function() {
  console.log("Building files");
});
