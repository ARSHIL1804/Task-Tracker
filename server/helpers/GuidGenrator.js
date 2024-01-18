const { v4: uuidv4 } = require('uuid');

function genrateGUID(namespace) {
  return `${namespace}-${uuidv4()}`;
}


module.exports = {genrateGUID};