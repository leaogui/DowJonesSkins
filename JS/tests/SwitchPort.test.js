/* jshint esversion:6 */
const SwitchPort = require('../Connections/Steam/SwitchPort');

test('função deve retornar a porta correta para o server', () => {
    testPort = process.env.PORT || 7777;
    expect(SwitchPort.getPort()).toBe(testPort);
});