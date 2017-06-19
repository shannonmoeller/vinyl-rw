import test from 'ava';
import File from '..';

test('should check file existence', async t => {
	process.chdir(__dirname);

	const foo = new File('fixtures/a.txt');
	const bar = new File('fixtures/derp.txt');

	t.is(await foo.exists(), true);
	t.is(await bar.exists(), false);
});

test('should check file existence sync', t => {
	process.chdir(__dirname);

	const foo = new File('fixtures/a.txt');
	const bar = new File('fixtures/derp.txt');

	t.is(foo.existsSync(), true);
	t.is(bar.existsSync(), false);
});
