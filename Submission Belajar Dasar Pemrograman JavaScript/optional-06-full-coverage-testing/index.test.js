import sum from './index.js';

describe('Test fungsi sum', () => {

  test('menjumlahkan dua angka positif', () => {
    expect(sum(2, 3)).toBe(5);
  });

  test('mengembalikan 0 jika salah satu bukan number', () => {
    expect(sum(2, '3')).toBe(0);
    expect(sum('2', 3)).toBe(0);
  });

  test('mengembalikan 0 jika kedua bukan number', () => {
    expect(sum('a', 'b')).toBe(0);
  });

  test('mengembalikan 0 jika ada angka negatif', () => {
    expect(sum(-1, 5)).toBe(0);
    expect(sum(5, -1)).toBe(0);
    expect(sum(-2, -3)).toBe(0);
  });

  test('menangani nilai nol dengan benar', () => {
    expect(sum(0, 5)).toBe(5);
    expect(sum(5, 0)).toBe(5);
    expect(sum(0, 0)).toBe(0);
  });

});