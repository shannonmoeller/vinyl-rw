import path from 'path';
import test from 'blue-tape';
import File from '..';

test('should read sync', async t => {
	process.chdir(path.join(__dirname, 'fixtures'));

	const a = new File('a.txt').readSync();
	const aa = new File('a/a.txt').readSync();
	const ab = new File('a/b.txt').readSync();
	const b = new File('b.txt').readSync();
	const ba = new File('b/a.txt').readSync();
	const bb = new File('b/b.txt').readSync();
	const c = new File('c.gif').readSync(null);

	t.is(a.contents, 'a\n');
	t.is(aa.contents, 'aa\n');
	t.is(ab.contents, 'ab\n');
	t.is(b.contents, 'b\n');
	t.is(ba.contents, 'ba\n');
	t.is(bb.contents, 'bb\n');
	t.is(c.isBuffer(), true);
});
