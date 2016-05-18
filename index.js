'use strict';

var File = require('vinyl');
var fs = require('fs-promise');
var isBuffer = require('vinyl/lib/isBuffer');
var isNull = require('vinyl/lib/isNull');
var isStream = require('vinyl/lib/isStream');

var isString = require('./lib/isString');
var normalize = require('./lib/normalize');

var INSPECT_LENGTH = 40;
var TYPE_ERROR = 'File.contents can only be a String, a Buffer, a Stream, or null.';

function VinylRW(options, contents) {
	if (typeof options === 'string') {
		options = { path: options };
	}

	File.call(this, options);

	if (contents != null) {
		this.contents = contents;
	}

	this._isRW = true;
}

var base = File.prototype;
var proto = VinylRW.prototype = Object.create(base);

proto.constructor = VinylRW;

proto.isString = function () {
	return isString(this.contents);
};

proto.inspect = function () {
	var formatted = base.inspect.call(this);

	if (!this.isString()) {
		return formatted;
	}

	var contents = this.contents;

	// Wrap with quotes and escape special chars
	contents = JSON.stringify(contents);

	if (contents.length > INSPECT_LENGTH) {
		contents = contents.slice(0, INSPECT_LENGTH - 3) + '..."';
	}

	return formatted.slice(0, -1) + ' ' + contents + '>';
}

proto.exists = function () {
	normalize(this);

	return fs
		.stat(this.path)
		.then(function () { return true; })
		.catch(function () { return false; });
};

proto.existsSync = function () {
	normalize(this);

	try {
		fs.statSync(this.path);

		return true;
	}
	catch (e) {
		return false;
	}
};

proto.read = function (options) {
	options = normalize(this, options);

	function success(contents) {
		this.contents = contents;

		return this;
	}

	return fs
		.readFile(this.path, options)
		.then(success.bind(this));
};

proto.readSync = function (options) {
	options = normalize(this, options);

	this.contents = fs.readFileSync(this.path, options);

	return this;
};

proto.write = function (options) {
	options = normalize(this, options);

	function success(contents) {
		return this;
	}

	return fs
		.outputFile(this.path, this.contents, options)
		.then(success.bind(this));
};

proto.writeSync = function (options) {
	options = normalize(this, options);

	fs.outputFileSync(this.path, this.contents, options);

	return this;
};

VinylRW.isRW = function (file) {
	return Boolean(file && file._isRW);
};

Object.defineProperty(proto, 'contents', {
	get: function () {
		return this._contents;
	},
	set: function (val) {
		if (!isString(val) && !isBuffer(val) && !isStream(val) && !isNull(val)) {
			throw new Error(TYPE_ERROR);
		}

		this._contents = val;
	},
});

module.exports = VinylRW;
