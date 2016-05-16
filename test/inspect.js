import test from 'blue-tape';
import File from '..';
import Stream from 'stream';

test('should inspect empty', async t => {
	t.is(new File().inspect(), '<File >');
});

test('should inspect null', async t => {
	t.is(new File('foo.txt', null).inspect(), '<File "foo.txt">');
});

test('should inspect buffers', async t => {
	t.is(
		new File('foo.txt', new Buffer('buffer')).inspect(),
		'<File "foo.txt" <Buffer 62 75 66 66 65 72>>'
	);
});

test('should inspect streams', async t => {
	t.is(
		new File('foo.txt', new Stream()).inspect(),
		'<File "foo.txt" <Stream>>'
	);
});

test('should inspect strings', async t => {
	t.is(
		new File('foo.txt', 'Lorem ipsum dolor sit\namet, consectetur adipiscing elit.').inspect(),
		'<File "foo.txt" "Lorem ipsum dolor sit\\namet, consect...">'
	);
});
