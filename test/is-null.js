import test from 'ava';
import isNull from '../lib/is-null';

test('should identify null', t => {
	t.is(isNull(), false);
	t.is(isNull({}), false);
	t.is(isNull(true), false);
	t.is(isNull('hi'), false);
	t.is(isNull(null), true);
});
