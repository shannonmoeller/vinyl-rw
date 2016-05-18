import test from 'blue-tape';
import isString from '../lib/isString';

test('should identify a string', async t => {
	t.equal(isString(), false);
	t.equal(isString({}), false);
	t.equal(isString(true), false);
	t.equal(isString('hi'), true);
});
