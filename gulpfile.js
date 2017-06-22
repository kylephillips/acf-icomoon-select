var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');

// Style Paths
var scss = 'assets/scss/*';
var css = 'assets/css/';

// JS Paths
var js_source = [
	
];
var js_compiled = 'assets/js/';

/**
* Smush the front end Styles and output
*/
gulp.task('sass', function(callback){
	pump([
		gulp.src(scss),
		sass({sourceComments: 'map', sourceMap: 'sass', style: 'compact'}),
		autoprefix('last 15 version'),
		minifycss({keepBreaks: false}),
		gulp.dest(css),
		livereload(),
		notify('ACF Icomoon styles compiled & compressed.')
	], callback);
});

/**
* Concatenate and uglify scripts
*/
gulp.task('js', function(callback){
	pump([
		gulp.src(js_source),
		concat('acf-icomoon-select-scripts.min.js'),
		gulp.dest(js_compiled),
		uglify(),
		gulp.dest(js_compiled),
		notify('ACF Icomoon scripts compiles & compressed.')
	], callback);
});

/**
* Watch Task
*/
gulp.task('watch', function(){
	livereload.listen();
	gulp.watch(scss, ['sass']);
	gulp.watch(js_source, ['js']);
});

/**
* Default
*/
gulp.task('default', ['sass', 'js', 'watch']);