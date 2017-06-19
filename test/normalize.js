import test from 'ava';
import normalize from '../lib/normalize';

test('should require a path', t => {
	t.throws(() => normalize(), /No path/);
	t.throws(() => normalize({}), /No path/);
});

test('should create options from shorthand', t => {
	const file = {
		path: __filename,
		relative: __filename
	};

	t.deepEqual(normalize(file), {encoding: 'utf8'});
	t.deepEqual(normalize(file, null), {encoding: null});
	t.deepEqual(normalize(file, 'ascii'), {encoding: 'ascii'});
});

test('should create options from object', t => {
	const file = {
		path: __filename,
		relative: __filename
	};

	t.deepEqual(normalize(file, {}), {encoding: 'utf8'});
	t.deepEqual(normalize(file, {cwd: 'foo'}), {cwd: 'foo', encoding: 'utf8'});
	t.deepEqual(normalize(file, {base: 'bar'}), {base: 'bar', encoding: 'utf8'});

	t.is(file.cwd, 'foo');
	t.is(file.base, 'bar');
	t.is(file.path, __filename);
});
