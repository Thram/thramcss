const gulp         = require('gulp'),
      argv         = require('yargs').argv,
      del          = require('del'),
      $            = require('gulp-load-plugins')(),
      sync         = $.sync(gulp).sync,
      gzip          = argv.g || argv.gzip;

gulp.task('clean', (cb) => del([`./dist/*`], cb));

gulp.task('styles:dev', () => gulp.src(`./src/thramcss.scss`)
  .pipe($.sourcemaps.init({loadMaps: true}))
  .pipe($.sass().on('error', $.sass.logError))
  .pipe($.autoprefixer({browsers: ['last 3 versions', 'ie >= 8']}))
  .pipe($.rename('thram.css'))
  .pipe($.sourcemaps.write({sourceRoot: '/styles'}))
  .pipe(gulp.dest('./dist')));

gulp.task('styles:prod', () => gulp.src(`./src/thramcss.scss`)
  .pipe($.sass({outputStyle: 'compressed'}).on('error', $.sass.logError))
  .pipe($.autoprefixer({browsers: ['last 3 versions', 'ie >= 9']}))
  .pipe($.rename('thram.min.css'))
  .pipe($.if(gzip, $.gzip({append: false})))
  .pipe(gulp.dest('./dist')));

gulp.task('default', sync(['clean', ['styles:dev', 'styles:prod']]));