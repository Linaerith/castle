const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('output.js');

/*
request('https://www.relaischateaux.com/us/site-map/etablissements', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    const hotels = $('#countryF');
    //const france = hotels.next().html();
    //console.log(france);
    const list = hotels.next().children().next();
    //console.log(list.html());
    list.children().children().each(function(i, element){
      var a = $(this);
      var title = a.text();
      var url = a.attr('href');
      var str = title.replace(/\s\s+/g, " ")

      // Our parsed meta data object
      var metadata = {
        title: str,
        url: url
      };
      //console.log(a.html());
      console.log(metadata);
    });
  }
});*/

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
      //var str = title.replace(/\s\s+/g, " ")

      // Our parsed meta data object
      var metadata = {
        title: title,
        url: url
      };
      console.log(metadata);
      //console.log(a.html());
    });
  }
});
