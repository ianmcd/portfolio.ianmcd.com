/* global module, require */

module.exports = function(grunt) {
  'use strict';

  //	loads grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  //	times tasks for future optimization
  require('time-grunt')(grunt);

  var autoprefixer = require('autoprefixer-core');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //	js concatenation
    concat: {
      dev: {
        src: [
          'http/js/lib/jquery.min.js',
          'http/js/lib/**/*.js',
          'http/js/**/*.js',
          '!http/js/ignore/**/*.js',
          '!http/js/build/**/*.js',
          '!http/js/data/**/*.js'
        ],
        dest: 'http/js/build/production.js'
      }
    },

    //	grunt server
    connect: {
      options: {
        port: 4444,
        hostname: 'localhost',
        open: true,
        livereload: 35729
      },
      dev: {
        options: {
          base: 'http'
        }
      }
    },

    // scss linter
    scsslint: {
      allFiles: [
        'http/sass/**/*.scss'
      ],
      options: {
        config: '.scss-lint.yml',
        reporterOutput: 'scss-lint-report.xml',
        colorizeOutput: true
      }
    },

    //	sass
    sass: {
      options: {
        sourcemap: 'auto',
        style: 'compressed',
        compass: true,
        require: 'susy'
        },
      dev: {
        files: {
          'http/css/system.css': 'http/sass/system.scss'
        }
      }
    },

    //	js minification
    uglify: {
      options: {
        sourceMap: true
      },
      dev: {
        src: 'http/js/build/production.js',
        dest: 'http/js/build/production.min.js'
      }
    },

    // postcss w/ autoprefixer
    postcss: {
      options: {
        processors: [
          autoprefixer({ browsers: ['last 2 version', 'ie >= 9'] }).postcss
        ],
        map: true
      },
      dist: { src: 'http/css/system.css' }
    },

    //	watches files / runs tasks as needed
    watch: {
      js: {
        files: ['http/js/**/*.js', '!http/js/build/*.js'],
        tasks: ['concat', 'uglify']
      },
      css: {
        files: ['http/sass/**/*.scss'],
        tasks: ['scsslint', 'sass', 'postcss']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'http/**/*.html',
          'http/**/*.css',
          'http/**/*.js'
        ]
      }
    }
  });

  //	TASKS

  grunt.registerTask('serve', [
    'concat',
    'uglify',
    'scsslint',
    'sass',
    'postcss',
    'connect',
    'watch'
  ]);

  grunt.registerTask('default', [
    'serve'
  ]);
};
