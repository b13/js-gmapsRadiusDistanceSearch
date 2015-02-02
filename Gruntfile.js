'use strict';

module.exports = function(grunt) {

		// Project configuration.
	grunt.initConfig({
			// Metadata.
		pkg      : grunt.file.readJSON('package.json'),
		banner   : '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
			// Task configuration.
		clean    : {
			files: ['app/dist']
			, css: ['css/main.css']
		},

		concat   : {
			options: {
				banner      : '<%= banner %>',
				stripBanners: true
			},
			dist   : {
				src : ['bower_components/requirejs/require.js', '<%= concat.dist.dest %>'],
				dest: 'app/dist/main.js'
			}
		},

		uglify   : {
			options: {
				banner: '<%= banner %>'
			},
			dist   : {
				src : '<%= concat.dist.dest %>',
				dest: 'app/dist/main.min.js'
			}
		},

			// do r.js build
		requirejs: {
			compile: {
				options: {
					name          : 'config',
					mainConfigFile: 'js/config.js',
					out           : '<%= concat.dist.dest %>',
					optimize      : 'none',
					findNestedDependencies: true
				}
			}
		},

			// add bower components to requirejs config file
		bower    : {
			target: {
				rjsConfig: 'js/config.js'
			}
		}
	});

		// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-bower-requirejs');


	/**
	 * ----------------
	 * GRUNT TASKS
	 * ----------------
	 */

		// set config
	grunt.registerTask('set_config', 'Set a config property.', function(name, val) {
		grunt.config.set(name, val);
	});


	//Build and compile all vor development
	grunt.registerTask('development', ['clean', 'bower', 'requirejs', 'concat']);
	grunt.registerTask('production', ['clean', 'bower', 'requirejs', 'concat', 'uglify']);

};
