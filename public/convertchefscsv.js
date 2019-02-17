
let csvToJson = require('convert-csv-to-json');
let chefs = 'C:/Users/grond/Desktop/ESILV/S8/WAA/Workshop3/castle/public/chefs.csv';
let fileChefs = 'fileChefs.json';

csvToJson.generateJsonFileFromCsv(chefs,fileChefs);

let json = csvToJson.fieldDelimiter(';').getJsonFromCsv(fileChefs);
for(let i=0; i<json.length;i++){
    console.log(json[i]);
}
let list = 'C:/Users/grond/Desktop/ESILV/S8/WAA/Workshop3/castle/public/finalList.csv';
let fileList = 'finalList.json';

csvToJson.generateJsonFileFromCsv(list,fileList);

json = csvToJson.fieldDelimiter(';').getJsonFromCsv(fileList);
for(let i=0; i<json.length;i++){
    console.log(json[i]);
}
