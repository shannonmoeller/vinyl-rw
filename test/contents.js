import test from 'blue-tape';
import File from '..';
import Stream from 'stream';

function setContents(contents) {
	const file = new File();

	file.contents = contents;
}

test('should be picky about type', async t => {
	t.doesNotThrow(() => setContents(null));
	t.doesNotThrow(() => setContents(new Buffer('buffer')));
	t.doesNotThrow(() => setContents(new Stream()));
	t.doesNotThrow(() => setContents('string'));

	t.throws(() => setContents(() => null), /File.contents/);
	t.throws(() => setContents(undefined), /File.contents/);
	t.throws(() => setContents(true), /File.contents/);
	t.throws(() => setContents(42), /File.contents/);
});
