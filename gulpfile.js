const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const tsc = require('gulp-typescript');
const tslint = require('gulp-tslint');

gulp.task('start', () => {
    gulp.run(['tslint', 'nodemon']);
});

gulp.task('nodemon', () => {
    nodemon({
        scripts: './server.js',
        tasks: ['tslint', 'compile']
    });
});

gulp.task('compile', () => {
    const tsProject = tsc.createProject('server/src/tsconfig.json');
    const result = tsProject.src().pipe(tsProject());

    result.js.pipe(gulp.dest('server/dist'));
});


gulp.task('tslint', () =>
    gulp.src('./server/src/main.ts')
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report())
);
