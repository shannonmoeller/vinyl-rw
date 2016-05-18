import test from 'blue-tape';
import File from '..';

test('should identify an rw file', async t => {
	const file = new File();

	t.equal(File.isRW(), false);
	t.equal(File.isRW({}), false);
	t.equal(File.isRW(file), true);
});
