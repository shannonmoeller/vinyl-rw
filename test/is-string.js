import test from 'ava';
import isString from '../lib/is-string';

test('should identify a string', t => {
	t.is(isString(), false);
	t.is(isString({}), false);
	t.is(isString(true), false);
	t.is(isString('hi'), true);
});
