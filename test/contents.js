import Stream from 'stream';
import test from 'ava';
import File from '..';

function setContents(contents) {
	const file = new File();

	file.contents = contents;
}

test('should be picky about type', t => {
	t.notThrows(() => setContents(null));
	t.notThrows(() => setContents(Buffer.from('buffer')));
	t.notThrows(() => setContents(new Stream()));
	t.notThrows(() => setContents('string'));

	t.throws(() => setContents(() => null), /File.contents/);
	t.throws(() => setContents(undefined), /File.contents/);
	t.throws(() => setContents(true), /File.contents/);
	t.throws(() => setContents(42), /File.contents/);
});
