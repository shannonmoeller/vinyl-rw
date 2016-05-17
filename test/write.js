import fs from 'fs-promise';
import test from 'blue-tape';
import File from '..';

test('should write', async t => {
	process.chdir(__dirname);

	await fs.remove('./actual');

	const foo = new File('actual/foo.txt', 'foo');
	const bar = new File('actual/foo/bar.txt', 'bar');
	const baz = new File('actual/foo/baz.txt', 'baz');

	t.equal(await foo.exists(), false);
	t.equal(await bar.exists(), false);
	t.equal(await baz.exists(), false);

	await foo.write();
	await bar.write();
	await baz.write('ascii');

	t.equal(await fs.readFile(foo.path, 'utf8'), 'foo');
	t.equal(await fs.readFile(bar.path, 'utf8'), 'bar');
	t.equal(await fs.readFile(baz.path, 'utf8'), 'baz');
});

test('should write sync', async t => {
	process.chdir(__dirname);

	await fs.remove('./actual');

	const foo = new File('actual/foo.txt', 'foo');
	const bar = new File('actual/foo/bar.txt', 'bar');
	const baz = new File('actual/foo/baz.txt', 'baz');

	t.equal(foo.existsSync(), false);
	t.equal(bar.existsSync(), false);
	t.equal(baz.existsSync(), false);

	foo.writeSync();
	bar.writeSync();
	baz.writeSync('ascii');

	t.equal(fs.readFileSync(foo.path, 'utf8'), 'foo');
	t.equal(fs.readFileSync(bar.path, 'utf8'), 'bar');
	t.equal(fs.readFileSync(baz.path, 'utf8'), 'baz');
});

test('should refuse to write', async t => {
	t.throws(() => new File().write(), /No path specified/);
});

test('should refuse to write sync', async t => {
	t.throws(() => new File().writeSync(), /No path specified/);
});
