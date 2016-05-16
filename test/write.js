import fs from 'fs-promise';
import test from 'blue-tape';
import File from '..';

test('should write', async t => {
	process.chdir(__dirname);

	await fs.remove('./actual');

	const foo = new File('actual/foo.txt', 'foo');
	const bar = new File('actual/foo/bar.txt', 'bar');
	const baz = new File('actual/foo/baz.txt', 'baz');

	t.is(await foo.exists(), false);
	t.is(await bar.exists(), false);
	t.is(await baz.exists(), false);

	await foo.write();
	await bar.write();
	await baz.write();

	t.is(await fs.readFile(foo.path, 'utf8'), 'foo');
	t.is(await fs.readFile(bar.path, 'utf8'), 'bar');
	t.is(await fs.readFile(baz.path, 'utf8'), 'baz');
});

test('should write sync', async t => {
	process.chdir(__dirname);

	await fs.remove('./actual');

	const foo = new File('actual/foo.txt', 'foo');
	const bar = new File('actual/foo/bar.txt', 'bar');
	const baz = new File('actual/foo/baz.txt', 'baz');

	t.is(foo.existsSync(), false);
	t.is(bar.existsSync(), false);
	t.is(baz.existsSync(), false);

	foo.writeSync();
	bar.writeSync();
	baz.writeSync();

	t.is(fs.readFileSync(foo.path, 'utf8'), 'foo');
	t.is(fs.readFileSync(bar.path, 'utf8'), 'bar');
	t.is(fs.readFileSync(baz.path, 'utf8'), 'baz');
});

test('should refuse to write', async t => {
	t.throws(() => new File().write(), /No path specified/);
});

test('should refuse to write sync', async t => {
	t.throws(() => new File().writeSync(), /No path specified/);
});
