// Maamund Hexo theme 
module.exports = function(grunt){
  grunt.initConfig({
    gitclone: {
      bs4: {
        options: {
          repository: 'https://github.com/twbs/bootstrap.git',
          directory: 'tmp/bs4'
        },
      },
      fontawesome: {
        options: {
          repository: 'https://github.com/FortAwesome/Font-Awesome.git',
          directory: 'tmp/fontawesome'
        },
      },
      fancybox: {
        options: {
          repository: 'https://github.com/fancyapps/fancyBox.git',
          directory: 'tmp/fancybox'
        }
      }
    },
    copy: {
      jquery: {
        expand: true,
        cwd: 'node_modules/jquery/dist/',
        src: ['**'],
        dest: 'source/assets/vendor/'
      },
      popperjs: {
        expand: true,
        cwd: 'node_modules/popper.js/dist/',
        src: ['**'],
        dest: 'source/assets/vendor/popper.js'
      },
      bs4: {
        expand: true,
        cwd: 'tmp/bs4/dist',
        src: ['**'],
        dest: 'source/assets/vendor/bs4/dist'
      },
      bs4scss: {
        expand: true,
        cwd: 'tmp/bs4/scss',
        src: ['**'],
        dest: 'source/assets/vendor/bs4/scss'
      },
      bs4js: {
        expand: true,
        cwd: 'tmp/bs4/js',
        src: ['**'],
        dest: 'source/assets/vendor/bs4/js'
      },
      fancybox: {
        expand: true,
        cwd: 'tmp/fancybox/source/',
        src: ['**'],
        dest: 'source/assets/vendor/fancybox/'
      }
    },
    _clean: {
      tmp: ['tmp'],
      bs4: ['source/assets/vendor/bs4'],
      jquery: ['source/assets/vendor'],
      popperjs: ['source/assets/vendor/popper.js'],
      fancybox: ['source/assets/vendor/fancybox']
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.renameTask('clean', '_clean');

  grunt.registerTask('bs4', ['gitclone:bs4', 'copy:bs4', 'copy:bs4scss', 'copy:jquery', 'copy:popperjs', '_clean:tmp']);
  grunt.registerTask('fontawesome', ['gitclone:fontawesome', 'copy:fontawesome', '_clean:tmp']);
  grunt.registerTask('fancybox', ['gitclone:fancybox', 'copy:fancybox', '_clean:tmp']);
  grunt.registerTask('default', ['gitclone', 'copy', '_clean:tmp']);
  grunt.registerTask('clean', ['_clean']);
};