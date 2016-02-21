'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('sass', function () {
  gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
  gulp.src('./game/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./game'));
});

gulp.task('coffee', ['concat'], function() {
  gulp.src('./novel.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./'));
  gulp.src('./test.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.start('sass')
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./game/**/*.scss', ['sass']);
  gulp.watch('./src/*.coffee', ['coffee']);
});

gulp.task('default', function() {
  gulp.start('sass', 'coffee');
});

gulp.task('compress', ['coffee'], function() {
  return gulp.src('./novel.js')
    .pipe(uglify({"mangle":true}))
    .pipe(gulp.dest('./'));
});

gulp.task('concat', function() {
  gulp.src('./src/*.coffee')
    .pipe(concat('novel.coffee'))
    .pipe(gulp.dest('./'));
  gulp.src('./test/*.coffee')
    .pipe(concat('test.coffee'))
    .pipe(gulp.dest('./'));
});
