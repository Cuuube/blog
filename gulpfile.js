const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const fs = require('fs');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const es = require('event-stream');
const path = require('path');

gulp.task('browserify', () => {
    let files = [
        './client/js/article.js',
        './client/js/write.js',
        './client/js/index.js'
    ];
    let tasks = files.map(entry => {
        return browserify({entries: [entry]})
        .bundle()
        .pipe(source(path.basename(entry))) 
        .pipe(buffer())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./static/js/article'));
    })
    return es.merge.apply(null, tasks);
});

gulp.task('watch', function () {
    gulp.watch(['./client/js/**/*.js'], ['browserify']);
})