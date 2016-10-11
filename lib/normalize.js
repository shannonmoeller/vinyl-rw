'use strict';

var path = require('path');

var DEFAULT_ENCODING = 'utf8';
var PATH_ERROR = 'No path specified! Can not interact with file system.';

module.exports = function normalize(file, options) {
	var localOptions = options;

	if (!file || !file.path) {
		throw new Error(PATH_ERROR);
	}

	if (!localOptions || typeof localOptions !== 'object') {
		localOptions = { encoding: localOptions };
	}

	if (localOptions.encoding === undefined) {
		localOptions.encoding = DEFAULT_ENCODING;
	}

	var cwd = localOptions.cwd || file.cwd;
	var base = localOptions.base || file.base;
	var filepath = path.resolve(cwd, base, file.relative);

	file.cwd = cwd;
	file.base = base;
	file.path = filepath;

	return localOptions;
};
