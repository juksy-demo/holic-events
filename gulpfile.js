var gulp = require('gulp'),
	gulpSass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	uglifycss = require('gulp-uglifycss'),
	broeserSync = require('browser-sync'),
	pug = require('gulp-pug');

gulp.task('browser-sync', ['rebuild'], function() {
    return broeserSync({
      files: "**",
      server: {
        baseDir: './',
        index:'index.html'
      },

      port: 8080,
      host: '0.0.0.0',
      ui: {
        port: 8081
      }
    });
  });

  gulp.task('rebuild', function() {
    return broeserSync.reload();
  });

  gulp.task('watch', function() {
    gulp.watch(['./dist/*.*'], ['rebuild']);
    gulp.watch(['./**/*.pug'], ['task_pug']);
    gulp.watch(['./**/*.scss'], ['make:scss']);
  });


gulp.task('task_pug', function() {
    return gulp.src('pug/**/*.pug')
        .pipe(pug({pretty:true}))
        .pipe(gulp.dest(''))
});

gulp.task('build_pug', function() {
    return gulp.src('pug/*.pug')
        .pipe(pug({pretty:true}))
        .pipe(gulp.dest(''))
});

// make scss to css file
gulp.task('make:scss',function(){
	return gulp.src('scss/index.scss')
        .pipe(gulpSass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'));
}); 


// combine and uglify css to one
gulp.task('uglify:css', ['make:scss'], function(){
	return gulp.src([
			'node_modules/animate.css/animate.css',
			'css/plugin/lightslider.css',
			'css/plugin/photoswipe.css',
			'css/plugin/default-skin.css',
			'css/index.css'
		])
		.pipe(concat('app.min.css'))
		.pipe(uglifycss())
		.pipe(gulp.dest('css'));
});

// combine and uglify plugin-js to one file
gulp.task('uglify:plugin-js', ['uglify:css'], function(){
	return gulp.src([
			'node_modules/jquery/dist/jquery.js',
			'node_modules/wowjs/dist/wow.js',
			'node_modules/jquery.dotdotdot/src/js/jquery.dotdotdot.js',
			'node_modules/lodash/lodash.js',
			'node_modules/handlebars/dist/handlebars.js',
			'node_modules/lightslider/dist/js/lightslider.js',
			'node_modules/photoswipe/dist/photoswipe.js',
			'node_modules/photoswipe/dist/photoswipe-ui-default.js',
			'node_modules/clipboard/dist/clipboard.js',
			'node_modules/jquery-touchswipe/jquery.touchSwipe.js'
		])
		.pipe(concat('app.assets.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js'));
});

// uglify main-js
gulp.task('uglify:main-js', ['uglify:plugin-js'], function(){
	return gulp.src([
			'js/tweenmax.min.js',
			'js/twzipcode.js',
			'js/index.js'
		])
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js'));
});


gulp.task('build',['uglify:main-js']);

gulp.task('default', ['browser-sync', 'watch']);