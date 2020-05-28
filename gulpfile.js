var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var changed = require('gulp-changed');

var selectArray = ['assets/images/**/**','!assets/images/favicons/*.*','assets/images/**/*.gif', '!assets/images/applications/**/**','!assets/images/**/*.ico','!assets/images/**/*px.*','!assets/images/**/*-full.*'];

gulp.task('default', function () {
  return gulp
    .src(selectArray, { since: gulp.lastRun('default') })
    .pipe(
      $.responsive(
        {
          '**/*.jpg': [
            {
              width: 400,
              rename: {
                suffix: '-400px',
                extname: '.jpg'
              }
            },
            {
              width: 800,
              rename: {
                suffix: '-800px',
                extname: '.jpg'
              },
            },
            {
              width: 1200,
              rename: {
                suffix: '-1200px',
                extname: '.jpg'
              },
            },
            {
              rename: {
                suffix: '-full',
                extname: '.jpg'
              },
            }
          ],
          '**/*.jpeg': [
            {
              width: 400,
              rename: {
                suffix: '-400px',
                extname: '.jpeg'
              }
            },
            {
              width: 800,
              rename: {
                suffix: '-800px',
                extname: '.jpeg'
              },
            },
            {
              width: 1200,
              rename: {
                suffix: '-1200px',
                extname: '.jpeg'
              },
            },
            {
              rename: {
                suffix: '-full',
                extname: '.jpeg'
              },
            }
          ],
          '**/*.png': [
            {
              width: 400,
              rename: {
                suffix: '-400px',
                extname: '.png'
              }
            },
            {
              width: 800,
              rename: {
                suffix: '-800px',
                extname: '.png'
              },
            },
            {
              width: 1200,
              rename: {
                suffix: '-1200px',
                extname: '.png'
              },
            },
            {
              rename: {
                suffix: '-full',
                extname: '.png'
              },
            }
          ],
        },
        {
          // Global configuration for all images
          // The output quality for JPEG, WebP and TIFF output formats
          quality: 100,
          // Use progressive (interlace) scan for JPEG and PNG output
          progressive: true,
          // Strip all metadata
          withMetadata: false,
          // Do not emit the error when image is enlarged.
          errorOnEnlargement: false
        }
      )
    )
    .pipe(gulp.dest('assets/images'))
    .on('end', function() {
      del(selectArray).then(function() {
        done();
      });
    });
});