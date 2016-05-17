import path from 'path';
import test from 'blue-tape';
import File from '..';

test('should read', async t => {
	process.chdir(path.join(__dirname, 'fixtures'));

	const a = await new File('a.txt').read();
	const aa = await new File('a/a.txt').read();
	const ab = await new File('a/b.txt').read();
	const b = await new File('b.txt').read();
	const ba = await new File('b/a.txt').read({});
	const bb = await new File('b/b.txt').read('ascii');
	const c = await new File('c.gif').read(null);

	t.equal(a.contents, 'a\n');
	t.equal(aa.contents, 'aa\n');
	t.equal(ab.contents, 'ab\n');
	t.equal(b.contents, 'b\n');
	t.equal(ba.contents, 'ba\n');
	t.equal(bb.contents, 'bb\n');
	t.equal(c.isBuffer(), true);
});

test('should read sync', async t => {
	process.chdir(path.join(__dirname, 'fixtures'));

	const a = new File('a.txt').readSync();
	const aa = new File('a/a.txt').readSync();
	const ab = new File('a/b.txt').readSync();
	const b = new File('b.txt').readSync();
	const ba = new File('b/a.txt').readSync({});
	const bb = new File('b/b.txt').readSync('ascii');
	const c = new File('c.gif').readSync(null);

	t.equal(a.contents, 'a\n');
	t.equal(aa.contents, 'aa\n');
	t.equal(ab.contents, 'ab\n');
	t.equal(b.contents, 'b\n');
	t.equal(ba.contents, 'ba\n');
	t.equal(bb.contents, 'bb\n');
	t.equal(c.isBuffer(), true);
});

test('should refuse to read', async t => {
	t.throws(() => new File().read(), /No path specified/);
});

test('should refuse to read sync', async t => {
	t.throws(() => new File().readSync(), /No path specified/);
});
