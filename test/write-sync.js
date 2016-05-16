import test from 'blue-tape';
import File from '..';

test('should write sync', async t => {
	process.chdir(__dirname);

	const foo = new File('foo.txt', 'foo');
	const bar = new File('foo/bar.txt', 'bar');
	const baz = new File('foo/baz.txt', 'baz');

	console.log(foo);
	console.log(bar);
	console.log(baz);
});
