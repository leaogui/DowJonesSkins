function getInventorySkins(skinList){
    var filtrado = [];
    skinList.forEach((element) => {
        if (!element.includes('Case') && !element.includes('Sealed Graffiti')){
            filtrado.push(element);
        }
    });
    return filtrado;
}

module.exports.getInventorySkins = getInventorySkins;