/* jshint esversion:8 */
const inventoryskins = require('../scripts/inventorySkins');

test('função deve retornar nome das skins filtrado', () => {
    var listaBruta = ['AWP | Worm God (STATTRAK)', 'Glove Case'];
    var valorCorreto = 'AWP | Worm God ';
    expect(inventoryskins.getInventorySkins(listaBruta)[0]).toBe(valorCorreto);
});