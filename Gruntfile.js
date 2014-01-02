/*global module, require */
module.exports = function (grunt) {
    'use strict';

    // Livereload and connect variables
    var LIVERELOAD_PORT = 35729;
    var lrSnippet = require('connect-livereload')({
        port: LIVERELOAD_PORT
    });
    var mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };
    var mixIn = require('mout/object/mixIn');
    var requireConfig = {
        baseUrl: 'app/',
        paths: {
            'jquery': '../lib/jquery/jquery-1.9.1',
            'knockout': '../lib/knockout/knockout-2.3.0.debug',
            'text': '../lib/require/text',
            'durandal': '../lib/durandal/js',
            'plugins': '../lib/durandal/js/plugins',
            'transitions': '../lib/durandal/js/transitions',
            'async': '../lib/jasmineasync',
            'breeze': '../Scripts/breeze.min',
            'services': 'services',
            'q': '../Scripts/q'
        }
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: ['build/*']
        },
        connect: {
            build: {
                options: {
                    port: 9001,
                    hostname: 'localhost',
                    base: 'build'
                }
            },
            dev: {
                options: {
                    port: 8999,
                    hostname: 'localhost',
                    middleware: function (connect) {
                        return [lrSnippet, mountFolder(connect, '.')];
                    }
                }
            }
        },
        copy: {
            lib: {
                src: 'lib/**/**',
                dest: 'build/'
            },
            index: {
                src: 'index.html',
                dest: 'build/'
            },
            css: {
                src: 'css/**',
                dest: 'build/'
            }
        },
        open: {
            dev: {
                path: 'http://localhost:<%= connect.dev.options.port %>/_SpecRunner.html'
            },
            build: {
                path: 'http://localhost:<%= connect.build.options.port %>'
            },
            index: {
                path: 'http://localhost:<%= connect.dev.options.port %>/index.html'
            }
        },
        durandal: {
            main: {
                src: ['app/**/*.*', 'lib/durandal/**/*.js'],
                options: {
                    name: '../lib/require/almond-custom',
                    baseUrl: requireConfig.baseUrl,
                    mainPath: 'app/main',
                    paths: mixIn({}, requireConfig.paths, { 'almond': '../lib/require/almond-custom.js' }),
                    exclude: [],
                    optimize: 'none',
                    out: 'build/app/main.js'
                }
            }
        },
        jasmine: {
            dev: {
                src: 'app/viewmodels/*.js',
                options: {
                    specs: 'test/specs/dev/**/*spec.js',
                    keepRunner: true,
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: requireConfig
                    }
                }
            },
            build: {
                options: {
                    specs: 'test/specs/build/**/*spec.js',
                    keepRunner: true,
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: requireConfig
                    }
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'app/**/*.js', 'test/specs/**/*.js']
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n' +
                    '* Copyright (c) <%= grunt.template.today("yyyy") %> YourName/YourCompany \n' +
                    '* Available via the MIT license.\n' +
                    '* see: http://opensource.org/licenses/MIT for blueprint.\n' +
                    '*/\n'
            },
            build: {
                src: 'build/app/main.js',
                dest: 'build/app/main-built.js'
            }
        },

        watch: {
            build: {
                files: ['build/**/*.js'],
                tasks: ['jasmine:build']
            },
            dev: {
                files: ['test/specs/dev/**/*spec.js', 'app/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            cli: {
                files: ['test/specs/dev/**/*spec.js', 'app/**/*.js'],
                tasks: ['jshint', 'jasmine:dev']
            }
        }
    }
    );

    // Loading plugin(s)
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-durandal');


    //WARNING:
    //grunt.registerTask('xxxx', ['xxxx','xxxx']);
    //be careful with naming conventions, if an 'xxxx' outside the array has the same name as one inside, bugs will happen.
    //BUG SYMPTOMNS:
    //'jasmine:dev' running in CLI for 'debug' task, other weird and wonderful things. exponential loop which launches more and more tasks.
    //using 'watch:dev' can hide these as it WAITS for a change. But really its just a temp pause on the loop
    grunt.registerTask('default', ['jshint', 'jasmine:dev', 'watch:cli']);
    grunt.registerTask('jshinter', ['jshint']);
    grunt.registerTask('watcher', ['watch:dev', 'jasmine:dev']);
    grunt.registerTask('debug', ['jshint', 'connect:dev:livereload', 'open:dev', 'watch:dev']);
    grunt.registerTask('build', ['jshint', 'jasmine:dev', 'clean', 'copy', 'durandal:main', 'uglify', 'jasmine:build', 'connect:build', 'open:build', 'watch:build']);

};
