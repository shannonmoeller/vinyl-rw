import test from 'blue-tape';
import File from '..';

test('should construct a file', async t => {
	process.chdir(__dirname);

	const file = new File();

	t.equal(file.cwd, __dirname);
	t.equal(file.base, __dirname);
	t.equal(file.path, undefined);
	t.deepEqual(file.history, []);
	t.equal(file.contents, null);
});

test('should construct a file with a path', async t => {
	process.chdir(__dirname);

	const file = new File('fixtures/foo.js');

	t.equal(file.cwd, __dirname);
	t.equal(file.base, __dirname);
	t.equal(file.path, 'fixtures/foo.js');
	t.deepEqual(file.history, ['fixtures/foo.js']);
	t.equal(file.contents, null);
});

test('should construct a file with contents', async t => {
	process.chdir(__dirname);

	const file = new File('fixtures/foo.js', 'bar');

	t.equal(file.cwd, __dirname);
	t.equal(file.base, __dirname);
	t.equal(file.path, 'fixtures/foo.js');
	t.deepEqual(file.history, ['fixtures/foo.js']);
	t.equal(file.contents, 'bar');
});
