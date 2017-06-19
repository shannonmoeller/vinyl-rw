import test from 'ava';
import File from '..';

test('should construct a file', t => {
	process.chdir(__dirname);

	const file = new File();

	t.is(file.contents, null);
	t.is(file.cwd, __dirname);
	t.is(file.base, __dirname);
	t.is(file.path, undefined);
	t.deepEqual(file.history, []);
});

test('should construct a file with a path', t => {
	process.chdir(__dirname);

	const file = new File('fixtures/foo.js');

	t.is(file.contents, null);
	t.is(file.cwd, __dirname);
	t.is(file.base, __dirname);
	t.true(/^fixtures[\\/]foo.js$/.test(file.path));
	t.true(/^fixtures[\\/]foo.js$/.test(file.history[0]));
});

test('should construct a file with contents', t => {
	process.chdir(__dirname);

	const file = new File('fixtures/foo.js', 'bar');

	t.is(file.contents, 'bar');
	t.is(file.cwd, __dirname);
	t.is(file.base, __dirname);
	t.true(/^fixtures[\\/]foo.js$/.test(file.path));
	t.true(/^fixtures[\\/]foo.js$/.test(file.history[0]));
});
