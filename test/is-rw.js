import test from 'blue-tape';
import File from '..';

test('should identify an rw file', async t => {
	process.chdir(__dirname);

	const file = new File();

	t.equal(File.isRW(), false);
	t.equal(File.isRW({}), false);
	t.equal(File.isRW(file), true);
});
