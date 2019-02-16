const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');


const filepath = "C:/Users/grond/Desktop/ESILV/S8/WAA/Workshop3/castle/public/fileMichelin.json";


const writeStream = fs.createWriteStream('chefs.csv');
writeStream.write(`Restaurant; UrlMichelin; Chef; PostalCode ; PriceRange\n`);

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
      var chefName = findChefName.children().next().find('.field__items').children().first().text();

      const findPostalCode = $('.postal-code');
      var postalCode = findPostalCode.first().text();
      //console.log(postalCode);
      const findPrice = $('.node_poi-price');
      var price = findPrice.children().first().text();
      //console.log(price);

      writeStream.write(`${obj.Restaurant}; ${obj.UrlMichelin}; ${chefName}; ${postalCode}; ${price}\n`);
    }
  });
});
