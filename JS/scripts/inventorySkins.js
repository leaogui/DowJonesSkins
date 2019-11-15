/* jshint esversion:8 */
function getInventorySkins(skinList){
    var filtrado = [];
    skinList.forEach((element) => {
        var par = element.indexOf("(");
        element = element.substr(0, par);
        if (!element.includes('Case') && !element.includes('Sealed Graffiti') && !filtrado.includes(element)){
            filtrado.push(element);
        }
    });
    return filtrado;
}

module.exports.getInventorySkins = getInventorySkins;