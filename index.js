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

class VinylRW extends File {
	constructor(options, contents) {
		let localOptions = options;

		if (typeof localOptions === 'string') {
			localOptions = {path: localOptions};
		}

		super(localOptions);

		if (contents !== null && contents !== undefined) {
			this.contents = contents;
		}

		this._isRW = true;
	}

	get contents() {
		return this._contents;
	}

	set contents(val) {
		if (!isString(val) && !isBuffer(val) && !isStream(val) && !isNull(val)) {
			throw new Error(TYPE_ERROR);
		}

		this._contents = val;
	}

	isString() {
		return isString(this.contents);
	}

	inspect() {
		const formatted = super.inspect(this);

		if (!this.isString()) {
			return formatted;
		}

		let contents = JSON.stringify(this.contents);

		if (contents.length > INSPECT_LENGTH) {
			contents = contents.slice(0, INSPECT_LENGTH - 3) + '..."';
		}

		return formatted.slice(0, -1) + ' ' + contents + '>';
	}

	exists() {
		normalize(this);

		return fs
			.stat(this.path)
			.then(() => {
				return true;
			})
			.catch(() => {
				return false;
			});
	}

	existsSync() {
		normalize(this);

		try {
			fs.statSync(this.path);

			return true;
		} catch (err) {
			return false;
		}
	}

	read(options) {
		const localOptions = normalize(this, options);

		return fs
			.readFile(this.path, localOptions)
			.then(contents => {
				this.contents = contents;

				return this;
			});
	}

	readSync(options) {
		const localOptions = normalize(this, options);

		this.contents = fs.readFileSync(this.path, localOptions);

		return this;
	}

	write(options) {
		const localOptions = normalize(this, options);

		return fs
			.outputFile(this.path, this.contents, localOptions)
			.then(() => this);
	}

	writeSync(options) {
		const localOptions = normalize(this, options);

		fs.outputFileSync(this.path, this.contents, localOptions);

		return this;
	}
}

VinylRW.isRW = function (file) {
	return Boolean(file && file._isRW);
};

module.exports = VinylRW;
