var gulp = require('gulp'),
	less = require('gulp-less'),
	sourcemaps = require('gulp-sourcemaps'),
	jade = require('gulp-jade'),
	autoprefixer = require('gulp-autoprefixer'),
	watch = require('watch'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync').create(),
	uglify = require('gulp-uglifyjs'),
	uglifycss = require('gulp-uglifycss'),
	clean = require('gulp-clean'),
	imgMin = require('gulp-image-optimization'),
	notify = require( 'gulp-notify' );

/* es2015, react
* babel = require('gulp-babel'),
* browserify = require('gulp-browserify');
* npm install --save-dev gulp-babel
* npm install --save-dev gulp-browserify
* npm install --save-dev babel-preset-react
* npm install --save-dev babel-preset-react
==================================================
gulp.task('app', function() {
	return gulp.src('app/js/react/app.js')
		.pipe(babel({
			"presets": ["react", "es2015"]
		}))
		.pipe(browserify())
		.pipe(gulp.dest("app/js"));
});
*/
/*
// jsx
browserify = require('browserify'),
babelify = require('babelify'),
source = require('vinyl-source-stream');

gulp.task('app', function () {
    return browserify({entries: 'app/js/react/app.js', debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); })
        .pipe(source('app.js'))
        .pipe(gulp.dest('app/js'));
});
*/

// Less
gulp.task('less', function(){
	return gulp.src('app/less/style.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.on('error', notify.onError({
			title: 'LESS ERROR compilation',
			message: '<%= error.message%>'
		}))
		.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
});
// Jade
gulp.task('jade', function(){
	return gulp.src('app/jade/*.jade')
	.pipe(jade({
		pretty: true
	}))
	.on('error', notify.onError({
		title: 'JADE ERROR compilation',
		message: '<%= error.message%>'
	}))
	.pipe(gulp.dest('app/html'));
});
// Libs-js
gulp.task('libjs', function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.js',
		'app/libs/slick-carousel/slick/slick.js'
	])
		.pipe(gulp.dest('app/js/lib'));
});
// Libs-js-min
gulp.task('libjs-min', ['libjs'], function(){
	return gulp.src('app/js/lib/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('min-libs.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/js/lib/min'));
});
// Libs-style
gulp.task('libcss', function(){
	return gulp.src([
		'app/libs/normalize-css/normalize.css',
		'app/libs/slick-carousel/slick/slick.css'
	])
		.pipe(gulp.dest('app/css/libcss'));
});
// Libs-style-min
gulp.task('libcss-min', ['libcss'], function(){
	return gulp.src('app/css/lib/*.css')
		.pipe(sourcemaps.init())
		.pipe(concat('min-lib-style.css'))
		.pipe(uglifycss())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/css/lib/min'));
});

// BrowserSync
gulp.task('browser-sync', ['less', 'jade', 'libjs-min', 'libcss-min'], function() {
	browserSync.init({
		server: {
			baseDir: "./app"
		},
		notify: false
	});
});
// Watch
gulp.task('watch', function(){
	gulp.watch('app/less/**/*.less', ['less']);
	gulp.watch('app/jade/**/*.jade',['jade']);
	gulp.watch('app/html/*.html').on('change', browserSync.reload);
	gulp.watch('app/js/*.js').on('change', browserSync.reload);
});

gulp.task('clean', function () {
	return gulp.src('dist', {read: false})
		.pipe(clean());
});

gulp.task('default', ['watch','browser-sync']);

// Build

gulp.task('build',['less','jade','libjs-min','libcss-min','clean'], function(){
	var buildCss = gulp.src('app/css/**/*')
		.pipe(gulp.dest('dist/css'));
	var buildFonts = gulp.src('app/fonts/**/')
		.pipe(gulp.dest('dist/fonts'));
	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));
	var buildHtml = gulp.src('app/html/*')
		.pipe(gulp.dest('dist/html'));
	var buildIndex = gulp.src('app/index.html')
		.pipe(gulp.dest('dist'));
	var buildImg = gulp.src('app/images/**/*')
		.pipe(imgMin())
		.pipe(gulp.dest('dist/images'));
});


var smartgrid = require('smart-grid');

var settings = {
    outputStyle: 'less', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: "30px", /* gutter width px || % */
    container: {
        maxWidth: '1170px', /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        lg: {
            'width': '1050px',
            'fields': '30px'
        },
        md: {
            'width': '960px',
            'fields': '28px'
        },
        sm: {
            'width': '780px',
            'fields': '24px'
        },
        xs: {
            'width': '760px',
            'fields': '15px'
        }
        /*
        We can create any quantity of break points.

        some_name: {
            'some_width': 'Npx',
            'some_offset': 'N(px|%)'
        }
        */
    }
};

smartgrid('./app/less', settings);
