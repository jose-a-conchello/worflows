// load the 'gulp' library into a variable
var gulp = require('gulp');
//  The 'gulp' variable contains an object that has all the
//  methods in the gulp library.

// more plugins into other variables
var gutil = require('gulp-util'),
    coffee = require('gulp-coffee');

//  The 'src' method can take a file name or an array of file names.
//  JavaScript array syntax: ['file1', 'file2', ..., 'fileN']
//  File names can include wildcards e.g. 'components/coffee/*.coffee'
var coffeeSources = ['components/coffee/tagline.coffee'];

//  Create a task
gulp.task('coffee', function ()   {// 'log' = task name (whatever we want)
//  The function body is what we want 'gulp' to do
  gulp.src(coffeeSources)
    .pipe( coffee({bare: true}) // Make a .js form the .coffee
      .on('error', gutil.log) ) // What to do in case of a coffee error
                                // .log logs the error (to stdout?)
    .pipe( gulp.dest('components/scripts') ) //where to place result
});

