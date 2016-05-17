import test from 'blue-tape';
import File from '..';

test('should check file existence', async t => {
	process.chdir(__dirname);

	const foo = new File('fixtures/a.txt');
	const bar = new File('fixtures/derp.txt');

	t.equal(await foo.exists(), true);
	t.equal(await bar.exists(), false);
});

test('should check file existence sync', async t => {
	process.chdir(__dirname);

	const foo = new File('fixtures/a.txt');
	const bar = new File('fixtures/derp.txt');

	t.equal(foo.existsSync(), true);
	t.equal(bar.existsSync(), false);
});
