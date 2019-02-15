const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('relais.csv');
writeStream.write(`Hotel; Restaurants; Url\n`);

(async function() {
  try{
const main = await request('https://www.relaischateaux.com/us/site-map/etablissements', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    const hotels = $('#countryF');
    //const france = hotels.next().html();
    //console.log(france);
    const list = hotels.next().first().children().next();
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
    //  console.log(metadata);

/* SCRAPING THE HOTEL PAGES*/
    //SECOND REQUEST
    (async function() {
      try{
    const main = await request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
          var s = cheerio.load(html);
          const rest = s('.jsSecondNavMain');
          const list = rest.children().next().find('a').first();
          var urlRestaurant = list.attr('href');
          //console.log(urlRestaurant);

          if(typeof urlRestaurant !== 'undefined' && urlRestaurant.match("restaurant")){

            // THIRD REQUEST
            (async function() {
              try{
            const main = await request(urlRestaurant, function (error, response, html) {
              if (!error && response.statusCode == 200) {
                var c = cheerio.load(html);
                const restos = c('.jsSecondNavSub');
                if(restos.length >0){
                  const listrestos = restos.children();
                  //console.log(restos.html());
                  listrestos.each(function(i, element){
                    var l = c(this);
                    //console.log(l.html());

                    var nomRestaurant = l.find('a').first();
                    var name = nomRestaurant.text();
                    //console.log(nomRestaurant);
                    var string = name.replace(/\s\s+/g, " ");
                    //console.log(string);
/* FOURTH REQUEST*/
                    if(string.match("Other restaurants")){

                      var urlother = nomRestaurant.attr('href');
                      //console.log(urlother);
                      (async function() {
                        try{
                      const main = await  request(urlother, function (error, response, html) {
                        if (!error && response.statusCode == 200) {
                          var o = cheerio.load(html);
                          const restos = o('.hotelTabsHeaderTitle');
                          //mainTitle2.noVerticalMargin.other-restaurant-title
                          restos.each(function(i, element){
                            var li = o(this);
                            //console.log(li.html());

                            var nomRestaurant = li.find('h3').text();
                            //console.log(nomRestaurant);
                            var string = nomRestaurant.replace(/\s\s+/g, " ");
                            //console.log(string);
                            writeStream.write(`${str}; ${string}\n`);
                              //console.log(string2);
                            });
                          }
                        });
                      }
                      catch (e) {console.log('error',e);
                      }

                      })();
                  }
                  else{
                  writeStream.write(`${str}; ${string}; ${url}\n`);
                }


          /*      END FORTH REQUEST*/
                })
                }
                  else{
                    const restos = c('.hotelTabsHeaderTitle');
                    var nomRestaurant = restos.find('h3').text();
                    //console.log(nomRestaurant);
                    var string2 = nomRestaurant.replace(/\s\s+/g, " ");

                    writeStream.write(`${str};${string2}; ${url}\n`);
                    //console.log(string2);
                  }
                }
              });
            }
            catch (e) {console.log('error',e);
            }

            })();
          //END THIRD REQUEST


          var hotelWithRestaurant = {
            title: str,
            urlhotel: url,
            urlrestau: urlRestaurant
          };
          //console.log(hotelWithRestaurant);

        }
        }
      });
    }
    catch (e) {console.log('error',e);
    }

    })();

      //END SECOND REQUEST

    });
  }
});
}
catch (e) {console.log('error',e);
}

})();
