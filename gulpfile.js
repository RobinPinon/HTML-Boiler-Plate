// Load Gulp
const gulp = require('gulp');

// Load plugins
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// Compile Sass
gulp.task('sass', function() {
	return gulp.src('resources/scss/app.scss')
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(gulp.dest('dist/css'))
	.pipe(cleanCSS())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('dist/css'));
});

// Compile JavaScript
gulp.task('js', function() {
	return gulp.src('resources/js/**/*.js')
	.pipe(concat('app.js'))
	.pipe(gulp.dest('dist/js'))
	.pipe(uglify())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('dist/js'));
});

// Watch for changes
gulp.task('watch', function() {
	gulp.watch('resources/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('resources/js/**/*.js', gulp.series('js'));
});

// Default task
gulp.task('default', gulp.series('sass', 'js', 'watch'));
