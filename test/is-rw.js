import test from 'blue-tape';
import File from '..';

test('should identify rw files', async t => {
	process.chdir(__dirname);

	const file = new File();

	t.is(File.isRW(), false);
	t.is(File.isRW({}), false);
	t.is(File.isRW(file), true);
});
