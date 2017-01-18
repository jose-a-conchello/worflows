// load the 'gulp' library into a variable
var gulp = require('gulp');
//  The 'gulp' variable contains an object that has all the
//  methods in the gulp library.

// more plugins into other variables
var gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'), // takes care of 'require'
    compass = require('gulp-compass'), // Includes sass
    concat = require('gulp-concat');

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
});

// see http://sass-lang.com/documentation/file.SASS_REFERENCE.html
//  for sass options 
// Task to apply sass and compass
gulp.task('compass', function() {
  gulp.src(sassSources)
    
    .pipe(compass({
        sass: 'components/sass', // find sass &scss files here
        image: 'builds/development/images', // where images are
        style: 'expanded' // output: nested, expanded, compact, compressed
      })
      .on('error', gutil.log)  // What to do in case of a compass error
    ) 
    .pipe(gulp.dest('builds/development/css')) // place css file here
});
