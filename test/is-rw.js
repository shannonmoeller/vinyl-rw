import test from 'blue-tape';
import File from '..';

test('should identify rw files', async t => {
	process.chdir(__dirname);

	const file = new File();

	t.equal(File.isRW(), false);
	t.equal(File.isRW({}), false);
	t.equal(File.isRW(file), true);
});
