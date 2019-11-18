/* jshint esversion:8 */
const {When, Then} = require('cucumber');

const scope = require('../support/scope');
const { visitHome } = require('../support/actions');
const assert = require('assert');

When('I access the home page', visitHome);
Then('I should be at {string} page', async (page_name) => {
    await scope.context.currentPage.waitForNavigation();

    assert.equal(scope.map_of_pages[page_name], scope.context.currentPage.url());
});