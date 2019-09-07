/* jshint esversion:6 */
const SwitchSteamKey = require('../Connections/Steam/SwitchSteamKey');

test('função deve retornar a chave "F946785AC15BCE7B5930E5F82AE311CC" se estiver em server local', () => {
    let testPORT = 7777;
    let testKey = SwitchSteamKey.getKey(testPORT);
    if (process.connected == false){
        expect(testKey).toBe('F946785AC15BCE7B5930E5F82AE311CC');
    }
});

test('função deve retornar a chave "089C83E667EAEA556A647FCAE86101ED" se estiver em server online', () => {
    let testPORT = 1038;
    let testKey = SwitchSteamKey.getKey(testPORT);
    if (process.connected){
        expect(testKey).toBe('089C83E667EAEA556A647FCAE86101ED');
    }
});