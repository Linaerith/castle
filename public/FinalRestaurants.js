
let csvToJson = require('convert-csv-to-json');

let fileHotels = 'C:/Users/grond/Desktop/ESILV/S8/WAA/Workshop3/castle/public/relais.csv';
let fileRelaisHotel = 'fileRelaisHotel.json';

csvToJson.generateJsonFileFromCsv(fileHotels,fileRelaisHotel);


let json = csvToJson.fieldDelimiter(';').getJsonFromCsv(fileHotels);
for(let i=0; i<json.length;i++){
    console.log(json[i]);
}


let fileResto = 'C:/Users/grond/Desktop/ESILV/S8/WAA/Workshop3/castle/public/michelin.csv';
let fileMichelin = 'fileMichelin.json';

csvToJson.generateJsonFileFromCsv(fileResto,fileMichelin);


let json1 = csvToJson.fieldDelimiter(';').getJsonFromCsv(fileResto);
for(let i=0; i<json.length;i++){
    console.log(json[i]);
}
