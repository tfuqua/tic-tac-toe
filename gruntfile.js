module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

  grunt.initConfig({
		eslint: {
			options: {
				fix: true,
				format: './node_modules/eslint-friendly-formatter'
			},
			target: ['js/src/*.js']
		},
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
	    },
			cssmin: {
			  target: {
			    files: {
			      'css/dist/main.min.css': 'css/dist/main.css'
			    }
			  }
			}

  });

  grunt.registerTask('default', ['babel', 'uglify', 'sass', 'cssmin']);
	grunt.registerTask('lint', ['eslint']);
};
