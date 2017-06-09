var
    gulp        = require("gulp"),
    jshint      = require("gulp-jshint"),
    cssMinify   = require("gulp-minify-css"),
    jsMinify    = require("gulp-uglify"),
    amdOptimize = require("amd-optimize"),
    concat      = require("gulp-concat"),
    htmlmin     = require('gulp-htmlmin'),
    template    = require('gulp-underscore-template')
;

gulp.task("lint", function() {
    gulp.src("./src/js/*")
        .pipe(jshint())
        .pipe(jshint.reporter("fail"));
});

gulp.task("build-application", function() {
    /*gulp.exec("lint")
        .pipe("--minify-css")
        .pipe("--manage-html-template")
        .pipe("--minify-js")
        .pipe("--create-index-html");*/
});

/**
 * Css-minification task
 */
gulp.task("minify-css", function() {
    gulp.src("./src/css/*")
        .pipe(cssMinify())
        .pipe(gulp.dest("./publish/css/"));
});

gulp.task("compile-templates", function() {
    gulp.src('./src/templates/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true
        }))
        .pipe(template())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('./publish/js/'));
});

gulp.task("copy-libs", function() {
    gulp.src("./src/js/libs/")
    .pipe()
});

gulp.task("minify-js", function() {
    gulp.src("./src/js/*")
        .pipe(jsMinify())
        .pipe(gulp.dest("./publish/js/"));
});

gulp.task('watch', function() {
    gulp.watch("src/*.js", ["lint"]);
});

gulp.task("default", function() {
    console.log("Not call me please!");
})

// util: https://julienrenaux.fr/2014/05/25/introduction-to-gulp-js-with-practical-examples/
