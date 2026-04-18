import test from 'node:test';
import assert from 'node:assert';
import { sum } from './index.js';

test('menjumlahkan dua angka positif', () => {
  assert.strictEqual(sum(2, 3), 5);
});

test('mengembalikan 0 jika ada angka negatif', () => {
  assert.strictEqual(sum(-1, 1), 0);
});

test('menangani nilai nol', () => {
  assert.strictEqual(sum(0, 0), 0);
});