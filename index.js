/**
 * @class VinylRW
 */
'use strict';

var fs = require('fs-promise');
var path = require('path');

var File = require('vinyl');
var isBuffer = require('vinyl/lib/isBuffer');
var isNull = require('vinyl/lib/isNull');
var isStream = require('vinyl/lib/isStream');

function isString(val) {
	return typeof val === 'string';
}

/**
 * @constructor
 * @param {String|Options} options
 * @param {String|Buffer|Stream} contents
 */
function VinylRW(options, contents) {
	if (typeof options === 'string') {
		options = { path: options };
	}

	File.call(this, options);

	if (contents != null) {
		this.contents = contents;
	}

	/**
	 * @property {Boolean} _isRW
	 */
	this._isRW = true;
}

var base = File.prototype;
var proto = VinylRW.prototype = Object.create(base);

/**
 * @method isString
 * @return {Boolean}
 */
proto.isString = function() {
	return isString(this.contents);
};

/**
 * @method read
 * @param {String|Options} options
 * @return {Promise<VinylRW>}
 */
proto.read = function(options) {
	if (options === undefined) {
		options = 'utf8';
	}

	var filepath = path.resolve(this.cwd, this.base, this.relative);

	function setContents (contents) {
		this.contents = contents;
	}

	return fs
		.readFile(filepath, options)
		.then(setContents.bind(this))
		.then(this);
};

/**
 * @method readSync
 * @param {String|Options} options
 * @chainable
 */
proto.readSync = function(options) {
	if (options === undefined) {
		options = 'utf8';
	}

	var filepath = path.resolve(this.cwd, this.base, this.relative);

	this.contents = fs.readFileSync(filepath, options);

	return this;
};

/**
 * @method write
 * @param {String|Options} options
 * @return {Promise<VinylRW>}
 */
proto.write = function(options) {
	var filepath = path.resolve(this.cwd, this.base, this.relative);

	return fs
		.outputFile(filepath, this.contents, options)
		.then(this);
};

/**
 * @method write
 * @param {String|Options} options
 * @chainable
 */
proto.writeSync = function(options) {
	var filepath = path.resolve(this.cwd, this.base, this.relative);

	fs.outputFileSync(filepath, this.contents, options);

	return this;
};

/**
 * @method isVinylRW
 * @param {Object} file
 * @return {Boolean}
 * @static
 */
VinylRW.isRW = function (file) {
	return Boolean(file && file._isRW);
};

Object.defineProperty(proto, 'contents', {
	get: function() {
		return this._contents;
	},
	set: function(val) {
		if (!isString(val) && !isBuffer(val) && !isStream(val) && !isNull(val)) {
			throw new Error('File.contents can only be a String, a Buffer, a Stream, or null.');
		}

		this._contents = val;
	},
});

module.exports = VinylRW;
