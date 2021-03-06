var gulp = require('gulp'),
  	sass = require('gulp-sass'),
  	autoprefixer = require("gulp-autoprefixer"),
    notify = require('gulp-notify'), //Growl
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'), //Compression js
    cssnano = require('gulp-cssnano'), //Minify css
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'), 
    imagemin = require('gulp-imagemin'), //Img comoression
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    del = require('del'),
    browsersync = require('browser-sync');

gulp.task('sass', function() {
  return gulp.src('app/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({suffix:'.min', prefix : ''}))
    .pipe(minifycss())
  	.pipe(autoprefixer(['Last 5 versions'], '> 1%', 'ie 8', 'ie 7', {cascade: true}))
  	.pipe(gulp.dest('app/css'))
    .pipe(notify('Success!'))
    // .pipe(browsersync.reload({stream: true}))
});

gulp.task('scripts', function(){
  return gulp.src([
    'app/bower_components/jquery/dist/jquery.min.js',
    'app/bower_components/slick/slick.min.js',
    ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'));
});

gulp.task('css-libs', function(){
  return gulp.src('app/css/libs.css')
  .pipe(cssnano())
  .pipe(rename({suffix:'.min', prefix : ''}))
  .pipe(gulp.dest('app/css'));
});

gulp.task('clean', function(){ //For clean dist
  return del.sync('dist');
});

gulp.task('clear', function(){ //For clean cache
  return cache.clearAll();
});

gulp.task('img', function(){
  return gulp.src('app/img/**/*')
  .pipe(cache(imagemin({
    interlaced: true,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  })))
  .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'sass', 'scripts', 'css-libs'], function(){
  gulp.watch('app/sass/**/*.scss', ['sass']);
});

gulp.task('browser-sync', function() {
  browsersync({
    files: ["*.html","app/css/*.css","app/sass/**/*.scss","app/js/**/*"],
    server: {
      watch: true,
      baseDir: './',
      directory: true
    },
    notify: false
  });
});

// If project is ready

gulp.task('build', ['clean'], function(){ 
  var buildCss = gulp.src([
    'app/css/main.css',
    'app/css/libs.min.css',
    ])
  .pipe(gulp.dest('dist/css'));

  var buildFonts = gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'));

  var buildJs = gulp.src('app/js/**/*')
  .pipe(gulp.dest('dist/js'));

  var buildHtml = gulp.src('*.html')
  .pipe(gulp.dest('dist'));
});