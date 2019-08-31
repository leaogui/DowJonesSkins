const switchPort = require('../SwitchPort')

test('função deve retornar a porta 7777 para o server local', () => {
    let testPort = switchPort.getPort()
    if (process.connected == false){
        expect(testPort).toBe(7777);
    }
})

test('função deve retornar uma porta aleatória para o server online', () => {
    let testPort = switchPort.getPort()
    if (process.connected){
        expect(testPort).not.toBe(7777);
    }
})