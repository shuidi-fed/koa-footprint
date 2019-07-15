const fs = require('fs')
const path = require('path')

module.exports = function (dir) {
  return fs.existsSync(path.join(dir, 'nuxt.config.js'))
}