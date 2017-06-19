# `vinyl-rw`

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url] [![Tip][amazon-img]][amazon-url]

A [Vinyl](http://npm.im/vinyl) file extension with first-class string support and ability to read and write to the file system.

## Install

    $ npm install --save vinyl-rw

## Usage

```js
import File from 'vinyl-rw';

const foo = new File('foo.txt', 'Lorem ipsum dolor.');

console.log(foo.path);
// -> '/Users/smoeller/repos/vinyl-rw/foo.txt'

console.log(foo.contents);
// -> 'Lorem ipsum dolor.'
```

## API

### new File(options, contents)

- `options` `{String|Object}` - Path or options.
- `contents` `{String|Buffer|Stream}` - (default: `null`) File contents.

### .isString() : Boolean

Returns `true` if `file.contents` is a string.

### .exists() : Promise<Boolean>

Sync: `existsSync() : Boolean`

Checks whether the file at `file.path` exists.

### .read([options]) : Promise<File>

Sync: `readSync([options]) : File`

- `options` `{String|Object}` - (default: `'utf8'`) Encoding or options.

Reads the contents of `file.path` into `file.contents`.

### .write([options]) : Promise<File>

Sync: `writeSync([options]) : File`

- `options` `{String|Object}` - (default: `'utf8'`) Encoding or options.

Writes `file.contents` as the contents of `file.path`.

### File.isRW(val) : Boolean

- `val` `{Any}` - An object to inspect.

Returns `true` if `val` is a VinylRW file.

## Contribute

Standards for this project, including tests, code coverage, and semantics are enforced with a build tool. Pull requests must include passing tests with 100% code coverage and no linting errors.

### Test

    $ npm test

----

© Shannon Moeller <me@shannonmoeller.com> (http://shannonmoeller.com)

Licensed under [MIT](http://shannonmoeller.com/mit.txt)

[amazon-img]:    https://img.shields.io/badge/amazon-tip_jar-yellow.svg?style=flat-square
[amazon-url]:    https://www.amazon.com/gp/registry/wishlist/1VQM9ID04YPC5?sort=universal-price
[coveralls-img]: http://img.shields.io/coveralls/shannonmoeller/vinyl-rw/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/shannonmoeller/vinyl-rw
[downloads-img]: http://img.shields.io/npm/dm/vinyl-rw.svg?style=flat-square
[npm-img]:       http://img.shields.io/npm/v/vinyl-rw.svg?style=flat-square
[npm-url]:       https://npmjs.org/package/vinyl-rw
[travis-img]:    http://img.shields.io/travis/shannonmoeller/vinyl-rw/master.svg?style=flat-square
[travis-url]:    https://travis-ci.org/shannonmoeller/vinyl-rw
