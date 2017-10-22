'use strict';

const isBuffer = require('buffer').Buffer.isBuffer;
const fs = require('fs-extra');
const isStream = require('is-stream');
const File = require('vinyl');

const isNull = require('./lib/is-null');
const isString = require('./lib/is-string');
const normalize = require('./lib/normalize');

const INSPECT_LENGTH = 40;
const TYPE_ERROR = 'File.contents can only be a String, a Buffer, a Stream, or null.';

function VinylRW(options, contents) {
	let localOptions = options;

	if (typeof localOptions === 'string') {
		localOptions = {path: localOptions};
	}

	File.call(this, localOptions);

	if (contents !== null && contents !== undefined) {
		this.contents = contents;
	}

	this._isRW = true;
}

Object.assign(VinylRW, File);

const base = File.prototype;
const proto = Object.create(base);

VinylRW.prototype = proto;

proto.constructor = VinylRW;

proto.isString = function () {
	return isString(this.contents);
};

proto.inspect = function () {
	const formatted = base.inspect.call(this);

	if (!this.isString()) {
		return formatted;
	}

	let contents = JSON.stringify(this.contents);

	if (contents.length > INSPECT_LENGTH) {
		contents = contents.slice(0, INSPECT_LENGTH - 3) + '..."';
	}

	return formatted.slice(0, -1) + ' ' + contents + '>';
};

proto.exists = function () {
	normalize(this);

	return fs
		.stat(this.path)
		.then(() => {
			return true;
		})
		.catch(() => {
			return false;
		});
};

proto.existsSync = function () {
	normalize(this);

	try {
		fs.statSync(this.path);

		return true;
	} catch (err) {
		return false;
	}
};

proto.read = function (options) {
	const localOptions = normalize(this, options);

	function success(contents) {
		this.contents = contents;

		return this;
	}

	return fs
		.readFile(this.path, localOptions)
		.then(success.bind(this));
};

proto.readSync = function (options) {
	const localOptions = normalize(this, options);

	this.contents = fs.readFileSync(this.path, localOptions);

	return this;
};

proto.write = function (options) {
	const localOptions = normalize(this, options);

	function success() {
		return this;
	}

	return fs
		.outputFile(this.path, this.contents, localOptions)
		.then(success.bind(this));
};

proto.writeSync = function (options) {
	const localOptions = normalize(this, options);

	fs.outputFileSync(this.path, this.contents, localOptions);

	return this;
};

VinylRW.isRW = function (file) {
	return Boolean(file && file._isRW);
};

Object.defineProperty(proto, 'contents', {
	get() {
		return this._contents;
	},

	set(val) {
		if (!isString(val) && !isBuffer(val) && !isStream(val) && !isNull(val)) {
			throw new Error(TYPE_ERROR);
		}

		this._contents = val;
	}
});

module.exports = VinylRW;
