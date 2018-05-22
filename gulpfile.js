'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass'); // Sass plugin for Gulp
const plumber = require('gulp-plumber'); // Prevent pipe breaking caused by errors from gulp plugins
const postcss = require('gulp-postcss'); // PostCSS gulp plugin to pipe CSS through several plugins, but parse CSS only once.
const autoprefixer = require('autoprefixer'); // Parse CSS and add vendor prefixes to rules by Can I Use
const mqpacker = require('css-mqpacker'); // Pack same CSS media query rules into one using PostCSS
const minify = require('gulp-csso'); // Minify CSS with CSSO
const rename = require('gulp-rename'); // Rename files easily
const imagemin = require('gulp-imagemin'); // Minify PNG, JPEG, GIF and SVG images with imagemin
const imageminMozjpeg = require('imagemin-mozjpeg'); // Compress IMG's
const imageresize = require('gulp-image-resize'); // Change IMG resolution
const svgmin = require('gulp-svgmin'); // Minify SVG with SVGO
const server = require('browser-sync').create(); // Live CSS Reload & Browser Syncing
const run = require('run-sequence'); // Run a series of dependent gulp tasks in order

gulp.task('style', function() {
  gulp.src('src/sass/styles.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        'last 2 version',
        'last 3 Chrome versions',
        'last 3 Firefox versions',
        'last 3 Opera versions',
        'last 3 Edge versions']}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('js', function() {
  return gulp.src([
    'src/js/*.js',
    'src/sw.js'
    ])
    .pipe(gulp.dest('build/js'))
    .pipe(server.stream());
});

gulp.task('utility', function() {
  return gulp.src('src/manifest.json')
    .pipe(gulp.dest('build'))
    .pipe(server.stream());
});

gulp.task('serve', function() {
  server.init({
    server: 'build',
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch('src/sw.js', ['sw']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/*.html', ['copy_html']);
  gulp.watch('build/*.html').on('change', server.reload);
  gulp.watch('src/sass/**/*.{scss,sass}', ['style']);
});

gulp.task("copy_html", function() {
  return gulp.src("src/*.html", {base: "src"})
    .pipe(gulp.dest("build"));
});

gulp.task('imgmin', function() {
  return gulp.src('src/img/**/*.{png,jpg,gif}')
    .pipe(imagemin([
      imageminMozjpeg({quality: 70}),
      imagemin.optipng({optimizationLevel: 3})
    ]))
    .pipe(gulp.dest('build/img'))
    .pipe(imageresize({
      width : 400,
      height : 400,
      crop : false,
      upscale : false
    }))
    .pipe(rename(function (path) {
      path.basename += '-400';
    }))
    .pipe(gulp.dest('build/img'));
});

gulp.task('svgmin', function() {
  return gulp.src('src/img/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('src/img'));
})

gulp.task('copy', function() {
  return gulp.src([
    'src/*.html',
    'src/fonts/**/*.{woff,woff2}',
    'src/js/*.js',
    'src/img/*.*'
  ], {
    base: 'src'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('build', function(fn) {
  run('imgmin', 'js', 'utility', 'svgmin', 'copy', 'style', fn);
});
