const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('relais.csv');
writeStream.write(`Hotel; Chef; CodePostal; Url\n`);


request('https://www.relaischateaux.com/us/site-map/etablissements', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    const hotels = $('#countryF');

    const list = hotels.next().first().children().next();

    list.children().each(function(i, element){
      const a = $(this);

      //Take the hotel's name and url
      var title = a.find('a').first().text();
      var url = a.find('a').first().attr('href');
      var str = title.replace(/\s\s+/g, " ")

      //Take the chief url
      if(a.find('a').next().first().length > 0 && a.find('a').next().next().first().length > 0){
      var chiefurl = a.find('a').next().first().attr('href');

      //Request to take the chief name and code postal
        request(chiefurl, function (error, response, html) {
              if (!error && response.statusCode == 200) {
                const z = cheerio.load(html);

                //Take the chief name
                const findChiefName = z('.row');
                var chiefName = findChiefName.find('h1').text();
                //console.log(chiefName);

                //Take the chief postal code
                const findPostalCode = z("*[itemprop = 'address']");
                var postalCode = findPostalCode.find('[itemprop=postalCode]').text();
                var postalCodeSTR = postalCode.replace(/\s\s+/g, " ");
                //console.log(postalCode);
                var hotelData = {
                  title: str,
                  url: url,
                  chiefName: chiefName,
                  postalCode: postalCodeSTR
                };

                writeStream.write(`${str}; ${chiefName};${postalCodeSTR};${url}\n`);

              }
            });
    }





      });
    }
  });
