'use strict';

const path = require('path');

const DEFAULT_ENCODING = 'utf8';
const PATH_ERROR = 'No path specified! Can not interact with file system.';

function normalize(file, options) {
	let localOptions = options;

	if (!file || !file.path) {
		throw new Error(PATH_ERROR);
	}

	if (!localOptions || typeof localOptions !== 'object') {
		localOptions = {encoding: localOptions};
	}

	if (localOptions.encoding === undefined) {
		localOptions.encoding = DEFAULT_ENCODING;
	}

	const cwd = localOptions.cwd || file.cwd;
	const base = localOptions.base || file.base;
	const filepath = path.resolve(cwd, base, file.relative);

	file.cwd = cwd;
	file.base = base;
	file.path = filepath;

	return localOptions;
}

module.exports = normalize;
