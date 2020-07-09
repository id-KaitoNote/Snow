const gulp = require('gulp')
const htmlbeautify = require('gulp-html-beautify')
const gulpSass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const gulpBabel = require('gulp-babel')
const imagemin = require('gulp-imagemin')
const changed = require('gulp-changed')
// var browserSync = require('browser-sync')

const src = {
    html: {
        in: 'src/*.html',
        out: 'dest'
    },
    sass: {
        in: 'src/assets/scss/*.scss',
        out: 'dest/assets/css'
    },
    js: {
        in: 'src/assets/**/**.js',
        out: 'dest/assets'
    },
    image: {
        in: 'src/assets/images/*',
        out: 'dest/assets/images'
    }
}

const html = () => {
    const options = {
        indent_size: 4
    };
    return gulp.src(src.html.in)
        .pipe(htmlbeautify(options))
        .pipe(gulp.dest(src.html.out))
}

const sass = () => {
    return gulp.src(src.sass.in)
        .pipe(gulpSass())
        .pipe(postcss([autoprefixer(
            {
                "overrideBrowserslist": ["last 2 version", "ie >= 11", "Android >= 5"],
                cascade: false
            }
        )]))
        .pipe(gulp.dest(src.sass.out))
}

const js = () => {
    return gulp.src(src.js.in)
        .pipe(gulpBabel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(src.js.out))
}

const image = () => {
    return gulp.src(src.image.in)
        .pipe(changed('src.image.in'))
        .pipe(imagemin())
        .pipe(gulp.dest(src.image.out))
}

const watch = () => {
    gulp.watch(src.html.in, html)
    gulp.watch(src.sass.in, sass)
    gulp.watch(src.js.in, js)
    gulp.watch(src.image.in, image)
}

exports.html = html
exports.sass = sass
exports.js = js
exports.image = image
exports.watch = watch
exports.default = watch