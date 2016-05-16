import path from 'path';
import test from 'blue-tape';
import File from '..';

test('should read', async t => {
	process.chdir(path.join(__dirname, 'fixtures'));

	const a = new File('a.txt');
	const aa = new File('a/a.txt');
	const ab = new File('a/b.txt');
	const b = new File('b.txt');
	const ba = new File('b/a.txt');
	const bb = new File('b/b.txt');
	const c = new File('c.gif');

	await a.read();
	await aa.read();
	await ab.read();
	await b.read();
	await ba.read();
	await bb.read();
	await c.read(null);

	t.is(a.contents, 'a\n');
	t.is(aa.contents, 'aa\n');
	t.is(ab.contents, 'ab\n');
	t.is(b.contents, 'b\n');
	t.is(ba.contents, 'ba\n');
	t.is(bb.contents, 'bb\n');
	t.is(c.isBuffer(), true);
});
