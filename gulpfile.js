"use strict";

var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var babelify = require('babelify');

var opts = {
	frontendDirectory: './public/js/',
	jsDirectory: './public/js/',
	mainJsOutput: './bundle.js',
	buildFolder: './public/js/',
	watchedFiles: [],
};

gulp.task('compile-public', function() {
	return browserify({
		entries: [opts.frontendDirectory + 'public.js'], // Only need initial file, browserify finds the deps
		transform: [babelify], // We want to convert JSX to normal javascript
		cache: {},
		packageCache: {},
	}).ignore('jquery')
	.bundle() // Create the initial bundle when starting the task
	.on('error', function(e) {
		gutil.log(gutil.colors.red('Bundle error:', e.message));
	})
	.pipe(source('publicBundle.js'))
	.pipe(gulp.dest(opts.jsDirectory));
});

gulp.task('browserify', function() {
	var watcher = watchify(browserify({
		entries: [opts.frontendDirectory + 'router.jsx'], // Only need initial file, browserify finds the deps
		transform: [babelify], // We want to convert JSX to normal javascript
		debug: true, // Gives us sourcemapping
		cache: {},
		packageCache: {},
		fullPaths: true, // Requirement of watchify
	}).ignore('jquery'));

	return watcher
	// When any files update
	.on('update', function() {
		watcher.bundle()
		.on('error', function(e) {
			gutil.log(gutil.colors.red('Bundle error:', e.message));
		})
		// Create new bundle that uses the cache for high performance
		.pipe(source('bundle.js'))
		// This is where you add uglifying etc.
		.pipe(gulp.dest(opts.jsDirectory));
		/* jshint ignore:start */
		console.log('Updated!', Date.now());
		/* jshint ignore:end */
	})
	// Create the initial bundle when starting the task
	.bundle()
	.on('error', function(e) {
		gutil.log(gutil.colors.red('Bundle error:', e.message));
	})
	.pipe(source('bundle.js'))
	.pipe(gulp.dest(opts.jsDirectory));
});

gulp.task('default', ['compile-public'], function() {
});
