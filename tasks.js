/**
 * Created by thram on 12/08/16.
 */
const gulp = require('gulp'),
      p    = require('./plugins'),
      c    = require('./config'),
      rev  = new Date().getTime();

const tasks = {

  scripts_vendor    : () => p.bundle('vendor').pipe(gulp.dest(`${c.folders.dist}`)),
  scripts_app       : () => p.bundle().pipe(gulp.dest(`${c.folders.dist}`)),
  lint              : () => gulp.src([`${c.folders.scripts}/**/*.js`, `${c.folders.tags}/**/*.tag`])
    .pipe(p.jshint.extract('always'))
    .pipe(p.jshint({expr: true, esnext: true}))
    .pipe(p.jshint.reporter('jshint-stylish')),
  browser_sync      : () => p.browserSync.init({
    server        : {baseDir: c.folders.dist},
    logLevel      : 'debug',
    logConnections: true
  }, (err, bs) => c.gzip && bs.addMiddleware("*", p.browserGzip(c.folders.dist), {override: true})),
  size_report_app   : () => p.bundle('app', true).pipe(gulp.dest('./reports')),
  size_report_vendor: () => p.bundle('vendor', true).pipe(gulp.dest('./reports')),
  layouts           : () => gulp.src(`${c.folders.src}/index.html`)
    .pipe(p.htmlReplace({
      css   : {src: c.fileName.style, tpl: `<link rel="stylesheet" href="%s?${rev}" />`},
      vendor: {src: 'vendor.js', tpl: `<script src="%s?${rev}"></script>`},
      js    : {src: c.fileName.script, tpl: `<script src="%s?${rev}"></script>`}
    })).pipe(p.mustache({
      description: c.manifest.description,
      brand      : c.manifest.brand,
      google_id  : c.deploy && c.manifest.google_id
    })).pipe(gulp.dest(c.folders.dist)),
  styles            : () => gulp.src([`${c.folders.styles}/app.scss`])
    .pipe(p.if(c.debug, p.sourcemaps.init({loadMaps: true})))
    .pipe(p.sass({outputStyle: 'compressed'}).on('error', p.sass.logError))
    .pipe(p.autoprefixer({browsers: ['last 3 versions', 'ie >= 9']}))
    .pipe(p.rename(c.fileName.style))
    .pipe(p.if(c.debug, p.sourcemaps.write({sourceRoot: '/styles'})))
    .pipe(p.if(c.gzip, p.gzip({append: false})))
    .pipe(gulp.dest(c.folders.dist)).pipe(p.browserSync.stream()),
  images            : ()=> gulp.src([
    `${c.folders.assets}/commons/images/**/*.{gif,jpg,png,svg}`,
    `${c.folders.assets}/${c.location}/images/**/*.{gif,jpg,png,svg}`
  ]).pipe(p.cache(p.imagemin({
    progressive      : true,
    svgPlugins       : [{removeViewBox: false}],
    optimizationLevel: c.release ? 3 : 1
  }))).pipe(gulp.dest(`${c.folders.dist}/assets/images`)),
  audios            : ()=> gulp.src([
    `${c.folders.assets}/commons/audios/*`,
    `${c.folders.assets}/${c.location}/audios/**/*`
  ]).pipe(gulp.dest(`${c.folders.dist}/assets/audios`)),
  videos            : ()=> gulp.src([
    `${c.folders.assets}/commons/videos/*`,
    `${c.folders.assets}/${c.location}/videos/**/*`
  ]).pipe(gulp.dest(`${c.folders.dist}/assets/videos`)),
  subpages          : ()=> gulp.src([
    `${c.folders.assets}/commons/subpages/**/*`,
    `${c.folders.assets}/${c.location}/subpages/**/*`
  ]).pipe(gulp.dest(`${c.folders.dist}/assets/subpages`)),
  watch             : () => gulp.watch([`${c.folders.styles}/**/*.scss`], ['styles']),
  publish           : () => {
    const credentials = require('./credentials.js'),
          publisher   = p.awspublish.create(credentials),
          headers     = {'Cache-Control': 'max-age=315360000, no-transform, public'};
    return p.merge(gulp.src(['dist/**/*.js', 'dist/**/*.css'])
        .pipe(publisher.publish(Object.assign({}, headers, c.gzip && {'Content-Encoding': 'gzip'})))
        .pipe(publisher.cache())
        .pipe(p.awspublish.reporter()),
      gulp.src(['dist/**/*.*', '!dist/**/*.js', '!dist/**/*.css'])
        .pipe(publisher.publish(headers))
        .pipe(publisher.cache())
        .pipe(p.awspublish.reporter())).pipe(p.exit());

  }
};

// Register All Tasks
for (let task in tasks) {
  gulp.task(task, tasks[task]);
}

module.exports = tasks;