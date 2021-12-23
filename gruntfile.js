'use strict';

// GRUNT is a configuration based task-runner, so everything is 
// based on configurations

module.exports = function(grunt){

    // prints out the time and bar graphs in prompt
    require('time-grunt')(grunt);

    //automatically loads all the grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    //configuring tasks
    grunt.initConfig({
        // configuring the sass task
        sass: {
            dist: {
                files : {
                    'css/styles.css': 'css/styles.scss'
                }
                
            }
        },
        // configuring watch tasks
        watch: {
            files: 'css/*.scss',
            tasks: ['sass']
        },
        // configuring browsersync tasks
        browserSync: {
            dev: {
                bsFiles: {
                    // specifying files to keep a watch on
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                option: {
                    watchTask: true,
                    server: {
                        //specifying the current directory as 
                        // the base directory.
                        baseDir: './'
                    }
                }
            }
        },
        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
            }
        },
        clean: {
            build : {
                src: ['dist/']
            }
        },
        imagemin: {
            dynamic: {
                files:[{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['img/*.{jpg,gif,png}'],
                    dest: 'dist'
                }]
            }
        },
        // useminPrepare will prepare the file and configure the
        // uglify, concat, etc packages.
        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['contactus.html', 'aboutus.html','index.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            // font-awesome problem resolving
                            createConfig: function(context, block){
                            var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0, rebase: false
                                };
                            }
                        }]
                    }
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {}
        },

        uglify: {
            dist: {}
        },

        cssmin: {
            dist: {}
        },
        // if someone has opened the website , the main.js and main.css,
        // get cached and the updated website might not work correctly.
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                files:[{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css'
                    ]
                }]
            }
        },
        usemin: {
            html: ['dist/contactus.html', 'dist/index.html', 'dist/aboutus.html'],
            options: {
                assetsDirs: ['dist', 'dist/css', 'dist/js']
            }
        },
        htmlmin: {
            dist:{
                options: {
                    collapseWhitespace: true,
                },
                files: {
                    // destination : source
                    'dist/index.html': 'dist/index.html',
                    'dist/aboutus.html': 'dist/aboutus.html',
                    'dist/contactus.html': 'dist/contactus.html'
                }
            }
        }
    });

    // involves the sass task which is already configured above
    // at the prompt, type " grunt css " and it will execute.
    grunt.registerTask('css', ['sass']);
    // at the prompt type "grunt" to run default task
    grunt.registerTask('default', ['browserSync', 'watch']);
    // at the prompt type "grunt build"
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
};