var debug           = require("gulp-debug")
var ejs             = require("ejs");
var fs              = require("fs");
var glob            = require('glob')
var gulp            = require('gulp');
var gulpIgnore      = require("gulp-ignore")
var gutil           = require('gulp-util');
var map             = require('map-stream');
var nodeInspector   = require('gulp-node-inspector');
var nodemon         = require('gulp-nodemon')
var reload          = browserSync.reload;
var babel = require("gulp-babel");
var through = require('through');
var wrap = require('gulp-wrap-amd');

gulp.task('inspector', function() {
	console.log('Debug')
	return gulp.src([])
	.pipe(nodeInspector({
		preload: false,
	}));
});

gulp.task('server', function () {
	nodemon({
		script: 'app.js',
		watch: ['server', 'shared'],
		nodeArgs: ['--debug']
	}).on('restart', function ()  {
		setTimeout(function () {reload();}, 5000);
	})
});

gulp.task('server-brk', function () {
	nodemon({
		script: 'app.js',
		watch: ['server', 'shared'],
		nodeArgs: ['--debug-brk']
	})
});

// server-side debugging with break on first line
gulp.task('debug', ['server-brk', 'inspector']);

// server-side debugging with front end watch
gulp.task('default', ['watch', 'server', 'inspector'])

gulp.task("build", [])
