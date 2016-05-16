import test from 'blue-tape';
import File from '..';
import Stream from 'stream';

test('should be picky about type', async t => {
	t.doesNotThrow(() => new File().contents = new Buffer('buffer'));
	t.doesNotThrow(() => new File().contents = new Stream());
	t.doesNotThrow(() => new File().contents = 'string');
	t.doesNotThrow(() => new File().contents = null);

	t.throws(() => new File().contents = function () {}, /File.contents/);
	t.throws(() => new File().contents = undefined, /File.contents/);
	t.throws(() => new File().contents = true, /File.contents/);
	t.throws(() => new File().contents = 42, /File.contents/);
});
