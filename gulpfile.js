/*********************************/
/*****      Global Require      ******/
/*********************************/
'use strict';
var fs = require('fs-extra');
var file = require('file');
var path = require('path');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var gcallback = require('gulp-callback');
var autoprefixer = require('autoprefixer');
var mergeStream = require('merge-stream');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var uglify = require('gulp-uglify');
var cache = require('gulp-cached');
var nunjucks = require('gulp-nunjucks');
var rename = require('gulp-rename');
var stylish = require('jshint-stylish');
var exec = require('gulp-exec');
var postcss = require('gulp-postcss')
var pd = require('pretty-data').pd;
var swig = require('gulp-swig');
var data = require('gulp-data');
var util = require('./gulp-utils');
var gutil = require('gulp-util');
var flexibility = require('postcss-flexibility');
var stripDebug = require('gulp-strip-debug');
var server = require('gulp-server-livereload');

/*********************************/
/******** Global Variables *******/
/*********************************/
var isProd = false;
var cssFileName = 'main.css';
var jsFileName = 'main.js';

/*********************************/
/*****  Global Configuration *****/
/*********************************/
try {
    fs.statSync('./paths.json');
    var globs = require('./paths.json');
} catch (err) {
    console.log(err);
}
try {
    fs.statSync('./gulp-config.json');
    var config = require('./gulp-config.json');
    var componentConfig = config.componentConfig;
    var scanPaths = config.scanPaths;
    var componentLibParentPath = config.componentLibParentPath;
    var boilerplatePath = config.boilerplatePath;
} catch (err) {
    console.log(err);
}
/*********************************/
/***** Extend Native Object ******/
/*********************************/
require('string.prototype.endswith');
String.prototype.changeCase = function() {
    var newStr = (function next(str) {
        var spaceIndex = str.indexOf(' ');
        if (spaceIndex === -1) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return next(str.slice(0, spaceIndex)) + ' ' + next(str.slice(spaceIndex + 1));
    })(this.replace(/-|_/g, ' '));
    return newStr;
}

/*********************************/
/********** Gulp Tasks **********/
/*********************************/
gulp.task('scss-lint', function(done) {
    var tasks = [];
    for (var i = 0; i < globs.paths.length; i++) {
        var tmp = globs.paths[i];
        fs.readdir(tmp, function(err, files) {
            if (err) throw err;
            if (files.indexOf('scss') !== -1) {
                tasks.push(gulp.src([tmp + 'scss/*/*.scss', '!' + tmp + 'scss/libs/*.scss'])
                    .pipe(scsslint({
                        'config': __dirname + '/.scss-lint.yml',
                        'maxBuffer': 307200,
                        'endless': true
                    })));
            }
        });
    }
    done();
    return mergeStream.apply(null, tasks);
});


var build_scss = function(tmp, scssPath) {
    var preprocessors = [
        autoprefixer({
            browsers: ['last 30 versions'],
            cascade: false
        }),
        flexibility()
    ];
    gulp.src(tmp + scssPath)
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sass({
            outputStyle: 'expanded', // cannot gulp-minify css with sourcemaps as of time of writing but this is ~10% larger.
            includePaths: [require('node-bourbon').includePaths]
        }).on('error', sass.logError))
        .pipe(postcss(preprocessors))
        .pipe(gulpif(!isProd, sourcemaps.write()))
        .pipe(concat(cssFileName))
        .pipe(gulp.dest(tmp + 'css/'));
};

gulp.task('css', function() {
    var tasks = [];
    for (var i = 0; i < globs.paths.length; i++) {
        var tmp = globs.paths[i];
        var preprocessors = [
            autoprefixer({
                browsers: ['last 30 versions'],
                cascade: false
            }),
            flexibility(),
        ];
        //console.log(tmp);
        tasks.push(gulp.src(tmp + 'scss/*.scss')
            .pipe(gulpif(!isProd, sourcemaps.init()))
            .pipe(sass({
                outputStyle: 'expanded', // cannot gulp-minify css with sourcemaps as of time of writing but this is ~10% larger.
                includePaths: [require('node-bourbon').includePaths]
            }).on('error', sass.logError))
            .pipe(postcss(preprocessors))
            .pipe(gulpif(!isProd, sourcemaps.write()))
            .pipe(concat(cssFileName))
            .pipe(gulp.dest(tmp + 'css/')));
    }
    return mergeStream.apply(null, tasks);
});

var build_js = function(tmp, jsPath) {
    gulp.src(tmp + jsPath)
        .pipe(gulpif(!isProd, sourcemaps.init()))
        // .pipe(gulpif(isProd, stripDebug()))
        // .pipe(gulpif(isProd, uglify().on('error', function(e) {
        //     console.log(e);
        // })))
        .pipe(concat(jsFileName))
        .pipe(gulpif(!isProd, sourcemaps.write()))
        .pipe(gulp.dest(tmp + 'js/'))
};

gulp.task('js', function() {
    var tasks = [];
    for (var i = 0; i < globs.paths.length; i++) {
        var tmp = globs.paths[i];
        tasks.push(gulp.src(tmp + 'devjs/**/*.js')
            .pipe(gulpif(!isProd, sourcemaps.init()))
            // .pipe(gulpif(isProd, stripDebug()))
            // .pipe(gulpif(isProd, uglify().on('error', function(e) {
            //     console.log(e);
            // })))
            .pipe(concat(jsFileName))
            .pipe(gulpif(!isProd, sourcemaps.write()))
            .pipe(gulp.dest(tmp + 'js/')));
    }
    return mergeStream.apply(null, tasks);
});

gulp.task('js-hint', function() {
    var tasks = [];
    for (var i = 0; i < globs.paths.length; i++) {
        var tmp = globs.paths[i];
        tasks.push(gulp.src(tmp + 'devjs/*.js')
            .pipe(cache('jslinting'))
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(jscs())
            .pipe(jscs.reporter()));
    }
    return mergeStream.apply(null, tasks);
});

gulp.task('setProd', function() {
    isProd = true;
});

gulp.task('watch', ['watch:scss', 'watch:js']);
gulp.task('watch:scss', ['paths'], function() {
    for (var i = 0; i < globs.paths.length; i++) {
        var tmp = globs.paths[i];
        gulp.watch(tmp + 'scss/**/*.scss')
            .on('change', function(file) {
                var tmp = file.path.split('scss')[0];
                var scssPath = 'scss/*.scss';
                build_scss(tmp, scssPath);
            });
    }
});
gulp.task('watch:js', ['paths'], function() {
    for (var i = 0; i < globs.paths.length; i++) {
        var tmp = globs.paths[i];
        gulp.watch(tmp + 'devjs/**/*.js')
            .on('change', function(file) {
                var tmp = file.path.split('devjs')[0];
                var jsPath = 'devjs/**/*.js';
                build_js(tmp, jsPath);
            });
    }
});

gulp.task('paths', function() {
    var paths = new Array,
        distPaths = new Array;
    for (var i = 0; i < scanPaths.length; i++) {
        var currentPath = scanPaths[i];
        file.walkSync(currentPath, function(dirPath, dirs, files) {
            if ((dirs.indexOf('scss') > -1 || dirs.indexOf('devjs') > -1) && dirPath.indexOf('boilerplate-component') === -1) {
                var beautifiedPath = dirPath.replace(/\\/g, '/');
                paths.push(beautifiedPath + '/');
                distPaths.push(beautifiedPath + '/css/');
                distPaths.push(beautifiedPath + '/js/');
            }
        });
    }
    var pathObj = {
        paths: paths
    }
    fs.writeFileSync('paths.json', pd.json(JSON.stringify(pathObj)));
    // fs.writeFileSync('.gitignore', distPaths.join('\n'));
});

gulp.task('default', ['watch', 'webserver']);

gulp.task('dev', ['paths'], function() {
    try {
        fs.statSync('./paths.json');
        globs = require('./paths.json');
    } catch (err) {
        console.log(err);
    }
    try {
        fs.statSync('./gulp-config.json');
        config = require('./gulp-config.json');
        componentConfig = config.componentConfig;
        scanPaths = config.scanPaths;
        componentLibParentPath = config.componentLibParentPath;
        boilerplatePath = config.boilerplatePath;
    } catch (err) {
        console.log(err);
    }

    setTimeout(function() {
        gulp.start(['js', 'css']);
    }, 1000);
});

gulp.task('prod', ['paths', 'setProd'], function() {
    try {
        fs.statSync('./paths.json');
        globs = require('./paths.json');
    } catch (err) {
        console.log(err);
    }
    try {
        fs.statSync('./gulp-config.json');
        config = require('./gulp-config.json');
        componentConfig = config.componentConfig;
        scanPaths = config.scanPaths;
        componentLibParentPath = config.componentLibParentPath;
        boilerplatePath = config.boilerplatePath;
    } catch (err) {
        console.log(err);
    }

    gulp.start(['js', 'css']);
});

gulp.task('lint', ['scss-lint']);

gulp.task('scsslint', ['scss-lint']);

gulp.task('jshint', ['js-hint']);

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(server({
            livereload: true,
            directoryListing: true,
            port: 3000,
            open: true
        }));
});