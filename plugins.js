/**
 * Created by thram on 22/08/16.
 */

const gulp         = require('gulp'),
      c            = require('./config'),
      browserify   = require('browserify'),
      envify       = require('loose-envify/custom'),
      watchify     = require('watchify'),
      babelify     = require('babelify'),
      bulkify      = require('bulkify'),
      disc         = require('disc'),
      gutil        = require('gulp-util'),
      source       = require('vinyl-source-stream'),
      buffer       = require('vinyl-buffer'),
      sourcemaps   = require('gulp-sourcemaps'),
      gIf          = require('gulp-if'),
      gzip         = require('gulp-gzip'),
      uglify       = require('gulp-uglify'),
      resolve      = require('resolve'),
      browserSync  = require('browser-sync').create(),
      DEPENDENCIES = Object.keys(c.manifest.dependencies && c.manifest.dependencies || {});

// Helpers
const bundle     = (bundler, type) => bundler.bundle()
        .on('error', function (err) {
          gutil.log('Error! ' + err.message);
          this.emit("end");
        })
        .pipe(source(type === 'vendor' ? 'vendor.js' : c.fileName.script))
        .pipe(buffer())
        .pipe(gIf(c.debug, sourcemaps.init({loadMaps: true})))
        .pipe(gIf(c.release, uglify()))
        .pipe(gIf(c.debug, sourcemaps.write('./')))
        .pipe(gIf(c.gzip, gzip({append: false}))),
      sizeReport = (bundler, type) => bundler.bundle()
        .pipe(disc())
        .pipe(source(type === 'vendor' ? 'sizeReportVendor.html' : 'sizeReportBundle.html'));

module.exports = {
  source      : source,
  buffer      : buffer,
  rename      : require('gulp-rename'),
  uglify      : uglify,
  cache       : require('gulp-cache'),
  sourcemaps  : sourcemaps,
  log         : gutil.log,
  autoprefixer: require('gulp-autoprefixer'),
  htmlReplace : require('gulp-html-replace'),
  del         : require('del'),
  if          : gIf,
  browserSync : browserSync,
  browserGzip : require('connect-gzip-static'),
  sass        : require('gulp-sass'),
  yaml        : require('gulp-yaml'),
  imagemin    : require('gulp-imagemin'),
  exit        : require('gulp-exit'),
  gzip        : gzip,
  awspublish  : require('gulp-awspublish'),
  jshint      : require('gulp-jshint'),
  mustache    : require("gulp-mustache"),
  bundle      : (type, report) => {
    let bundler;
    switch (type) {
      case 'vendor':
        bundler = browserify(c.browserify.vendor);
        bundler = bundler.require(DEPENDENCIES);
        break;
      default:
        bundler = browserify(c.browserify.app)
          .transform(babelify.configure(c.babelify))
          .transform(bulkify)
          .transform(envify(c.envify, {global: c.envify.global}))
          .plugin(watchify, c.watchify);

        if (c.release)  bundler = bundler.transform('uglifyify');

        bundler = bundler.external(DEPENDENCIES);

        if (c.debug) {
          bundler.on('log', gutil.log);
          bundler.on('update', () => {
            gutil.log('-> bundling...');
            bundle(bundler, type).pipe(gulp.dest(`${c.folders.dist}`)).on('end', () => browserSync.reload())
          })
        }

    }

    return report ? sizeReport(bundler, type) : bundle(bundler, type);
  }

};