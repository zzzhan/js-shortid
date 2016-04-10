module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'Gruntfile.js',
        'test/*.js',
        'lib/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
		files: {
		  'dist/<%= pkg.name %>.min.js':'lib/<%=pkg.name %>.js'
		}
      }
    },
	copy: {
      build: {
	    expand: true,
	    cwd: 'lib/',
	    src: ['*.*'],
	    dest:'dist/'	
      }
	},
    clean: ['dist']
  });
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint','clean','uglify','copy']);
};