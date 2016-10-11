import test from 'blue-tape';
import isNull from '../lib/isNull';

test('should identify null', async t => {
	t.equal(isNull(), false);
	t.equal(isNull({}), false);
	t.equal(isNull(true), false);
	t.equal(isNull('hi'), false);
	t.equal(isNull(null), true);
});
