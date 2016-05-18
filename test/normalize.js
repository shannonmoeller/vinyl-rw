import test from 'blue-tape';
import File from '..';
import normalize from '../lib/normalize';

test('should require a path', async t => {
	t.throws(() => normalize(), /No path/);
	t.throws(() => normalize({}), /No path/);
});

test('should create options', async t => {
	const file = {
		path: __filename,
		relative: __filename
	};

	t.deepEqual(normalize(file), { encoding: 'utf8' });
	t.deepEqual(normalize(file, null), { encoding: null });
	t.deepEqual(normalize(file, 'ascii'), { encoding: 'ascii' });
});

test('should create options', async t => {
	const file = {
		path: __filename,
		relative: __filename
	};

	t.deepEqual(normalize(file, {}), { encoding: 'utf8' });
	t.deepEqual(normalize(file, { cwd: 'foo' }), { cwd: 'foo', encoding: 'utf8' });
	t.deepEqual(normalize(file, { base: 'bar' }), { base: 'bar', encoding: 'utf8' });

	t.equal(file.cwd, 'foo');
	t.equal(file.base, 'bar');
	t.equal(file.path, __filename);
});
