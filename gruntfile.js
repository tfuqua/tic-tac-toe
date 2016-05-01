module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

  grunt.initConfig({
      babel: {
          options: {
              sourceMap: true,
              presets: ['es2015']
          },
          dist: {
              files: {
                  'js/dist/app.js': 'js/src/app.js'
              }
          }
      },
			uglify: {
		    my_target: {
		      files: {
		        'js/dist/app.min.js': ['js/dist/app.js']
		      }
		    }
			},
			sass: {
	        options: {
	            sourceMap: true
	        },
	        dist: {
	            files: {
	                'css/dist/main.css': 'css/src/main.scss'
	            }
	        }
	    }

  });

  grunt.registerTask('default', ['babel', 'uglify', 'sass']);
};
