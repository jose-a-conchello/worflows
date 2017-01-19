// load the 'gulp' library into a variable
var gulp = require('gulp');
//  The 'gulp' variable contains an object that has all the
//  methods in the gulp library.

// more plugins into other variables
var gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'), // takes care of 'require'
    compass = require('gulp-compass'), // Includes sass
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload');

//  The 'src' method can take a file name or an array of file names.
//  JavaScript array syntax: ['file1', 'file2', ..., 'fileN']
//  File names can include wildcards e.g. 'components/coffee/*.coffee'
var coffeeSources = ['components/coffee/tagline.coffee'];
//  List of JavaScript files to use for the project
//  (includes does created by 'coffee')
//  Files are processed in the order they appear in the array
var jsSources = [
      'components/scripts/rclick.js', 
      'components/scripts/pixgrid.js', 
      'components/scripts/tagline.js', 
      'components/scripts/template.js'
    ];

var sassSources = ['components/sass/style.scss'];


//  task to convert coffee into JavaScript
gulp.task('coffee', function ()   {// 'log' = task name (whatever we want)
//  The function body is what we want 'gulp' to do
  gulp.src(coffeeSources)
    .pipe( coffee({bare: true}) // Make a .js form the .coffee
      .on('error', gutil.log) ) // What to do in case of a coffee error
                                // .log logs the error (to stdout?)
    .pipe( gulp.dest('components/scripts') ) //where to place result
});

// Task to process JavaScript files
gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('jscript.js')) // concatenate into a single script
                                // file name is the one used in the html
    .pipe(browserify()) 
    .pipe(gulp.dest('builds/development/js')) // place here the file
    .pipe(connect.reload()) // automatically reload the page
                            // see comment below regarding 'connect'
});

// see http://sass-lang.com/documentation/file.SASS_REFERENCE.html
//  for sass options 
// Task to apply sass and compass
gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
        sass : 'components/sass', // find sass &scss files here
        image: 'builds/development/images', // where images are
        style: 'expanded' // output: nested, expanded, compact, compressed
      })
      .on('error', gutil.log)  // What to do in case of a compass error
    ) 
    .pipe(gulp.dest('builds/development/css')) // place css file here
    .pipe(connect.reload()) // automatically reload the page
                            // see comment below regarding 'connect'
});

// the task method has an optional second argument with a list 
//  of tasks the current one depends on. Those tasks will be done
//  before the current one.
//  This can be exploited to create an empty tasks with all
//  other tasks as requisites

//  An alternate approach is to create a task called 'default' 
//  that depends on all the other tasks. When gulp is used w/o 
//  arguments, it performs the default task

// // // gulp.task('default', ['coffee', 'js', 'compass']); 
// no third arg used but a call-back can be included if desired 

// gulp watch method to watch for file changes
gulp.task('watch',  function(){
//..watch(<file or array of files>, <function or array of tasks>)
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch(['components/sass/*.scss'], ['compass']);
});

//..Making the default task run 'watch' (instead of the array of
//  tasks 'watch' triggers one can start gulp w/o args. and leave
//  it running
gulp.task('default', ['connect', 'watch']); 

//  The 'connect' task below starts a server when the default task
//  launches but does not refresh (or reload) in response to any
//  change.  To have it reload, either a new task needs to be
//  created or a reload method added to existing tasks. In this
//  example, the reload is added to both the 'js' and the
//  'compass' tasks. It is not necessary for the 'coffee' task
//  because it modifies a JavaScript file and thus causes the 'js'
//  task to run.
//  
//  UPDATE:
//  gulp-connect no longer suppors livereload. livereload is now
//  a separate plugin. The 'listen' method must be explicity 
//  used, for example in the 'watch' task. I tried this but did not
//  work either.
//
//  For more info:
//      https://www.npmjs.com/package/gulp-livereload

gulp.task('connect', function() {
connect.server(  {
       root: 'builds/development/', // root directory with files to load 
       liveload: true
    });
});
