function arrayCleaner(array){
    var cleaned = [];
    array.forEach((element) => {
        element = JSON.stringify(element);
        element = element.replace('"', '');
        element = element.replace('"', '');
        element = element.replace('[', '');
        element = element.replace(']', '');
        cleaned.push(element);
    });
    return cleaned;
}

module.exports.arrayCleaner = arrayCleaner;