'use strict';

var path = require('path');

var DEFAULT_ENCODING = 'utf8';
var PATH_ERROR = 'No path specified! Can not interact with file system.';

module.exports = function normalize(file, options) {
	if (!file || !file.path) {
		throw new Error(PATH_ERROR);
	}

	if (!options || typeof options !== 'object') {
		options = { encoding: options };
	}

	if (options.encoding === undefined) {
		options.encoding = DEFAULT_ENCODING;
	}

	var cwd = options.cwd || file.cwd;
	var base = options.base || file.base;
	var filepath = path.resolve(cwd, base, file.relative);

	file.cwd = cwd;
	file.base = base;
	file.path = filepath;

	return options;
};
