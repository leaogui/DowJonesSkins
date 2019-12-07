/* jshint esversion:8 */
const { setWorldConstructor } = require('cucumber');
const puppeteer = require('puppeteer');
const scope = require('./support/scope');


const World = function(){
    scope.driver = puppeteer;
    scope.context = {};
    scope.host = "http://localhost:7777";

    scope.map_of_pages = {
        'Index': scope.host + '/index'
    };
};

setWorldConstructor(World);