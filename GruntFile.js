(function () {
   'use strict';
}());

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      test: ['dist']
    },
    uglify: {
      prod: {
        files: {
          'dist/seamless.ly.min.js': ['src/seamless.ly.js']
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
        specs : 'spec/**/*.js',
          vendor : [
            'spec/libs/jquery.js',
            'spec/libs/jasmine-jquery.js'
          ]        
      }
    } 
  });

  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-internal');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  

  grunt.registerTask('build', ['jshint', 'clean', 'jasmine', 'uglify:prod']);

  grunt.registerTask('release', ['build']);
};
