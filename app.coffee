templates = require('client-templates')

module.exports = 
  ignore_files: ['_*', '.*.swp', '.*.swo', 'readme*', '.gitignore', '.DS_Store']
  ignore_folders: ['.git', 'node_modules']

  watcher_ignore_files: ['.*.swp', '.*.swo']
  watcher_ignore_folders: ['components']

  extensions: [templates(base: 'views/templates/')]
