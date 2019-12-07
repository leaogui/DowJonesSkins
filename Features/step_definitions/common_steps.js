/* jshint esversion:8 */
const {When, Then} = require('cucumber');

const scope = require('../support/scope');
const { visitHome } = require('../support/actions');
const assert = require('assert');

When('I access the home page', visitHome);
Then('I should be at {string} page', async (page_name) => {
    let headless = false;
    let slowMo = 0;

    scope.browser = await scope.driver.launch({headless, slowMo, args: ['--no-sandbox']});
    scope.context.currentPage = await scope.browser.newPage();
    scope.context.currentPage.setViewport({ width: 1280, height: 1024});

    const urlToVisit = scope.map_of_pages[page_name];

    const visit = await scope.context.currentPage.goto(urlToVisit, {
        waitUntil: 'networkidle2'
    });

    return visit;
});