const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const watch = require('gulp-watch');
const browserSync = require('browser-sync');
const runSequence = require('run-sequence');
const del = require('del');
const useref = require('gulp-useref');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-cssnano');



gulp.task('sass', function () {
  gulp.src('./app/sass/**/*.sass')
    .pipe(sass({
      // includePaths: require('node-normalize-scss').with('other/path', 'another/path')
      // - or -
      includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(gulp.dest('./public/css/')) //cria pasta style.css
    // .on('error', sass.logError)
    // .pipe(browserSync.stream())
});


gulp.task('imagemin', function () {
  // gulp.src('./app/assets/images/**/*.+(png|jpg|gif|svg)')
    //caching - just optimize if is necessary, since it is a slow process
    // .pipe(cache(imagemin({
    //     interlaced: true
    // })))
    // .pipe(gulp.dest('public/assets/images'))
    //só estou copiando
    return gulp.src('./app/assets/images/**/*')
    .pipe(gulp.dest('./public/assets/images'))
});

//Otimiza arquivos JavaScript e CSS (concatena and minifica) para distribuição
gulp.task('otimizaJsCSS', function() {
  return gulp.src('./app/*.html')
    .pipe(useref()) //concatena
    //Minifica somente se for arquivo javascript
    .pipe(gulpIf('*.js', uglify()))
    .on('error', function(err) { //mostra erros em seus arquivos javascript
      console.error('Error in compress task', err.toString());
    })
    //Minifica somente se for arquivo css
    .pipe(minifyCss())
    .pipe(gulp.dest('./public/css/style-min.css'))
});

gulp.task('watch', function () {
  gulp.watch('./app/sass/**/*.sass', ['sass'])
  gulp.watch('./app/assets/images/**/*.+(png|jpg|gif|svg)', ['imagemin'])
  gulp.watch('./app/index.html', ['copy-static'])
  gulp.watch('./app/js/**/*.js', ['copy-static'])
  gulp.watch('./public/**/*', browserSync.reload)
  gulp.watch('./public/*', browserSync.reload)

});


gulp.task('browserSync', function() {
  browserSync.init({
    server: './public'
  })
});

gulp.task('fonts', function(){
  return gulp.src('./app/assets/fonts/**/*')
  .pipe(gulp.dest('./public/assets/fonts'))
});

//Limpa a pasta public antes de compilar o projeto para produção
gulp.task('clean:public', function() {
  return del.sync('./public');
});

gulp.task('copy-static', function() {
  gulp.src(['./app/index.html']).pipe(gulp.dest('./public'));
  gulp.src(['./app/js/**/*']).pipe(gulp.dest('./public/js'));

});

//Tarefas padrão:
//sass, copiar index, js, imagens, fontes, e sincronizar
gulp.task('default', function (callback) {
  runSequence(['sass', 'copy-static', 'imagemin', 'fonts', 'browserSync', 'watch']
)
});


//Build task: otimiza JS e CSS somente para distribuição, além de copiar os arquivos necessários

gulp.task('build', function (callback) {
  runSequence('clean:public',
    ['sass', 'imagemin', 'otimizaJsCSS', 'fonts'],
    callback
)
});
