import Stream from 'stream';
import test from 'ava';
import File from '..';

test('should inspect empty', t => {
	t.is(
		new File().inspect(),
		'<File >'
	);
});

test('should inspect null', t => {
	t.is(
		new File('foo.txt', null).inspect(),
		'<File "foo.txt">'
	);
});

test('should inspect buffer', t => {
	t.is(
		new File('foo.txt', Buffer.from('buffer')).inspect(),
		'<File "foo.txt" <Buffer 62 75 66 66 65 72>>'
	);
});

test('should inspect stream', t => {
	t.is(
		new File('foo.txt', new Stream()).inspect(),
		'<File "foo.txt" <Stream>>'
	);
});

test('should inspect string', t => {
	t.is(
		new File('foo.txt', '').inspect(),
		'<File "foo.txt" "">'
	);

	t.is(
		new File('foo.txt', 'Lorem ipsum dolor.').inspect(),
		'<File "foo.txt" "Lorem ipsum dolor.">'
	);

	t.is(
		new File('foo.txt', 'Lorem ipsum dolor sit\namet, consectetur adipiscing elit.').inspect(),
		'<File "foo.txt" "Lorem ipsum dolor sit\\namet, consect...">'
	);
});
