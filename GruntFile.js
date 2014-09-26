(function () {
   'use strict';
}());

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      test: ['build']
    },
    uglify: {
      prod: {
        files: {
          'build/seamless.ly.min.js': ['src/seamless.ly.js']
        }
      }
    },    
    jshint: {
      all: [
        'Gruntfile.js',
        'app/modules/**/*.js'
      ]
    },   
    jasmine: {
      src : 'src/seamless.ly.js',
      options:{        
        specs : 'test/**/*.js'
      }
    } 
  });

  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-internal');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-lodash');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['jshint', 'clean', 'jasmine', 'uglify:prod']);

  grunt.registerTask('release', ['build']);
};
