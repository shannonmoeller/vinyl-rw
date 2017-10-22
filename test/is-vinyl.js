import test from 'ava';
import File from '..';

test('should identify an rw file', t => {
	const file = new File();

	t.is(File.isVinyl(), false);
	t.is(File.isVinyl({}), false);
	t.is(File.isVinyl(file), true);
});
