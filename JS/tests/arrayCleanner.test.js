/* jshint esversion:8 */
const arrayCleaner = require('../scripts/arrayCleaner');

test('função deve retornar array limpo', () => {
    var arraySujo = ['[teste123]'];
    var valorCorreto = 'teste123';
    expect(arrayCleaner.arrayCleaner(arraySujo)[0]).toBe(valorCorreto);
});