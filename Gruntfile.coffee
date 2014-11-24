module.exports = (grunt) ->

  require('load-grunt-tasks') grunt

  grunt.initConfig
    pkg: require './package.json'

    banner: [
      '/**',
      ' * <%= pkg.name %> - <%= pkg.version %>',
      ' *',
      ' * <%= pkg.description %>',
      ' *',
      ' * <%= pkg.author.url %>',
      ' *',
      ' * @element <%= pkg.name %>',
      ' *',
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;',
      ' * Licensed <%= pkg.license %>',
      ' */',
      ''
    ].join('\r\n')

    clean: ['dist']

    concat:
      options:
        banner: '<%= banner %>\r\n\r\n(function (window, xtag) {\r\n\r\n'
        footer: '\r\n\r\n})(window, xtag);'
      all:
        src: ['src/<%= pkg.name %>.js']
        dest: 'dist/<%= pkg.name %>.js'

    uglify:
      options:
        banner: '<%= banner %>'
      all:
        files:
          'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']

  grunt.registerTask 'default', ['clean', 'concat', 'uglify']