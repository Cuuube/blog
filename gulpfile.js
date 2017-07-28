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
    let targetPath = './client/js/';
    let files = fs.readdirSync(targetPath)
                .map(filename => targetPath + filename);

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

gulp.task('css', () => {
    gulp.src('./client/css/**/*.css')
        // .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest('./static/css'));
        // .dest('./static/test');
})

gulp.task('watch', () => {
    gulp.watch(['./client/js/**/*.js'], ['browserify']);
    gulp.watch(['./client/css/**/*.css'], ['css']);
})