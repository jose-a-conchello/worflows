// load the 'gulp' library into a variable
var gulp = require('gulp');
//  The 'gulp' variable contains an object that has all the
//  methods in the gulp library.

// Another plugin into another variable
var gutil = require('gulp-util');

//  Create a task
gulp.task('log', function ()   {// 'log' = task name (whatever we want)
//  The function body is what we want 'gulp' to do
    gutil.log("A message"); // prints a message to stdout
});

