const { readdir, stat } = require('fs');
const { promisify } = require('util');
const { resolve, sep } = require('path');

module.exports = {
  async requireDirectory(directory, success, error, recursive = true) {
    const files = await this.readdir(directory);
    const filesObject = {};

    return Promise.all(files.map(async (file) => {
      const path = resolve(directory, file);

      if (file.endsWith('.js')) {
        try {
          const subpath = path.split(sep).reverse()[1];
          const required = require(path);
          const filename = file.split('.')[0];

          if (success) {
            await success(required, filename, subpath);
          }

          filesObject[file] = {
            subpath,
            required,
            filename
          };

          return required;
        } catch (_error) {
          error(_error);
        }
      } else if (recursive) {
        const isDirectory = await this.stat(path).then((file) => file.isDirectory());

        if (isDirectory) {
          return this.requireDirectory(path, success, error);
        }
      }
    }))
    .then(() => filesObject)
    .catch(console.error);
  },

  readdir: promisify(readdir),
  stat: promisify(stat)
}