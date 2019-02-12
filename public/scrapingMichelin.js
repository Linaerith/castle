const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const writeStream = fs.createWriteStream('michelin.csv');
writeStream.write(`Restaurant, Url\n`);

//var data_restaurants = [];


request('https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    const hotels = $('.poi-search-result');
    //const france = hotels.next().html();
    //console.log(france);
    const list = hotels.find('block__content');
    //console.log(hotels.html());
    hotels.children().children().each(function(i, element){
      var a = $(this).children();
      var title = a.parent().attr('attr-gtm-title');
      var url = 'https://restaurant.michelin.fr' + a.attr('href');
      var str = title.replace(/\s\s+/g, " ")

      // Our parsed meta data object
      var metadata = {
        title: str,
        url: url
      };
      //var metaJSON = JSON.stringify(metadata);
      //obj.push(metaJSON);
      //obj.table.push(metadata);
      writeStream.write(`${str}, ${url}\n`);
    });
  }
});


var step;
for(step = 2; step < 36; step ++)
{
  var link = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-' + step;
  request(link, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      const hotels = $('.poi-search-result');
      //const france = hotels.next().html();
      //console.log(france);
      const list = hotels.find('block__content');
      //console.log(hotels.html());
      hotels.children().children().each(function(i, element){
        var a = $(this).children();
        var title = a.parent().attr('attr-gtm-title');
        var url = 'https://restaurant.michelin.fr' + a.attr('href');
        var str = title.replace(/\s\s+/g, " ")

        // Our parsed meta data object
        var metadata = {
          title: str,
          url: url
        };
        //var metaJSON = JSON.stringify(metadata);
        //obj.push(metaJSON);
        //obj.table.push(metadata);
        //console.log(metaJSON);


        writeStream.write(`${str}, ${url}\n`);
      });
    }
  });
}

//console.log(obj);

/*for(var i = 0; i< data_restaurants.length; i++){
  console.log(data_restaurants[i]);
}*/
