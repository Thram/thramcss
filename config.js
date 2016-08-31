const packageManifest = require('./package.json'),
      argv            = require('yargs').argv,
      task            = argv._[0],
      deploy          = task && task.indexOf('deploy') >= 0,
      sizeReport      = task === 'size_report' || task === 'size_report_app' || task === 'size_report_vendor',
      location        = argv.l || argv.location || 'nz',
      dev             = argv.d || argv.dev,
      gzip            = !dev && (argv.g || argv.gzip),
      release         = !dev && (argv.r || argv.release || gzip),
      debug           = !release,
      watch           = argv.w || argv.watch || debug;

let folders = {
  src    : `${__dirname}/src`,
  dist   : `${__dirname}`,
  modules: `${__dirname}/node_modules`
};

folders = Object.assign({}, folders, {
  assets : `${folders.src}/assets`,
  lang   : `${folders.src}/lang`,
  styles : `${folders.src}/styles`,
  tags   : `${folders.src}/tags`,
  scripts: `${folders.src}/core`,
  tests  : `${folders.src}/test`
});

process.env.APP_LOCATION = location;
process.env.NODE_ENV     = release ? 'production' : 'development';

module.exports = {
  deploy    : deploy,
  location  : location,
  manifest  : packageManifest,
  watch     : watch,
  task      : task,
  debug     : debug,
  release   : release,
  gzip      : gzip,
  folders   : folders,
  fileName  : {
    style : `styles.css`,
    script: `bundle.js`,
  },
  browserify: {
    app   : {
      paths       : [
        folders.lang,
        folders.tags,
        folders.scripts
      ],
      entries     : `${folders.scripts}/main.js`,
      transform   : ['browserify-data', 'riotify'],
      debug       : debug,
      cache       : {}, // <---- here is important things for optimization
      packageCache: {}, // <----  and here
      fullPaths   : sizeReport
    },
    vendor: {
      debug    : debug,
      paths    : [folders.modules],
      fullPaths: sizeReport
    }
  },
  watchify  : {ignoreWatch: [folders.modules + '/**']},
  envify    : {
    _           : 'purge',
    APP_LOCATION: process.env.APP_LOCATION,
    NODE_ENV    : process.env.NODE_ENV
  },
  babelify  : {
    "presets": ["es2015-riot", "stage-0", "stage-2"],
    "plugins": [
      ["transform-es2015-classes", {"loose": true}],
      ["transform-es2015-modules-commonjs", {"allowTopLevelThis": true}]
    ]
  }
};