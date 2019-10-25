function getInventorySkins(skinList){
    var filtrado = [];
    skinList.forEach((element) => {
        console.log(element);
        var par = element.indexOf("(");
        console.log(par);
        element = element.substr(0, par);
        console.log(element);
        if (!element.includes('Case') && !element.includes('Sealed Graffiti') && !filtrado.includes(element)){
            filtrado.push(element);
        }
    });
    return filtrado;
}

module.exports.getInventorySkins = getInventorySkins;