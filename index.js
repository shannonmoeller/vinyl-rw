'use strict';

var File = require('vinyl');
var fs = require('fs-promise');
var isBuffer = require('buffer').Buffer.isBuffer;
var isStream = require('is-stream');

var isNull = require('./lib/isNull');
var isString = require('./lib/isString');
var normalize = require('./lib/normalize');

var INSPECT_LENGTH = 40;
var TYPE_ERROR = 'File.contents can only be a String, a Buffer, a Stream, or null.';

function VinylRW(options, contents) {
	var localOptions = options;

	if (typeof localOptions === 'string') {
		localOptions = { path: localOptions };
	}

	File.call(this, localOptions);

	if (contents != null) {
		this.contents = contents;
	}

	this._isRW = true;
}

Object.assign(VinylRW, File);

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

	var contents = JSON.stringify(this.contents);

	if (contents.length > INSPECT_LENGTH) {
		contents = contents.slice(0, INSPECT_LENGTH - 3) + '..."';
	}

	return formatted.slice(0, -1) + ' ' + contents + '>';
};

proto.exists = function () {
	normalize(this);

	return fs
		.stat(this.path)
		.then(function () {
			return true;
		})
		.catch(function () {
			return false;
		});
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
	var localOptions = normalize(this, options);

	function success(contents) {
		this.contents = contents;

		return this;
	}

	return fs
		.readFile(this.path, localOptions)
		.then(success.bind(this));
};

proto.readSync = function (options) {
	var localOptions = normalize(this, options);

	this.contents = fs.readFileSync(this.path, localOptions);

	return this;
};

proto.write = function (options) {
	var localOptions = normalize(this, options);

	function success() {
		return this;
	}

	return fs
		.outputFile(this.path, this.contents, localOptions)
		.then(success.bind(this));
};

proto.writeSync = function (options) {
	var localOptions = normalize(this, options);

	fs.outputFileSync(this.path, this.contents, localOptions);

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
