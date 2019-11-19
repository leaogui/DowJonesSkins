/* jshint esversion:8 */
const querySkinIdByName = {
    text: 'SELECT skinid FROM skin WHERE nome = ($1);',
        rowMode: 'array'
};

module.exports = {
    querySkinIdByName: querySkinIdByName
};