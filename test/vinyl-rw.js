import test from 'blue-tape';
import File from '..';

test('should construct a file', async t => {
	process.chdir(__dirname);

	const file = new File();

	t.is(file.cwd, __dirname);
	t.is(file.base, __dirname);
	t.is(file.path, undefined);
	t.same(file.history, []);
	t.is(file.contents, null);
});

test('should construct a file with a path', async t => {
	process.chdir(__dirname);

	const file = new File('fixtures/foo.js');

	t.is(file.cwd, __dirname);
	t.is(file.base, __dirname);
	t.is(file.path, 'fixtures/foo.js');
	t.same(file.history, ['fixtures/foo.js']);
	t.is(file.contents, null);
});

test('should construct a file with contents', async t => {
	process.chdir(__dirname);

	const file = new File('fixtures/foo.js', 'bar');

	t.is(file.cwd, __dirname);
	t.is(file.base, __dirname);
	t.is(file.path, 'fixtures/foo.js');
	t.same(file.history, ['fixtures/foo.js']);
	t.is(file.contents, 'bar');
});
