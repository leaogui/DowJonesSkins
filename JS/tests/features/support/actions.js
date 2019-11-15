const scope = require('../support/scope');

let headless = false;
let slowMo = 100;

const visitHome = async () => {
    scope.browser = await scope.driver.launch({headless, slowMo, args: ['--no-sandbox']});
    scope.context.currentPage = await scope.browser.newPage();
    scope.context.currentPage.setViewport({ width: 1280, height: 1024});

    const visit = await scope.context.currentPage.goto(scope.host, {
        waitUntil: 'networkidle2'
    });

    return visit;
};

module.exports = { visitHome };