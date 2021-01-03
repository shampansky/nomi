"use strict";

var gulp = require("gulp");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var pipeline = require("readable-stream").pipeline;
var htmlmin = require('gulp-htmlmin');
var webp = require("gulp-webp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var del = require("del");
var csso = require("gulp-csso");
var replace = require('gulp-replace');
var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

var ftpPath = '/media/up/ikwordmama/promo/lassig2020/';

gulp.task("css-upload", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(replace('../img/', ftpPath))
    .pipe(rename("style.upload.css"))
    .pipe(gulp.dest("build/upload"))
});

gulp.task("html-upload", function () {
  return gulp.src("source/index.html")
    .pipe(replace('img/', ftpPath))
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({ collapseWhitespace: false }))
    .pipe(rename("index.upload.html"))
    .pipe(gulp.dest("build/upload"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({ collapseWhitespace: false }))
    .pipe(gulp.dest("build"))
    .pipe(rename("upload.html"));
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 95}))
    .pipe(gulp.dest("build/img"));
});

gulp.task('uglify', function () {
  return pipeline(
    gulp.src('source/js/*.js'),
    uglify(),
    gulp.dest('build/js')
  );
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task('replace', function() {
  gulp.src('*.html')
    .pipe(rep({
      prependSrc : '/media/up/grohe/delivery2019',
      keepOrigin : false
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css", "css-upload", "refresh"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "html-upload", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "html-upload", "refresh"));
  gulp.watch("source/js/**/*.js", gulp.series("copy", "refresh"));
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "css-upload",
  "webp",
  "sprite",
  "html",
  "html-upload"
));

gulp.task("start", gulp.series("build", "server"));
