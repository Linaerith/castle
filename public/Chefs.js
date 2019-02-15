const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const filepath = "C:/Users/grond/Desktop/ESILV/S8/WAA/Workshop3/castle/public/fileMichelin.json";


const writeStream = fs.createWriteStream('chefs.csv');
writeStream.write(`Restaurant; UrlMichelin; Chef; PostalCode\n`);

// Get content from file
 var contents = fs.readFileSync(filepath);
// Define to JSON type
 var jsonContent = JSON.parse(contents);


//console.log(jsonContent);




jsonContent.forEach( obj =>
{
  request(obj.UrlMichelin, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      const findChefName = $('.node_poi-chef');
      //const france = hotels.next().html();
      //console.log(france);
      var chefName = findChefName.children().next().find('.field__items').children().text();
      console.log(chefName);

        //writeStream.write(`${obj.Restaurant}; ${obj.UrlMichelin}; ${chefName}\n`);
    }
  });
});
