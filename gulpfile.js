/**
 * Created by thram on 9/08/16.
 */
const gulp  = require('gulp'),
      sync  = require('gulp-sync')(gulp).sync,
      tasks = require('./tasks');

// Main Tasks
gulp.task('assets', ['images', 'audios', 'videos', 'subpages']);
gulp.task('scripts', sync(['lint', 'scripts_vendor', 'scripts_app']));
gulp.task('size_report', sync(['size_report_vendor', 'size_report_app']));
gulp.task('build', ['layouts', 'assets', 'styles', 'scripts']);
gulp.task('serve', sync(['build', 'browser_sync']));
gulp.task('deploy', sync(['setup_deploy', 'build', 'publish']));
gulp.task('default', sync(['serve', 'watch']));