/* jshint esversion:8 */
const { After, AfterAll } = require('cucumber');
const scope = require('./support/scope');
const app = require("../app");

After(async () => {
    if(scope.browser && scope.context.currentPage){
        await scope.context.currentPage.close();
        scope.context.currentPage = null;
    }
});

AfterAll(async () => {
    app.server.close();
});